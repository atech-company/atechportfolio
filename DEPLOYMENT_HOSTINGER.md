# Deploying ATECH Portfolio on Hostinger

This guide covers deploying your Next.js portfolio website on Hostinger.

## ⚠️ Important: Hosting Requirements

Your Next.js app requires **Node.js support**. Hostinger offers different hosting types:

- ✅ **VPS Hosting** - Supports Node.js (Recommended)
- ✅ **Cloud Hosting** - Supports Node.js (Recommended)
- ❌ **Shared Hosting** - Usually doesn't support Node.js (Not suitable)

**You need VPS or Cloud Hosting from Hostinger to deploy this Next.js app.**

---

## Option 1: Hostinger VPS Deployment (Recommended)

### Prerequisites
- Hostinger VPS plan (with Node.js support)
- SSH access to your VPS
- Domain name pointed to your VPS IP

### Step 1: Connect to Your VPS

```bash
ssh root@your-vps-ip
# or
ssh username@your-vps-ip
```

### Step 2: Install Node.js

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

### Step 3: Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

### Step 4: Install Nginx

```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Step 5: Upload Your Project

**Option A: Using Git (Recommended)**
```bash
# Install Git
sudo apt install git -y

# Clone your repository
cd /var/www
git clone https://github.com/yourusername/atechportfolio.git
cd atechportfolio
```

**Option B: Using FTP/SFTP**
1. Use FileZilla or similar FTP client
2. Connect to your VPS
3. Upload all project files to `/var/www/atechportfolio`

### Step 6: Install Dependencies and Build

```bash
cd /var/www/atechportfolio

# Install dependencies
npm install

# Build the production version
npm run build
```

### Step 7: Create PM2 Configuration

Create `ecosystem.config.js` in your project root:

```javascript
module.exports = {
  apps: [{
    name: 'atech-portfolio',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/atechportfolio',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      NEXT_PUBLIC_SITE_URL: 'https://yourdomain.com'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
```

### Step 8: Start Application with PM2

```bash
# Create logs directory
mkdir -p logs

# Start the app
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Follow the instructions it provides
```

### Step 9: Configure Nginx

Create Nginx configuration file:

```bash
sudo nano /etc/nginx/sites-available/atech
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Increase body size for file uploads
    client_max_body_size 20M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Serve static files directly
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/atech /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 10: Install SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is set up automatically
```

### Step 11: Configure Firewall

```bash
# Allow SSH, HTTP, and HTTPS
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## Option 2: Hostinger Cloud Hosting

If you have Hostinger Cloud Hosting with Node.js support:

### Steps

1. **Access hPanel**
   - Log in to your Hostinger account
   - Go to hPanel

2. **Node.js App Setup**
   - Navigate to "Node.js" section in hPanel
   - Create a new Node.js application
   - Select Node.js version (18.x or higher)
   - Set startup file: `server.js` or use PM2

3. **Upload Files**
   - Use File Manager or FTP
   - Upload all project files to your domain folder

4. **Install Dependencies**
   - Use SSH or Terminal in hPanel
   - Run: `npm install`
   - Run: `npm run build`

5. **Configure Environment Variables**
   - In hPanel, find "Environment Variables"
   - Add: `NODE_ENV=production`
   - Add: `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`

6. **Start Application**
   - Use PM2 or Node.js manager in hPanel
   - Start the app on port 3000

---

## Environment Variables

Create a `.env.production` file or set in hPanel:

```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
PORT=3000
```

**Note:** Since you're using JSON files for data storage (not Strapi), you don't need Strapi-related environment variables.

---

## File Permissions

Ensure proper permissions for the data directory:

```bash
cd /var/www/atechportfolio
chmod -R 755 data
chown -R www-data:www-data data
```

---

## Updating Your Site

When you make changes:

```bash
cd /var/www/atechportfolio

# Pull latest changes (if using Git)
git pull

# Or upload new files via FTP

# Install any new dependencies
npm install

# Rebuild
npm run build

# Restart the app
pm2 restart atech-portfolio
```

---

## Monitoring

### Check PM2 Status
```bash
pm2 status
pm2 logs atech-portfolio
pm2 monit
```

### Check Nginx Status
```bash
sudo systemctl status nginx
sudo nginx -t
```

---

## Troubleshooting

### App Won't Start
```bash
# Check logs
pm2 logs atech-portfolio

# Check if port 3000 is in use
sudo lsof -i :3000

# Restart PM2
pm2 restart all
```

### Nginx 502 Bad Gateway
- Check if Next.js app is running: `pm2 status`
- Check app logs: `pm2 logs atech-portfolio`
- Verify proxy_pass URL in Nginx config

### Build Errors
```bash
# Clean and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Permission Errors
```bash
# Fix data directory permissions
sudo chmod -R 755 data
sudo chown -R $USER:$USER data
```

---

## Alternative: Static Export (If VPS Not Available)

If Hostinger shared hosting doesn't support Node.js, you can export as static site:

### 1. Update `next.config.js`

```javascript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // ... rest of config
}
```

### 2. Build Static Site

```bash
npm run build
```

### 3. Upload to Hostinger

- Upload the `out` folder contents to your hosting `public_html` directory
- **Note:** Admin dashboard won't work with static export (requires server-side)

---

## Recommended: Use Vercel (Easier Alternative)

If Hostinger VPS setup is complex, consider **Vercel** (free for personal projects):

1. Push code to GitHub
2. Connect GitHub to Vercel
3. Deploy automatically
4. Free SSL, CDN, and automatic deployments

See `DEPLOYMENT.md` for Vercel instructions.

---

## Support

- Hostinger Support: https://www.hostinger.com/contact
- PM2 Documentation: https://pm2.keymetrics.io/
- Next.js Deployment: https://nextjs.org/docs/deployment

---

## Checklist

- [ ] VPS/Cloud hosting with Node.js support
- [ ] Node.js 18+ installed
- [ ] PM2 installed
- [ ] Nginx configured
- [ ] SSL certificate installed
- [ ] Environment variables set
- [ ] File permissions configured
- [ ] Domain DNS configured
- [ ] Firewall configured
- [ ] Application running and accessible

