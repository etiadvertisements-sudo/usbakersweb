#!/usr/bin/env bash
# ==============================================================================
# US Bakers — 1-Click Deployment Script for Hostinger VPS (IP-only)
# Project path: /var/www/usbakers/usbakersweb
# ==============================================================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m'

ROOT_DIR="/var/www/usbakers/usbakersweb"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"

echo -e "${CYAN}====================================================${NC}"
echo -e "${CYAN}       US Bakers — Deploying on Hostinger VPS       ${NC}"
echo -e "${CYAN}====================================================${NC}"

# 1. Must be root
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}[ERROR] Please run as root (use: sudo bash deploy.sh)${NC}"
    exit 1
fi

# 2. Check directory exists
if [ ! -d "$ROOT_DIR" ]; then
    echo -e "${RED}[ERROR] Directory $ROOT_DIR does not exist.${NC}"
    echo -e "Make sure you have cloned your repo into /var/www/usbakers/usbakersweb"
    exit 1
fi

# 3. Detect or ask for public VPS IP
DETECTED_IP=$(curl -s4 ifconfig.me || curl -s4 icanhazip.com || echo "")
if [ -n "$DETECTED_IP" ]; then
    echo -e "${YELLOW}Detected VPS IP:${NC} $DETECTED_IP"
    read -p "Press ENTER to use this IP, or type a different one: " USER_IP
    VPS_IP=${USER_IP:-$DETECTED_IP}
else
    read -p "Enter your VPS Public IP: " VPS_IP
fi

if [ -z "$VPS_IP" ]; then
    echo -e "${RED}[ERROR] IP address is required.${NC}"
    exit 1
fi

echo -e "\n${GREEN}[1/7] Updating system packages...${NC}"
apt update -y

echo -e "\n${GREEN}[2/7] Installing Node.js, Yarn, Python, Nginx & curl...${NC}"
apt install -y curl gnupg build-essential python3 python3-pip python3-venv nginx ufw

# Install Node 20 if not present
if ! command -v node >/dev/null 2>&1; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
fi

# Install Yarn if not present
if ! command -v yarn >/dev/null 2>&1; then
    npm install -g yarn
fi

echo -e "\n${GREEN}[3/7] Setting up MongoDB...${NC}"
if ! command -v mongod >/dev/null 2>&1; then
    curl -fsSL https://pgp.mongodb.com/server-7.0.asc | gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor --yes
    echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
    apt update -y
    apt install -y mongodb-org || echo "MongoDB install completed with warnings"
fi
systemctl enable --now mongod || systemctl start mongod || echo "MongoDB service started"

echo -e "\n${GREEN}[4/7] Setting up Backend (FastAPI)...${NC}"
cd "$BACKEND_DIR"

# Python venv
if [ ! -d "$BACKEND_DIR/venv" ]; then
    python3 -m venv "$BACKEND_DIR/venv"
fi
"$BACKEND_DIR/venv/bin/pip" install --upgrade pip
"$BACKEND_DIR/venv/bin/pip" install -r "$BACKEND_DIR/requirements.txt"
"$BACKEND_DIR/venv/bin/pip" install uvicorn

# backend .env
cat > "$BACKEND_DIR/.env" << 'EOF'
MONGO_URL="mongodb://127.0.0.1:27017"
DB_NAME="usbakers"
CORS_ORIGINS="*"
EOF

# systemd service for FastAPI
cat > /etc/systemd/system/usbakers-api.service << EOF
[Unit]
Description=US Bakers FastAPI Backend
After=network.target mongod.service

[Service]
Type=simple
User=root
WorkingDirectory=$BACKEND_DIR
ExecStart=$BACKEND_DIR/venv/bin/uvicorn server:app --host 127.0.0.1 --port 8001
Restart=always
RestartSec=3
EnvironmentFile=$BACKEND_DIR/.env

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable --now usbakers-api
systemctl restart usbakers-api

echo -e "\n${GREEN}[5/7] Building Frontend (React)...${NC}"
cd "$FRONTEND_DIR"

# frontend .env pointing to the VPS IP
cat > "$FRONTEND_DIR/.env" << EOF
REACT_APP_BACKEND_URL=http://$VPS_IP
EOF

yarn install --frozen-lockfile || yarn install
yarn build

echo -e "\n${GREEN}[6/7] Configuring Nginx...${NC}"
cat > /etc/nginx/sites-available/usbakers << EOF
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    root $FRONTEND_DIR/build;
    index index.html index.htm;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    # React router SPA fallback
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # API proxy to FastAPI
    location /api/ {
        proxy_pass http://127.0.0.1:8001;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        client_max_body_size 15M;
    }

    # Static assets caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
EOF

# Enable the site, disable default if conflicting
ln -sf /etc/nginx/sites-available/usbakers /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx

echo -e "\n${GREEN}[7/7] Configuring Firewall...${NC}"
ufw allow 22/tcp || true
ufw allow 80/tcp || true
ufw allow 443/tcp || true
ufw --force enable || true

echo -e "\n${CYAN}====================================================${NC}"
echo -e "${GREEN}   DEPLOYMENT COMPLETE! 🎉                          ${NC}"
echo -e "${CYAN}====================================================${NC}"
echo -e "Open in your browser: ${YELLOW}http://$VPS_IP${NC}"
echo -e "\nHelpful commands on VPS:"
echo -e "  Backend logs:    ${CYAN}journalctl -u usbakers-api -f${NC}"
echo -e "  Nginx logs:      ${CYAN}tail -f /var/log/nginx/error.log${NC}"
echo -e "  Restart Backend: ${CYAN}systemctl restart usbakers-api${NC}"
echo -e "  Restart Nginx:   ${CYAN}systemctl restart nginx${NC}"
echo -e "${CYAN}====================================================${NC}\n"
