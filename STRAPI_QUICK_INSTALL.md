# Quick Strapi Installation Guide

If you can't access Strapi, it's likely not installed or not running. Follow these steps:

## Option 1: Quick Start (SQLite - No Database Setup Needed) ⚡

This is the fastest way to get Strapi running for development:

### Step 1: Install Strapi

Open a **new terminal/command prompt** in your project root directory and run:

```bash
npx create-strapi-app@latest strapi --quickstart
```

**What this does:**
- Creates a `strapi` folder
- Uses SQLite (no database setup needed!)
- Installs all dependencies
- Sets up basic configuration

### Step 2: Wait for Installation

The installation will:
1. Download Strapi
2. Install dependencies (this takes 2-5 minutes)
3. Ask you to create an admin account

### Step 3: Create Admin Account

When prompted, enter:
- **First Name**: Your name
- **Last Name**: Your last name
- **Email**: Your email
- **Password**: Create a strong password

### Step 4: Access Strapi Admin

After setup, Strapi will automatically open at:
**http://localhost:1337/admin**

If it doesn't open automatically, manually visit that URL.

### Step 5: Start Strapi (If Not Running)

If Strapi isn't running, navigate to the strapi folder and start it:

```bash
cd strapi
npm run develop
```

Strapi will be available at: **http://localhost:1337/admin**

---

## Option 2: Manual Installation (If Quick Start Fails)

### Step 1: Create Strapi Folder

```bash
mkdir strapi
cd strapi
```

### Step 2: Initialize Strapi

```bash
npx create-strapi-app@latest . --quickstart
```

### Step 3: Start Strapi

```bash
npm run develop
```

---

## Troubleshooting

### "Port 1337 already in use"

**Solution 1:** Stop whatever is using port 1337
```bash
# Windows PowerShell
netstat -ano | findstr :1337
taskkill /PID <PID_NUMBER> /F

# Or change Strapi port in strapi/config/server.js
```

**Solution 2:** Use a different port
Edit `strapi/config/server.js`:
```javascript
port: env.int('PORT', 1338),
```
Then access at: http://localhost:1338/admin

### "Cannot find module" errors

```bash
cd strapi
rm -rf node_modules package-lock.json
npm install
```

### "Permission denied" errors

**Windows:** Run terminal as Administrator
**Mac/Linux:** Use `sudo` if needed

### Strapi installs but won't start

1. Check Node.js version (need 18+):
   ```bash
   node --version
   ```

2. Clear cache and reinstall:
   ```bash
   cd strapi
   rm -rf .cache node_modules
   npm install
   npm run develop
   ```

### "EADDRINUSE" error

Port 1337 is already in use. Either:
- Stop the other application
- Change Strapi port (see above)

---

## Verify Strapi is Running

1. **Check if it's running:**
   - Visit: http://localhost:1337/admin
   - You should see the login page

2. **Check terminal output:**
   - Should see: "Server started on port 1337"
   - Should see: "Admin panel available at /admin"

3. **Test API:**
   - Visit: http://localhost:1337/api
   - Should see API information

---

## Next Steps After Strapi is Running

1. **Create Content Types** (see `strapi/config/content-types.md`)
2. **Set Permissions** (Settings → Users & Permissions → Public → Enable find/findOne)
3. **Create API Token** (Settings → API Tokens → Create Read-only token)
4. **Add Token to `.env.local`**:
   ```env
   STRAPI_API_TOKEN=your_token_here
   ```

---

## Still Having Issues?

### Check These:

1. ✅ Node.js version: `node --version` (should be 18+)
2. ✅ Strapi folder exists: `ls strapi` or `dir strapi`
3. ✅ Strapi is running: Check terminal for "Server started"
4. ✅ Port is correct: http://localhost:1337/admin
5. ✅ No firewall blocking: Check Windows Firewall/Antivirus

### Get Help:

- Check Strapi logs in terminal
- Visit: https://docs.strapi.io
- Check browser console for errors

---

## Quick Command Reference

```bash
# Install Strapi (from project root)
npx create-strapi-app@latest strapi --quickstart

# Start Strapi (from strapi folder)
cd strapi
npm run develop

# Stop Strapi
Press Ctrl+C in terminal

# Restart Strapi
npm run develop
```

---

**Once Strapi is running, you can add content!** See `STRAPI_ADDING_CONTENT.md` for how to add projects and other content.

