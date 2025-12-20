# Deployment Guide - ATECH Portfolio

This guide covers deploying both the Next.js frontend and Strapi backend.

## Frontend Deployment (Next.js)

### Option 1: Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables:
     - `NEXT_PUBLIC_STRAPI_URL` - Your Strapi API URL
     - `STRAPI_API_TOKEN` - Your Strapi API token
     - `NEXT_PUBLIC_SITE_URL` - Your production domain
   - Click "Deploy"

3. **Custom Domain** (Optional)
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

### Option 2: VPS Deployment

#### Prerequisites
- Ubuntu 20.04+ server
- Node.js 18+ installed
- Nginx installed
- PM2 installed

#### Steps

1. **Clone and Build**
   ```bash
   git clone <your-repo-url>
   cd atechportfolio
   npm install
   npm run build
   ```

2. **Create PM2 Ecosystem File** (`ecosystem.config.js`)
   ```javascript
   module.exports = {
     apps: [{
       name: 'atech-portfolio',
       script: 'npm',
       args: 'start',
       env: {
         NODE_ENV: 'production',
         PORT: 3000
       }
     }]
   };
   ```

3. **Start with PM2**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx** (`/etc/nginx/sites-available/atech`)
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

5. **Enable Site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/atech /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

6. **SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

## Backend Deployment (Strapi)

### Option 1: Strapi Cloud

1. Go to [cloud.strapi.io](https://cloud.strapi.io)
2. Create account and project
3. Connect your database
4. Deploy
5. Update `NEXT_PUBLIC_STRAPI_URL` in frontend

### Option 2: VPS Deployment

1. **Install Dependencies**
   ```bash
   cd strapi
   npm install
   ```

2. **Configure Environment**
   Create `.env`:
   ```env
   NODE_ENV=production
   HOST=0.0.0.0
   PORT=1337
   APP_KEYS=your_app_keys_here
   API_TOKEN_SALT=your_api_token_salt
   ADMIN_JWT_SECRET=your_admin_jwt_secret
   TRANSFER_TOKEN_SALT=your_transfer_token_salt
   JWT_SECRET=your_jwt_secret
   DATABASE_CLIENT=postgres
   DATABASE_HOST=your_db_host
   DATABASE_PORT=5432
   DATABASE_NAME=atech_strapi
   DATABASE_USERNAME=your_db_user
   DATABASE_PASSWORD=your_db_password
   ```

3. **Build Strapi**
   ```bash
   npm run build
   ```

4. **Start with PM2**
   ```bash
   pm2 start npm --name "strapi" -- start
   pm2 save
   ```

5. **Configure Nginx for Strapi**
   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;

       location / {
           proxy_pass http://localhost:1337;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **SSL Certificate**
   ```bash
   sudo certbot --nginx -d api.yourdomain.com
   ```

## Database Setup (PostgreSQL)

### Local Development
```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Create database
sudo -u postgres psql
CREATE DATABASE atech_strapi;
CREATE USER strapi_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE atech_strapi TO strapi_user;
\q
```

### Production (Managed Database)

Use services like:
- AWS RDS
- DigitalOcean Managed Databases
- Heroku Postgres
- Railway

Update Strapi `.env` with production database credentials.

## Environment Variables Checklist

### Next.js (.env.local)
- [ ] `NEXT_PUBLIC_STRAPI_URL`
- [ ] `STRAPI_API_TOKEN`
- [ ] `NEXT_PUBLIC_SITE_URL`

### Strapi (.env)
- [ ] `NODE_ENV=production`
- [ ] `HOST=0.0.0.0`
- [ ] `PORT=1337`
- [ ] `APP_KEYS`
- [ ] `API_TOKEN_SALT`
- [ ] `ADMIN_JWT_SECRET`
- [ ] `JWT_SECRET`
- [ ] Database credentials

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify API connections
- [ ] Check image loading
- [ ] Test contact form
- [ ] Verify SEO meta tags
- [ ] Check mobile responsiveness
- [ ] Run Lighthouse audit
- [ ] Set up monitoring (optional)
- [ ] Configure backups
- [ ] Set up error tracking (optional)

## Monitoring & Maintenance

### PM2 Monitoring
```bash
pm2 monit
pm2 logs
pm2 status
```

### Update Deployment
```bash
git pull
npm install
npm run build
pm2 restart all
```

### Backup Strategy

1. **Database Backups**
   ```bash
   pg_dump -U username -d atech_strapi > backup.sql
   ```

2. **Strapi Uploads**
   - Backup `strapi/public/uploads` directory
   - Or use cloud storage (S3, Cloudinary)

3. **Automated Backups**
   - Set up cron jobs
   - Use backup services

## Troubleshooting

### Frontend Issues

**Build Errors**
```bash
rm -rf .next node_modules
npm install
npm run build
```

**API Connection Issues**
- Verify `NEXT_PUBLIC_STRAPI_URL`
- Check CORS settings in Strapi
- Verify API token

### Backend Issues

**Strapi Won't Start**
- Check environment variables
- Verify database connection
- Check logs: `pm2 logs strapi`

**Database Connection**
- Verify credentials
- Check firewall rules
- Ensure database is accessible

## Performance Optimization

1. **Enable Caching**
   - Use CDN for static assets
   - Configure Next.js ISR
   - Set up Redis for Strapi (optional)

2. **Image Optimization**
   - Use Next.js Image component
   - Configure image domains
   - Consider Cloudinary integration

3. **Database Optimization**
   - Add indexes to frequently queried fields
   - Use connection pooling
   - Regular database maintenance

## Security Checklist

- [ ] Use HTTPS (SSL certificates)
- [ ] Secure API tokens
- [ ] Enable CORS properly
- [ ] Regular security updates
- [ ] Database access restrictions
- [ ] Firewall configuration
- [ ] Rate limiting (optional)

---

For support, refer to the main README.md or contact the development team.

