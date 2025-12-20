# Strapi Setup & Adding Data - Visual Guide

## 🎯 Quick Start: Configure Strapi in 3 Steps

### Step 1: Enable CORS ✅ (Already Done!)

I've updated your `middlewares.ts` file. **Restart Strapi** for changes to take effect:
- Press `Ctrl+C` in Strapi terminal
- Run `npm run develop` again

---

### Step 2: Create Content Types

Go to **Content-Type Builder** (left sidebar in Strapi admin).

#### 📄 Create "Home Page" (Single Type)

1. Click **"+ Create new single type"**
2. Display name: `Home Page`
3. API ID: `home-page`
4. Click **Continue**

**Add Hero Component:**
- Click **"+ Add another field"** → **Component**
- Name: `hero`, Type: **Single component**
- Add fields:
  - `title` (Text, Short text)
  - `subtitle` (Text, Long text)  
  - `ctaText` (Text, Short text)
  - `ctaLink` (Text, Short text)
  - `backgroundImage` (Media, Single media)
- Click **Finish**

**Add CTA Component:**
- Click **"+ Add another field"** → **Component**
- Name: `cta`, Type: **Single component**
- Add fields:
  - `title` (Text, Short text)
  - `description` (Text, Long text)
  - `ctaText` (Text, Short text)
  - `ctaLink` (Text, Short text)
- Click **Finish**

Click **Save** (top right)

---

#### 🎨 Create "Project" (Collection Type)

1. Click **"+ Create new collection type"**
2. Display name: `Project`
3. API ID: `project`
4. Click **Continue**

**Add Fields:**
- `title` (Text, Short text) ✅ Required
- `slug` (Text, UID) ✅ Required - Based on: `title`
- `description` (Text, Long text) ✅ Required
- `featured` (Boolean) - Default: false
- `techStack` (JSON) - Optional
- `projectUrl` (Text, Short text) - Optional
- `githubUrl` (Text, Short text) - Optional
- `images` (Media, Multiple media) - Optional
- `thumbnail` (Media, Single media) - Optional

Click **Save**

---

#### 🛠️ Create "Service" (Collection Type)

1. **"+ Create new collection type"**
2. Display name: `Service`
3. API ID: `service`
4. Click **Continue**

**Add Fields:**
- `title` (Text, Short text) ✅ Required
- `slug` (Text, UID) ✅ Required - Based on: `title`
- `description` (Text, Long text) ✅ Required
- `icon` (Text, Short text) - Optional

Click **Save**

---

#### 💬 Create "Testimonial" (Collection Type)

1. **"+ Create new collection type"**
2. Display name: `Testimonial`
3. API ID: `testimonial`
4. Click **Continue**

**Add Fields:**
- `name` (Text, Short text) ✅ Required
- `role` (Text, Short text) ✅ Required
- `company` (Text, Short text) ✅ Required
- `content` (Text, Long text) ✅ Required
- `rating` (Number, Integer) ✅ Required - Min: 1, Max: 5
- `avatar` (Media, Single media) - Optional

Click **Save**

---

#### 👥 Create "Team Member" (Collection Type)

1. **"+ Create new collection type"**
2. Display name: `Team Member`
3. API ID: `team-member`
4. Click **Continue**

**Add Fields:**
- `name` (Text, Short text) ✅ Required
- `role` (Text, Short text) ✅ Required
- `bio` (Text, Long text) ✅ Required
- `avatar` (Media, Single media) - Optional

**Add Social Links Component:**
- Click **"+ Add another field"** → **Component**
- Name: `socialLinks`, Type: **Single component**
- Add fields:
  - `linkedin` (Text, Short text) - Optional
  - `twitter` (Text, Short text) - Optional
  - `github` (Text, Short text) - Optional
- Click **Finish**

Click **Save**

---

#### 📝 Create "Blog Post" (Collection Type)

1. **"+ Create new collection type"**
2. Display name: `Blog Post`
3. API ID: `blog-post`
4. Click **Continue**

**Add Fields:**
- `title` (Text, Short text) ✅ Required
- `slug` (Text, UID) ✅ Required - Based on: `title`
- `excerpt` (Text, Long text) ✅ Required
- `content` (Rich text) ✅ Required
- `publishedAt` (Date, Date) ✅ Required
- `category` (Text, Short text) - Optional
- `tags` (JSON) - Optional
- `featuredImage` (Media, Single media) - Optional
- `author` (Relation, Many-to-One) - Optional - Related to: **Team Member**

Click **Save**

---

#### ⚙️ Create "Global Setting" (Single Type)

1. **"+ Create new single type"**
2. Display name: `Global Setting`
3. API ID: `global-setting`
4. Click **Continue**

**Add Fields:**
- `siteName` (Text, Short text) ✅ Required - Default: "ATECH"
- `logo` (Media, Single media) - Optional
- `favicon` (Media, Single media) - Optional

