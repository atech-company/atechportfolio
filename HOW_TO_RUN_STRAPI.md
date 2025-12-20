# How to Run Strapi

## Quick Start

### Step 1: Navigate to Strapi Folder

Open PowerShell or Command Prompt and go to the Strapi folder:

```bash
cd strapi/strapi
```

Or if you're in the project root:

```bash
cd strapi
cd strapi
```

### Step 2: Start Strapi

Run the development server:

```bash
npm run develop
```

### Step 3: Wait for Strapi to Start

You should see:
```
Server started on port 1337
Admin panel available at /admin
```

### Step 4: Access Strapi Admin

Open your browser and go to:
**http://localhost:1337/admin**

---

## Alternative: Use the Batch File

If you're on Windows, you can also use the batch file:

1. Double-click `start-strapi.bat` in your project root folder

---

## Stop Strapi

To stop Strapi:
- Press `Ctrl+C` in the terminal where Strapi is running

---

## Troubleshooting

### "Cannot find module"
```bash
cd strapi/strapi
npm install
npm run develop
```

### "Port 1337 already in use"
- Stop whatever is using port 1337
- Or change the port in `strapi/strapi/config/server.ts`

### "Command not found"
- Make sure you're in the `strapi/strapi` folder
- Make sure Node.js is installed: `node --version`

---

## Full Command Reference

```bash
# Navigate to Strapi
cd strapi/strapi

# Start development server
npm run develop

# Build for production
npm run build

# Start production server
npm start
```

---

**Once Strapi is running, you can access the admin panel and run your seeder script!**

