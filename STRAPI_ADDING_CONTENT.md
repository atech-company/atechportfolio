# How to Add Content in Strapi - Step by Step Guide

This guide shows you exactly how to add projects, services, blog posts, and other content through the Strapi admin panel.

## Prerequisites

- Strapi is installed and running (http://localhost:1337)
- You have an admin account
- Content types are created (see `strapi/config/content-types.md`)

## Adding Projects

### Step 1: Access Strapi Admin

1. Go to http://localhost:1337/admin
2. Log in with your admin credentials

### Step 2: Navigate to Projects

1. In the left sidebar, click on **"Content Manager"**
2. Find and click on **"Project"** (or "Projects")

### Step 3: Create a New Project

1. Click the **"+ Create new entry"** button (top right)
2. Fill in the fields:

   **Required Fields:**
   - **Title**: e.g., "E-Commerce Platform"
   - **Slug**: Auto-generated from title (or edit manually)
   - **Description**: Full description of the project
   - **Featured**: Toggle ON if you want it on the homepage

   **Optional Fields:**
   - **Tech Stack**: Click "Add an entry" and add technologies one by one
     - Example: "Next.js", "React", "TypeScript", "PostgreSQL"
   - **Project URL**: Live demo URL (e.g., "https://example.com")
   - **GitHub URL**: Repository URL (e.g., "https://github.com/user/repo")
   - **Images**: Click to upload multiple images
   - **Thumbnail**: Upload a single thumbnail image (recommended: 1200x630px)

### Step 4: Save and Publish

1. Click **"Save"** (saves as draft)
2. Click **"Publish"** (makes it visible on the website)
3. Your project will now appear on `/portfolio` page!

### Example Project Data

```
Title: Modern SaaS Dashboard
Slug: modern-saas-dashboard
Description: A comprehensive SaaS dashboard with analytics, user management, and subscription handling. Built with modern technologies for optimal performance.
Featured: ✅ ON
Tech Stack:
  - Next.js
  - TypeScript
  - Tailwind CSS
  - PostgreSQL
  - Stripe
Project URL: https://demo.example.com
GitHub URL: https://github.com/atech/saas-dashboard
Thumbnail: [Upload image]
Images: [Upload multiple images]
```

## Adding Services

1. Go to **Content Manager** → **Service**
2. Click **"+ Create new entry"**
3. Fill in:
   - **Title**: e.g., "Web Development"
   - **Slug**: Auto-generated (e.g., "web-development")
   - **Description**: Service description
   - **Icon**: Choose from: "web", "mobile", "code", "database", "performance", "security"
4. Click **"Save"** then **"Publish"**

## Adding Blog Posts

1. Go to **Content Manager** → **Blog Post**
2. Click **"+ Create new entry"**
3. Fill in:
   - **Title**: Blog post title
   - **Slug**: Auto-generated
   - **Excerpt**: Short summary (120-160 characters)
   - **Content**: Full article (use rich text editor)
   - **Published At**: Set publication date
   - **Category**: e.g., "Development", "Design", "Business"
   - **Tags**: Add tags as JSON array: `["Next.js", "React", "Tutorial"]`
   - **Featured Image**: Upload image
   - **Author**: Link to a Team Member (optional)
4. Click **"Save"** then **"Publish"**

## Adding Testimonials

1. Go to **Content Manager** → **Testimonial**
2. Click **"+ Create new entry"**
3. Fill in:
   - **Name**: Client name
   - **Role**: e.g., "CEO", "CTO"
   - **Company**: Company name
   - **Content**: Testimonial text
   - **Rating**: 1-5 stars
   - **Avatar**: Upload client photo (optional)
4. Click **"Save"** then **"Publish"**

## Adding Team Members

1. Go to **Content Manager** → **Team Member**
2. Click **"+ Create new entry"**
3. Fill in:
   - **Name**: Team member name
   - **Role**: Job title
   - **Bio**: Short biography
   - **Avatar**: Upload photo
   - **Social Links** (Component):
     - LinkedIn URL (optional)
     - Twitter URL (optional)
     - GitHub URL (optional)
4. Click **"Save"** then **"Publish"**

## Adding Home Page Content

1. Go to **Content Manager** → **Home Page** (Single Type)
2. Click **"Edit"** (only one entry exists)
3. Fill in:

   **Hero Section:**
   - Title: Main headline
   - Subtitle: Supporting text
   - CTA Text: Button text (e.g., "Get Started")
   - CTA Link: Button link (e.g., "/contact")
   - Background Image: Optional hero image

   **CTA Section:**
   - Title: CTA headline
   - Description: CTA description
   - CTA Text: Button text
   - CTA Link: Button link

4. Click **"Save"** then **"Publish"**

## Tips for Adding Content

### Images
- **Thumbnails**: Use 1200x630px for best results
- **Project Images**: Use high-quality images (at least 1920px width)
- **File Formats**: JPG, PNG, WebP supported
- **File Size**: Optimize images before uploading (keep under 2MB)

### Tech Stack (JSON Format)
When adding tech stack, add each technology as a separate entry:
```
Tech Stack:
  Entry 1: "Next.js"
  Entry 2: "React"
  Entry 3: "TypeScript"
  Entry 4: "PostgreSQL"
```

### Slugs
- Auto-generated from title
- Use lowercase, hyphenated format
- Example: "Web Development" → "web-development"
- Can be edited manually if needed

### Publishing
- **Draft**: Content saved but not visible on website
- **Published**: Content visible on website
- Always click **"Publish"** after creating content!

## Bulk Adding Content

### Option 1: Manual Entry
- Create entries one by one through the admin panel
- Best for small amounts of content

### Option 2: Import/Export Plugin
1. Install Strapi Import/Export plugin
2. Export existing content
3. Edit JSON file
4. Import back

### Option 3: API Script
Create a script to add content via Strapi API (advanced)

## Verifying Content

After adding content:

1. **Check Strapi API**:
   - Visit: http://localhost:1337/api/projects
   - Should see your projects in JSON format

2. **Check Website**:
   - Visit: http://localhost:3000/portfolio
   - Your projects should appear

3. **If content doesn't show**:
   - ✅ Ensure content is **Published** (not just saved)
   - ✅ Check API token in `.env.local`
   - ✅ Verify `NEXT_PUBLIC_STRAPI_URL` is correct
   - ✅ Clear Next.js cache: `rm -rf .next`
   - ✅ Restart dev server: `npm run dev`

## Quick Reference: Field Types

- **Text**: Short text input
- **Rich Text**: Full text editor with formatting
- **Media**: Image/file upload
- **Boolean**: Toggle switch (ON/OFF)
- **JSON**: Array of values (for tech stack, tags)
- **Date**: Date picker
- **Relation**: Link to another content type
- **Component**: Group of related fields

## Common Issues

**"Content not showing on website"**
- Make sure it's published, not just saved
- Check browser console for API errors
- Verify Strapi is running

**"Images not loading"**
- Check image URLs in Strapi API response
- Verify Next.js image domain config
- Ensure images are properly uploaded

**"Tech stack not displaying"**
- Make sure it's saved as JSON array format
- Check field name matches exactly

---

**Need sample data?** See `strapi/SAMPLE_DATA.md` for ready-to-use content examples!

