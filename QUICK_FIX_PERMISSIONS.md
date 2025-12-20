# ⚡ Quick Fix: Enable Create Permission

The error says: **"Permission issue! Make sure the Public role has 'create' permission"**

## Fix in 3 Steps:

### Step 1: Open Strapi Admin
Go to: **http://localhost:1337/admin**

### Step 2: Go to Permissions
1. Click **Settings** (bottom left, gear icon)
2. Click **Users & Permissions Plugin**
3. Click **Roles**
4. Click **Public** (the role name)

### Step 3: Enable Create Permission

Scroll down to find each content type. For **EACH** content type, check these boxes:

#### For "Home Page" (Single Type):
- ☑ **find**
- ☑ **findOne**
- ☑ **create** ← **THIS IS THE ONE YOU'RE MISSING!**
- ☑ **update**

#### For "Global Setting" (Single Type):
- ☑ **find**
- ☑ **findOne**
- ☑ **create** ← **THIS ONE TOO!**
- ☑ **update**

#### For Collection Types (Projects, Services, Testimonials, Team Members, Blog Posts):
- ☑ **find**
- ☑ **findOne**
- ☑ **create** ← **AND THIS ONE!**

### Step 4: Save
Click **"Save"** button (top right)

### Step 5: Run Script Again
```bash
node seed-strapi.js
```

---

## Alternative: Use Full Access Token (Easier!)

If you don't want to mess with permissions:

1. **Settings** → **API Tokens**
2. Click **"+ Create new API Token"**
3. Fill in:
   - **Name**: "Seeder Token"
   - **Token type**: **Full access** (NOT Read-only!)
   - **Duration**: Unlimited
4. Click **Save**
5. **Copy the token**
6. Update `seed-strapi.js` line 15 with the new token
7. Run: `node seed-strapi.js`

---

## Visual Guide

```
Strapi Admin
  ↓
Settings (gear icon, bottom left)
  ↓
Users & Permissions Plugin
  ↓
Roles
  ↓
Public (click on it)
  ↓
Scroll down to "Home Page"
  ↓
Check boxes:
  ☑ find
  ☑ findOne
  ☑ create  ← YOU NEED THIS!
  ☑ update
  ↓
Do the same for all other content types
  ↓
Click "Save" (top right)
```

---

**After saving permissions, the script will work!** 🎉