**Add Social Links Component:**
- Click **"+ Add another field"** → **Component**
- Name: `socialLinks`, Type: **Single component**
- Add fields:
  - `facebook` (Text, Short text) - Optional
  - `twitter` (Text, Short text) - Optional
  - `linkedin` (Text, Short text) - Optional
  - `github` (Text, Short text) - Optional
  - `instagram` (Text, Short text) - Optional
- Click **Finish**

**Add SEO Defaults Component:**
- Click **"+ Add another field"** → **Component**
- Name: `seoDefaults`, Type: **Single component**
- Add fields:
  - `metaTitle` (Text, Short text) - Optional
  - `metaDescription` (Text, Long text) - Optional
  - `metaImage` (Media, Single media) - Optional
- Click **Finish**

Click **Save**

---

### Step 3: Set Permissions ⚠️ CRITICAL!

1. Go to **Settings** (bottom left) → **Users & Permissions Plugin** → **Roles**
2. Click **"Public"** role
3. Scroll down to **Permissions**
4. For EACH content type, enable:
   - ✅ **find** (allows listing)
   - ✅ **findOne** (allows single item)
5. Click **Save** (top right)

**Without this, your website won't be able to fetch data!**

---

### Step 4: Create API Token

1. Go to **Settings** → **API Tokens**
2. Click **"+ Create new API Token"**
3. Fill in:
   - **Name**: `Frontend Token`
   - **Token type**: **Read-only**
   - **Token duration**: Unlimited
4. Click **Save**
5. **COPY THE TOKEN** (you'll only see it once!)
6. Add to `.env.local`:
   ```env
   STRAPI_API_TOKEN=paste_your_token_here
   ```

---

## 📝 How to Add Data

### Adding a Project

1. Go to **Content Manager** → **Project**
2. Click **"+ Create new entry"**
3. Fill in:
   ```
   Title: E-Commerce Platform
   Slug: ecommerce-platform (auto-generated)
   Description: A modern e-commerce platform built with Next.js...
   Featured: ✅ ON
   Tech Stack: 
     - Click "Add an entry" → Type "Next.js"
     - Click "Add an entry" → Type "React"
     - Click "Add an entry" → Type "TypeScript"
   Project URL: https://example.com
   GitHub URL: https://github.com/user/repo
   Thumbnail: [Upload image - 1200x630px recommended]
   Images: [Upload multiple images]
   ```
4. Click **Save**
5. Click **Publish** ⚠️ **Must publish to see on website!**

### Adding a Service

1. **Content Manager** → **Service** → **"+ Create new entry"**
2. Fill in:
   ```
   Title: Web Development
   Slug: web-development
   Description: Modern, responsive web applications built with cutting-edge technologies...
   Icon: web
   ```
3. Click **Save** → **Publish**

### Adding Home Page Content

1. **Content Manager** → **Home Page** → **Edit**
2. Fill in **Hero** section:
   ```
   Title: Building Digital Excellence
   Subtitle: We craft premium software solutions that transform businesses...
   CTA Text: Start Your Project
   CTA Link: /contact
   Background Image: [Optional - upload image]
   ```
3. Fill in **CTA** section:
   ```
   Title: Ready to Start Your Project?
   Description: Let's work together to bring your vision to life...
   CTA Text: Get Started
   CTA Link: /contact
   ```
4. Click **Save** → **Publish**

### Adding Other Content

- **Testimonials**: Content Manager → Testimonial
- **Team Members**: Content Manager → Team Member  
- **Blog Posts**: Content Manager → Blog Post
- **Global Settings**: Content Manager → Global Setting

---

## ✅ Quick Checklist

- [ ] CORS configured (middlewares.ts updated)
- [ ] Strapi restarted
- [ ] All 7 content types created
- [ ] Permissions set (Public → find & findOne)
- [ ] API token created and added to `.env.local`
- [ ] Home page content added and published
- [ ] At least one project added and published
- [ ] At least one service added and published

---

## 🧪 Test Your Setup

1. **Test API**: Visit http://localhost:1337/api/projects
   - Should see JSON (even if empty: `{"data":[]}`)

2. **Test Website**: Visit http://localhost:3000
   - Should see content from Strapi

3. **Check Console**: Press F12 → Console tab
   - Should see no errors

---

## 🆘 Troubleshooting

**"Cannot GET /api/projects"**
- ✅ Check permissions (Step 3)
- ✅ Verify API token in `.env.local`
- ✅ Restart Next.js: `npm run dev`

**"CORS error"**
- ✅ Check `middlewares.ts` updated
- ✅ Restart Strapi

**"Content not showing"**
- ✅ Make sure content is **Published** (not just saved!)
- ✅ Check API token permissions
- ✅ Verify `NEXT_PUBLIC_STRAPI_URL=http://localhost:1337` in `.env.local`

---

**Need sample data?** Check `strapi/SAMPLE_DATA.md` for ready-to-use content examples!

