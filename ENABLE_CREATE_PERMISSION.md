npm run develop# Enable Create Permission - Quick Fix

Your content types exist, but they're missing the **create** permission. This is why you're getting "Method Not Allowed" errors.

## Fix in 2 Minutes

### Step 1: Open Permissions
1. Go to **Strapi Admin**: http://localhost:1337/admin
2. Click **Settings** (gear icon, bottom left)
3. Click **Users & Permissions Plugin**
4. Click **Roles**
5. Click **Public** (the role name)

### Step 2: Enable Create Permission

Scroll down to find each content type. For **EACH** one, check these boxes:

#### For Single Types (Home Page, Global Setting):
- ☑ **find**
- ☑ **findOne**
- ☑ **create** ← **YOU NEED THIS!**
- ☑ **update** ← **AND THIS!**

#### For Collection Types (Project, Service, Testimonial, Team Member, Blog Post):
- ☑ **find**
- ☑ **findOne**
- ☑ **create** ← **YOU NEED THIS!**

### Step 3: Save
Click **"Save"** button (top right corner)

### Step 4: Verify
Run the verification script:
```bash
node verify-content-types.js
```

You should now see:
- ✅ All content types exist
- ✅ All have create permission

### Step 5: Run Seeder
```bash
node seed-strapi.js
```

---

## Visual Guide

```
Strapi Admin
  ↓
Settings (bottom left)
  ↓
Users & Permissions Plugin
  ↓
Roles
  ↓
Public (click it)
  ↓
Scroll to "Home Page"
  ↓
Check boxes:
  ☑ find
  ☑ findOne
  ☑ create  ← CHECK THIS!
  ☑ update  ← CHECK THIS!
  ↓
Do the same for ALL other content types
  ↓
Click "Save" (top right)
```

---

## Why This Happens

By default, Strapi only enables **find** and **findOne** for the Public role (read-only access). To create entries via API, you need to explicitly enable **create** permission.

---

**After enabling create permission, your seeder script will work!** 🎉

