# Quick Start Guide - ATECH Portfolio

Get your ATECH portfolio website up and running in minutes!

## Step 1: Install Dependencies (2 min)

```bash
npm install
```

## Step 2: Configure Environment (1 min)

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_token_here
```

## Step 3: Start Development Server (30 sec)

```bash
npm run dev
```

Visit: http://localhost:3000

## Step 4: Set Up Strapi (10-15 min)

### Install Strapi
```bash
npx create-strapi-app@latest strapi --quickstart
cd strapi
```

### Create Content Types
1. Go to http://localhost:1337/admin
2. Create admin account
3. Follow `strapi/config/content-types.md` to create:
   - Home Page (Single Type)
   - Service (Collection Type)
   - Project (Collection Type)
   - Testimonial (Collection Type)
   - Team Member (Collection Type)
   - Blog Post (Collection Type)
   - Global Setting (Single Type)

### Configure Permissions
1. Settings → Users & Permissions → Roles → Public
2. Enable "find" and "findOne" for all content types
3. Save

### Create API Token
1. Settings → API Tokens
2. Create new token (Read-only)
3. Copy token to `.env.local`

### Add Sample Data
1. Use `strapi/SAMPLE_DATA.md` as reference
2. Add content through Strapi Admin Panel
3. Publish all content

## Step 5: Test Everything

- ✅ Home page loads
- ✅ Services page shows services
- ✅ Portfolio shows projects
- ✅ Blog shows posts
- ✅ Contact form works
- ✅ Images load correctly

## Troubleshooting

**No content showing?**
- Check Strapi is running
- Verify API token in `.env.local`
- Ensure content is published in Strapi
- Check browser console for errors

**API errors?**
- Verify `NEXT_PUBLIC_STRAPI_URL` is correct
- Check CORS settings in Strapi
- Ensure API token has correct permissions

**Build errors?**
```bash
rm -rf .next node_modules
npm install
npm run dev
```

## Next Steps

- Customize design in `tailwind.config.ts`
- Add your own content in Strapi
- Deploy to production (see `DEPLOYMENT.md`)

---

**Need help?** Check the main `README.md` for detailed documentation.

