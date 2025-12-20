# Fix: Can't Access Strapi

## Problem
You can't access Strapi at http://localhost:1337/admin

## Solution

### Step 1: Check if Strapi is Installed

The `strapi` folder exists but only has documentation. You need to install Strapi.

### Step 2: Install Strapi

**Option A: Use the Install Script (Easiest)**

1. Double-click `install-strapi.bat` in your project folder
2. Wait 2-5 minutes for installation
3. Create admin account when prompted
4. Strapi will open automatically

**Option B: Manual Installation**

Open PowerShell or Command Prompt in your project folder and run:

```powershell
npx create-strapi-app@latest strapi --quickstart
```

**What happens:**
- Creates Strapi installation in `strapi` folder
- Uses SQLite (no database setup needed)
- Installs all dependencies
- Prompts you to create admin account

### Step 3: Start Strapi

**Option A: Use the Start Script**

Double-click `start-strapi.bat`

**Option B: Manual Start**

```powershell
cd strapi
npm run develop
```

### Step 4: Access Strapi

Once running, open your browser and go to:
**http://localhost:1337/admin**

Login with the admin account you created.

---

## Common Issues

### "Port 1337 already in use"

**Fix:** Something else is using port 1337. Either:
1. Stop the other application
2. Or change Strapi port in `strapi/config/server.js`:
   ```javascript
   port: env.int('PORT', 1338),
   ```
   Then access at: http://localhost:1338/admin

### "Cannot find module"

**Fix:**
```powershell
cd strapi
rm -rf node_modules
npm install
npm run develop
```

### Installation takes too long

This is normal! Strapi installation can take 2-5 minutes. Be patient.

### Strapi installs but won't start

**Fix:**
1. Check Node.js version (need 18+):
   ```powershell
   node --version
   ```

2. Clear and reinstall:
   ```powershell
   cd strapi
   Remove-Item -Recurse -Force .cache, node_modules
   npm install
   npm run develop
   ```

---

## Verify It's Working

1. ✅ Strapi terminal shows: "Server started on port 1337"
2. ✅ Browser opens to: http://localhost:1337/admin
3. ✅ You can log in with your admin account
4. ✅ You see the Strapi dashboard

---

## After Strapi is Running

1. **Create Content Types** - See `strapi/config/content-types.md`
2. **Set Permissions** - Settings → Users & Permissions → Public → Enable find/findOne
3. **Create API Token** - Settings → API Tokens → Create Read-only token
4. **Add to `.env.local`**:
   ```env
   STRAPI_API_TOKEN=your_token_here
   ```

---

## Quick Commands

```powershell
# Install Strapi (from project root)
npx create-strapi-app@latest strapi --quickstart

# Start Strapi (from project root)
cd strapi
npm run develop

# Or use the batch files:
# Double-click: install-strapi.bat
# Double-click: start-strapi.bat
```

---

**Need more help?** See `STRAPI_QUICK_INSTALL.md` for detailed instructions.

