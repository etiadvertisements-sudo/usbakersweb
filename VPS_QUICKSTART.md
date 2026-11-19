# 1-Command Deploy for Hostinger VPS

Run this single command on your VPS when inside `/var/www/usbakers/usbakersweb`:

```bash
cd /var/www/usbakers/usbakersweb && sudo bash deploy.sh
```

---

## What the script does automatically:
1. Detects your **public VPS IP**.
2. Installs **Node.js 20, Yarn, Python3, Nginx, MongoDB 7.0**.
3. Creates a Python virtual environment and installs backend packages (`pip install -r requirements.txt`).
4. Creates a `systemd` service (`usbakers-api.service`) so the FastAPI backend starts on boot and runs continuously.
5. Builds the production React app (`yarn build`) pointing directly to your VPS IP.
6. Configures Nginx on port 80 with React SPA routing and proxies all `/api/*` requests to the backend on `127.0.0.1:8001`.
7. Enables the UFW firewall for ports 22, 80, 443.

---

## How to pull future updates on the VPS:
```bash
cd /var/www/usbakers/usbakersweb
git pull
sudo bash deploy.sh
```
