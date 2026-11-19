# Deploy US Bakers on a Hostinger VPS (IP only — no domain)

Stack: React (build) + FastAPI (uvicorn) + MongoDB, all behind Nginx on port 80.
Replace `YOUR_VPS_IP` everywhere with your server's public IP (e.g. 72.60.x.x).

---
## 0. Connect to the VPS
```bash
ssh root@YOUR_VPS_IP
```

## 1. Install system packages
```bash
apt update && apt upgrade -y
# Node 20 + Yarn
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
npm install -g yarn
# Python + pip + venv
apt install -y python3 python3-pip python3-venv
# Nginx
apt install -y nginx
```

## 2. Install MongoDB (local)
```bash
apt install -y gnupg curl
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
apt update && apt install -y mongodb-org
systemctl enable --now mongod
```

## 3. Upload the code
Put the project at `/var/www/usbakers` (use `scp`, `git clone`, or Hostinger file manager).
```bash
mkdir -p /var/www/usbakers
# from your local machine:  scp -r /app/* root@YOUR_VPS_IP:/var/www/usbakers/
```
You should now have `/var/www/usbakers/backend` and `/var/www/usbakers/frontend`.

## 4. Backend (FastAPI)
```bash
cd /var/www/usbakers/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
Create `/var/www/usbakers/backend/.env`:
```
MONGO_URL="mongodb://localhost:27017"
DB_NAME="usbakers"
CORS_ORIGINS="*"
```
Create a systemd service so the API stays running — `/etc/systemd/system/usbakers-api.service`:
```ini
[Unit]
Description=US Bakers FastAPI
After=network.target mongod.service

[Service]
WorkingDirectory=/var/www/usbakers/backend
ExecStart=/var/www/usbakers/backend/venv/bin/uvicorn server:app --host 127.0.0.1 --port 8001
Restart=always
User=root

[Install]
WantedBy=multi-user.target
```
Start it:
```bash
systemctl daemon-reload
systemctl enable --now usbakers-api
systemctl status usbakers-api   # should be "active (running)"
```

## 5. Frontend (React build)
Create `/var/www/usbakers/frontend/.env`:
```
REACT_APP_BACKEND_URL=http://YOUR_VPS_IP
```
(No trailing slash. The app calls `${REACT_APP_BACKEND_URL}/api/...`, and Nginx routes `/api` to the backend.)
```bash
cd /var/www/usbakers/frontend
yarn install
yarn build          # outputs to /var/www/usbakers/frontend/build
```

## 6. Nginx (serve build on port 80 + proxy /api)
Replace `/etc/nginx/sites-available/default` with:
```nginx
server {
    listen 80 default_server;
    server_name _;                      # responds on the bare IP

    root /var/www/usbakers/frontend/build;
    index index.html;

    # React client-side routing
    location / {
        try_files $uri /index.html;
    }

    # API -> FastAPI
    location /api/ {
        proxy_pass http://127.0.0.1:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        client_max_body_size 10M;       # allows custom-cake photo uploads
    }
}
```
Reload:
```bash
nginx -t && systemctl restart nginx
```

## 7. Open the firewall
```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
```
(If Hostinger has a separate panel firewall, allow ports 22 and 80 there too.)

## 8. Visit
Open **http://YOUR_VPS_IP** in a browser. Done — the storefront, products, cart, checkout, custom orders and contact form all work on the IP.

---
## Updating later
```bash
cd /var/www/usbakers
# pull/upload new code, then:
cd backend && source venv/bin/activate && pip install -r requirements.txt && systemctl restart usbakers-api
cd ../frontend && yarn install && yarn build && systemctl restart nginx
```

## Notes
- No domain needed — everything runs on the raw IP over HTTP. (HTTPS/SSL needs a domain; add it later with Certbot.)
- Razorpay is not yet wired (awaiting keys); Cash on Delivery works out of the box.
- MongoDB data lives locally in `/var/lib/mongodb`. Back it up with `mongodump`.
