# ⚠️ CRITICAL: Content Types Don't Exist!

The diagnostic shows **all content types are missing (404)**. You **MUST create them first** before running the seeder script!

## The Problem

You're getting "Method Not Allowed" because:
- ❌ Content types don't exist in Strapi
- ❌ You can't create entries for content types that don't exist

## Solution: Create Content Types First

### Step 1: Open Strapi Admin
Go to: **http://localhost:1337/admin**

### Step 2: Create Content Types

Go to **Content-Type Builder** (left sidebar) and create these:

#### 1. Home Page (Single Type)
1. Click **"+ Create new single type"**
2. Display name: `Home Page`
3. API ID: `home-page`
4. Add fields (see `STRAPI_VISUAL_GUIDE.md` for details)
5. Click **Save**

#### 2. Project (Collection Type)
1. Click **"+ Create new collection type"**
2. Display name: `Project`
3. API ID: `project`
4. Add fields: title, slug, description, featured, techStack, etc.
5. Click **Save**

#### 3. Service (Collection Type)
1. **"+ Create new collection type"**
2. Display name: `Service`
3. API ID: `service`
4. Add fields: title, slug, description, icon
5. Click **Save**

#### 4. Testimonial (Collection Type)
1. **"+ Create new collection type"**
2. Display name: `Testimonial`
3. API ID: `testimonial`
4. Add fields: name, role, company, content, rating, avatar
5. Click **Save**

#### 5. Team Member (Collection Type)
1. **"+ Create new collection type"**
2. Display name: `Team Member`
3. API ID: `team-member`
4. Add fields: name, role, bio, avatar, socialLinks (component)
5. Click **Save**

#### 6. Blog Post (Collection Type)
1. **"+ Create new collection type"**
2. Display name: `Blog Post`
3. API ID: `blog-post`
4. Add fields: title, slug, excerpt, content, publishedAt, category, tags, featuredImage
5. Click **Save**

#### 7. Global Setting (Single Type)
1. **"+ Create new single type"**
2. Display name: `Global Setting`
3. API ID: `global-setting`
4. Add fields: siteName, logo, favicon, socialLinks (component), seoDefaults (component)
5. Click **Save**

### Step 3: Set Permissions

1. **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. For **EACH** content type, enable:
   - ☑ **find**
   - ☑ **findOne**
   - ☑ **create**
   - ☑ **update** (for single types)
3. Click **Save**

### Step 4: Fix API Token

The diagnostic shows your token is invalid (401). 

1. **Settings** → **API Tokens**
2. Create a **NEW** token:
   - Name: "Seeder Token"
   - Type: **Full access**
   - Duration: Unlimited
3. **Copy the token**
4. Update `seed-strapi.js` line 15 with the new token

### Step 5: Test Again

Run the diagnostic:
```bash
node test-strapi-api.js
```

You should see:
- ✅ All content types exist
- ✅ API token is valid
- ✅ Create permission works

### Step 6: Run Seeder

```bash
node seed-strapi.js
```

---

## Quick Reference

**Detailed field configurations:** See `STRAPI_VISUAL_GUIDE.md` or `STRAPI_COMPLETE_SETUP.md`

**Sample data:** See `strapi/SAMPLE_DATA.md`

---

## Why This Happened

You tried to run the seeder before creating the content types. Strapi needs the content type structure to exist before you can add data to it.

**Order matters:**
1. ✅ Create content types
2. ✅ Set permissions
3. ✅ Create API token
4. ✅ Run seeder script

