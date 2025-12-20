# Complete Strapi Setup Guide - Step by Step

Follow these steps in order to configure Strapi and start adding content.

---

## PART 1: Configure Strapi for Your Site

### Step 1: Enable CORS (Allow Next.js to Access Strapi)

1. Open `strapi/strapi/config/middlewares.ts`
2. Find or add the CORS configuration:

```typescript
export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

3. Create or update `strapi/strapi/config/middlewares.ts` with CORS settings:

```typescript
export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['http://localhost:3000', 'http://localhost:3001'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

4. **Restart Strapi** (Ctrl+C, then `npm run develop`)

---

### Step 2: Create Content Types

You need to create 7 content types. Here's how:

#### 2.1: Home Page (Single Type)

1. Go to **Content-Type Builder** (left sidebar)
2. Click **"+ Create new collection type"** or **"+ Create new single type"**
3. Select **"Single Type"**
4. Display name: **"Home Page"**
5. API ID (singular): **"home-page"**
6. Click **"Continue"**

**Add Fields:**

Click **"+ Add another field"** and add:

**Component: Hero**
- Click **"Component"**
- Name: **"hero"**
- Type: **"Single component"**
- Click **"Continue"**
- Click **"+ Add another field"**:
  - **title** (Text, Short text)
  - **subtitle** (Text, Long text)
  - **ctaText** (Text, Short text)
  - **ctaLink** (Text, Short text)
  - **backgroundImage** (Media, Single media)
- Click **"Finish"**

**Component: CTA**
- Click **"Component"** again
- Name: **"cta"**
- Type: **"Single component"**
- Click **"Continue"**
- Add fields:
  - **title** (Text, Short text)
  - **description** (Text, Long text)
  - **ctaText** (Text, Short text)
  - **ctaLink** (Text, Short text)
- Click **"Finish"**

Click **"Save"** (top right)

---

#### 2.2: Service (Collection Type)

1. **Content-Type Builder** → **"+ Create new collection type"**
2. Display name: **"Service"**
3. API ID (singular): **"service"**
4. Click **"Continue"**

**Add Fields:**
- **title** (Text, Short text) - Required
- **slug** (Text, UID) - Based on: title - Required
- **description** (Text, Long text) - Required
- **icon** (Text, Short text) - Optional (values: "web", "mobile", "code", "database", "performance", "security")

Click **"Save"**

---

#### 2.3: Project (Collection Type)

1. **Content-Type Builder** → **"+ Create new collection type"**
2. Display name: **"Project"**
3. API ID (singular): **"project"**
4. Click **"Continue"**

**Add Fields:**
- **title** (Text, Short text) - Required
- **slug** (Text, UID) - Based on: title - Required
- **description** (Text, Long text) - Required
- **featured** (Boolean) - Default: false
- **techStack** (JSON) - Optional (will store array)
- **projectUrl** (Text, Short text) - Optional
- **githubUrl** (Text, Short text) - Optional
- **images** (Media, Multiple media) - Optional
- **thumbnail** (Media, Single media) - Optional

Click **"Save"**

---

#### 2.4: Testimonial (Collection Type)

1. **Content-Type Builder** → **"+ Create new collection type"**
2. Display name: **"Testimonial"**
3. API ID (singular): **"testimonial"**
4. Click **"Continue"**

**Add Fields:**
- **name** (Text, Short text) - Required
- **role** (Text, Short text) - Required
- **company** (Text, Short text) - Required
- **content** (Text, Long text) - Required
- **rating** (Number, Integer) - Required (Min: 1, Max: 5)
- **avatar** (Media, Single media) - Optional

Click **"Save"**

---

#### 2.5: Team Member (Collection Type)

1. **Content-Type Builder** → **"+ Create new collection type"**
2. Display name: **"Team Member"**
3. API ID (singular): **"team-member"**
4. Click **"Continue"**

**Add Fields:**
- **name** (Text, Short text) - Required
- **role** (Text, Short text) - Required
- **bio** (Text, Long text) - Required
- **avatar** (Media, Single media) - Optional

**Component: Social Links**
- Click **"Component"**
- Name: **"socialLinks"**
- Type: **"Single component"**
- Add fields:
  - **linkedin** (Text, Short text) - Optional
  - **twitter** (Text, Short text) - Optional
  - **github** (Text, Short text) - Optional
- Click **"Finish"**

Click **"Save"**

---

#### 2.6: Blog Post (Collection Type)

1. **Content-Type Builder** → **"+ Create new collection type"**
2. Display name: **"Blog Post"**
3. API ID (singular): **"blog-post"**
4. Click **"Continue"**

**Add Fields:**
- **title** (Text, Short text) - Required
- **slug** (Text, UID) - Based on: title - Required
- **excerpt** (Text, Long text) - Required
- **content** (Rich text) - Required
- **publishedAt** (Date, Date) - Required
- **category** (Text, Short text) - Optional
- **tags** (JSON) - Optional
- **featuredImage** (Media, Single media) - Optional
- **author** (Relation, Many-to-One) - Optional - Related to: Team Member

Click **"Save"**

---

#### 2.7: Global Setting (Single Type)

1. **Content-Type Builder** → **"+ Create new single type"**
2. Display name: **"Global Setting"**
3. API ID (singular): **"global-setting"**
4. Click **"Continue"**

**Add Fields:**
- **siteName** (Text, Short text) - Required, Default: "ATECH"
- **logo** (Media, Single media) - Optional
- **favicon** (Media, Single media) - Optional

**Component: Social Links**
- Click **"Component"**
- Name: **"socialLinks"**
- Type: **"Single component"**
- Add fields:
  - **facebook** (Text, Short text) - Optional
  - **twitter** (Text, Short text) - Optional
  - **linkedin** (Text, Short text) - Optional
  - **github** (Text, Short text) - Optional
  - **instagram** (Text, Short text) - Optional
- Click **"Finish"**

**Component: SEO Defaults**
- Click **"Component"**
- Name: **"seoDefaults"**
- Type: **"Single component"**
- Add fields:
  - **metaTitle** (Text, Short text) - Optional
  - **metaDescription** (Text, Long text) - Optional
  - **metaImage** (Media, Single media) - Optional
- Click **"Finish"**

Click **"Save"**

---

### Step 3: Set Permissions (IMPORTANT!)

1. Go to **Settings** (bottom left) → **Users & Permissions Plugin** → **Roles**
2. Click on **"Public"** role
3. Under **Permissions**, find each content type:
   - **Home Page**: Enable ✅ **find** and ✅ **findOne**
   - **Service**: Enable ✅ **find** and ✅ **findOne**
   - **Project**: Enable ✅ **find** and ✅ **findOne**
   - **Testimonial**: Enable ✅ **find** and ✅ **findOne**
   - **Team Member**: Enable ✅ **find** and ✅ **findOne**
   - **Blog Post**: Enable ✅ **find** and ✅ **findOne**
   - **Global Setting**: Enable ✅ **find** and ✅ **findOne**
4. Click **"Save"** (top right)

**⚠️ Without this, your Next.js site won't be able to fetch data!**

---

### Step 4: Create API Token

1. Go to **Settings** → **API Tokens**
2. Click **"+ Create new API Token"**
3. Fill in:
   - **Name**: "Frontend Token"
   - **Token type**: **Read-only**
   - **Token duration**: Unlimited (or set expiration)
4. Click **"Save"**
5. **COPY THE TOKEN** (you'll need it!)
6. Add to your `.env.local` file:
   ```env
   STRAPI_API_TOKEN=your_copied_token_here
   ```

---

## PART 2: Add Content

Now you can add content! Here's how:

### Adding a Project

1. Go to **Content Manager** (left sidebar)
2. Click **"Project"**
3. Click **"+ Create new entry"**
4. Fill in:
   - **Title**: "My First Project"
   - **Slug**: Auto-generated (or edit)
   - **Description**: Full project description
   - **Featured**: Toggle ON (to show on homepage)
   - **Tech Stack**: Click "Add an entry", type "Next.js", click "Add an entry" again, type "React", etc.
   - **Project URL**: "https://example.com" (optional)
   - **GitHub URL**: "https://github.com/user/repo" (optional)
   - **Thumbnail**: Click to upload image
   - **Images**: Click to upload multiple images
5. Click **"Save"**
6. Click **"Publish"** ⚠️ **IMPORTANT: Must publish!**

### Adding a Service

1. **Content Manager** → **Service** → **"+ Create new entry"**
2. Fill in:
   - **Title**: "Web Development"
   - **Slug**: "web-development"
   - **Description**: "Modern web applications..."
   - **Icon**: "web"
3. Click **"Save"** then **"Publish"**

### Adding Home Page Content

1. **Content Manager** → **Home Page** → **"Edit"**
2. Fill in Hero section:
   - **Title**: "Building Digital Excellence"
   - **Subtitle**: "We craft premium software..."
   - **CTA Text**: "Start Your Project"
   - **CTA Link**: "/contact"
3. Fill in CTA section:
   - **Title**: "Ready to Start Your Project?"
   - **Description**: "Let's work together..."
   - **CTA Text**: "Get Started"
   - **CTA Link**: "/contact"
4. Click **"Save"** then **"Publish"**

### Adding Other Content

- **Testimonials**: Content Manager → Testimonial
- **Team Members**: Content Manager → Team Member
- **Blog Posts**: Content Manager → Blog Post
- **Global Settings**: Content Manager → Global Setting

---

## Quick Checklist

- [ ] CORS configured in `middlewares.ts`
- [ ] All 7 content types created
- [ ] Permissions set (Public role can find/findOne)
- [ ] API token created and added to `.env.local`
- [ ] Home page content added and published
- [ ] At least one project added and published
- [ ] At least one service added and published

---

## Test Your Setup

1. **Test API**: Visit http://localhost:1337/api/projects
   - Should see JSON data (even if empty array)

2. **Test Website**: Visit http://localhost:3000
   - Should see content from Strapi

3. **Check Console**: Open browser DevTools (F12)
   - Should see no API errors

---

## Troubleshooting

**"Cannot GET /api/projects"**
- Check permissions are set (Step 3)
- Verify API token in `.env.local`
- Restart Next.js dev server

**"CORS error"**
- Check CORS config in `middlewares.ts`
- Restart Strapi

**"Content not showing"**
- Make sure content is **Published** (not just saved)
- Check API token permissions
- Verify `NEXT_PUBLIC_STRAPI_URL` in `.env.local`

---

**Need sample data?** See `strapi/SAMPLE_DATA.md` for ready-to-use content!

