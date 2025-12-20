# Strapi Sample Data Seeder

This script automatically populates your Strapi CMS with sample data for all content types.

## 🚀 Quick Start

### Step 1: Get Your API Token

1. Open Strapi Admin: http://localhost:1337/admin
2. Go to **Settings** → **API Tokens**
3. Create a new token:
   - Name: "Seeder Token"
   - Type: **Read-only** (or Full access for seeding)
   - Duration: Unlimited
4. **Copy the token**

### Step 2: Update the Script

Open `seed-strapi.js` and replace `YOUR_API_TOKEN`:

```javascript
const API_TOKEN = 'your_actual_token_here';
```

### Step 3: Run the Script

Make sure:
- ✅ Strapi is running (`npm run develop` in strapi folder)
- ✅ All content types are created
- ✅ Permissions are set (Public → find & findOne)

Then run:

```bash
node seed-strapi.js
```

## 📊 What Gets Created

The script creates:

- **Home Page**: Hero and CTA sections
- **Projects**: 3 sample projects (E-Commerce, SaaS Dashboard, Mobile Banking)
- **Services**: 6 services (Web Dev, Mobile Apps, API, Cloud, Performance, Security)
- **Testimonials**: 4 client testimonials
- **Team Members**: 3 team members
- **Blog Posts**: 3 blog posts
- **Global Settings**: Site name and social links

## ⚠️ Important Notes

1. **Publishing**: The script creates entries but doesn't publish them. You need to:
   - Go to Strapi Admin → Content Manager
   - Open each entry
   - Click **"Publish"** (not just Save)

2. **Permissions**: Make sure Public role has `find` and `findOne` permissions for all content types.

3. **Content Types**: All 7 content types must exist before running the script.

4. **Images**: The script doesn't upload images. You'll need to add images manually in Strapi Admin.

## 🔧 Troubleshooting

### "Request failed: 401 Unauthorized"
- ✅ Check your API token is correct
- ✅ Verify token hasn't expired
- ✅ Make sure token has proper permissions

### "Request failed: 404 Not Found"
- ✅ Verify content type API IDs match exactly:
  - `home-page` (not `homepage`)
  - `projects` (not `project`)
  - `services` (not `service`)
  - etc.

### "Request failed: 403 Forbidden"
- ✅ Check Public role permissions
- ✅ Enable `find` and `findOne` for all content types

### "Cannot find module 'fetch'"
- ✅ Use Node.js 18+ (has native fetch)
- ✅ Or install: `npm install node-fetch` and update the script

## 📝 Customizing the Data

Edit `seed-strapi.js` to customize:
- Number of entries
- Content of entries
- Field values
- Dates and timestamps

## 🎯 Next Steps

After running the script:

1. **Publish entries** in Strapi Admin
2. **Add images** to projects, team members, etc.
3. **Customize content** as needed
4. **Test your website** at http://localhost:3000

---

**Need help?** Check the main `STRAPI_COMPLETE_SETUP.md` guide.

