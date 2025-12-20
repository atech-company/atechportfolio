# Fix Strapi Permissions for Seeder Script

The "Method Not Allowed" (405) error means your API token doesn't have permission to create/update content.

## Quick Fix

### Step 1: Set Permissions for Single Types

1. Go to **Strapi Admin** → **Settings** → **Users & Permissions Plugin** → **Roles**
2. Click **"Public"** role
3. Scroll to find **"Home Page"** and **"Global Setting"**
4. Enable these permissions:
   - ✅ **find**
   - ✅ **findOne**
   - ✅ **create** (needed to create if doesn't exist)
   - ✅ **update** (needed to update if exists)
5. Click **"Save"**

### Step 2: Set Permissions for Collection Types

For **Projects**, **Services**, **Testimonials**, **Team Members**, and **Blog Posts**:

1. In the same **Public** role
2. For each collection type, enable:
   - ✅ **find**
   - ✅ **findOne**
   - ✅ **create** (needed to create entries)
3. Click **"Save"**

### Step 3: Alternative - Use Full Access Token

If you want to skip permission setup:

1. Go to **Settings** → **API Tokens**
2. Create a new token:
   - **Name**: "Seeder Token"
   - **Token type**: **Full access** (instead of Read-only)
   - **Duration**: Unlimited
3. Copy the new token
4. Update `seed-strapi.js` with the new token
5. Run the script again

## Visual Guide

### For Single Types (Home Page, Global Setting):
```
Settings → Users & Permissions → Roles → Public
  ↓
Find "Home Page" section
  ↓
Enable:
  ☑ find
  ☑ findOne
  ☑ create
  ☑ update
```

### For Collection Types (Projects, Services, etc.):
```
Settings → Users & Permissions → Roles → Public
  ↓
Find "Project" section (and others)
  ↓
Enable:
  ☑ find
  ☑ findOne
  ☑ create
```

## After Fixing Permissions

1. **Save** the permissions
2. **Run the script again**:
   ```bash
   node seed-strapi.js
   ```

## Still Getting Errors?

1. **Check API Token**: Make sure it's correct in `seed-strapi.js`
2. **Check Strapi is Running**: Visit http://localhost:1337/admin
3. **Check Content Types Exist**: Go to Content-Type Builder and verify all types are created
4. **Try Full Access Token**: Use a Full access token instead of Read-only

---

**Note**: The seeder script needs `create` permission to add new entries. Read-only tokens won't work for seeding!

