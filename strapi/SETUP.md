# Strapi Setup Guide for ATECH Portfolio

This guide will help you set up Strapi CMS for the ATECH portfolio website.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or remote)
- Basic knowledge of Strapi

## Step 1: Install Strapi

### Option A: New Strapi Installation

```bash
npx create-strapi-app@latest strapi --quickstart
cd strapi
```

### Option B: Use Existing Strapi

If you already have Strapi installed, skip to Step 2.

## Step 2: Configure Database

### PostgreSQL Configuration

1. Create a PostgreSQL database
2. Update `config/database.js`:

```javascript
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'atech_strapi'),
      user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', 'password'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
```

3. Create `.env` file in Strapi root:

```env
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=atech_strapi
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
DATABASE_SSL=false
```

## Step 3: Create Content Types

Follow the detailed instructions in `strapi/config/content-types.md` to create all content types.

### Quick Reference:

1. **Home Page** (Single Type)
   - API ID: `home-page`
   - Fields: hero (component), cta (component)

2. **Service** (Collection Type)
   - API ID: `service`
   - Fields: title, slug, description, icon

3. **Project** (Collection Type)
   - API ID: `project`
   - Fields: title, slug, description, featured, techStack, projectUrl, githubUrl, images, thumbnail

4. **Testimonial** (Collection Type)
   - API ID: `testimonial`
   - Fields: name, role, company, content, rating, avatar

5. **Team Member** (Collection Type)
   - API ID: `team-member`
   - Fields: name, role, bio, avatar, socialLinks (component)

6. **Blog Post** (Collection Type)
   - API ID: `blog-post`
   - Fields: title, slug, excerpt, content, publishedAt, author, featuredImage, category, tags

7. **Global Setting** (Single Type)
   - API ID: `global-setting`
   - Fields: siteName, logo, favicon, socialLinks (component), seoDefaults (component)

## Step 4: Configure Permissions

1. Go to Settings → Users & Permissions Plugin → Roles → Public
2. Enable "find" and "findOne" for all content types
3. Save

## Step 5: Create API Token

1. Go to Settings → API Tokens
2. Click "Create new API Token"
3. Name: "Frontend Token"
4. Token type: "Read-only"
5. Token duration: "Unlimited" (or set expiration)
6. Click "Save"
7. Copy the token and add to Next.js `.env.local`:

```env
STRAPI_API_TOKEN=your_token_here
```

## Step 6: Configure CORS

Update `config/middlewares.js`:

```javascript
module.exports = [
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
      origin: ['http://localhost:3000', 'https://yourdomain.com'],
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

## Step 7: Add Sample Data

1. Create sample content through Strapi Admin Panel
2. Test API endpoints:
   - `http://localhost:1337/api/home-page`
   - `http://localhost:1337/api/services`
   - `http://localhost:1337/api/projects`

## Step 8: Production Setup

### Environment Variables

```env
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
APP_KEYS=your_app_keys
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
TRANSFER_TOKEN_SALT=your_transfer_token_salt
JWT_SECRET=your_jwt_secret
```

### Build Strapi

```bash
npm run build
npm start
```

### Use PM2 for Process Management

```bash
npm install -g pm2
pm2 start npm --name "strapi" -- start
pm2 save
pm2 startup
```

## Troubleshooting

### Database Connection Issues

- Verify PostgreSQL is running
- Check database credentials
- Ensure database exists

### CORS Errors

- Verify CORS configuration in `middlewares.js`
- Check Next.js environment variables
- Ensure Strapi URL is correct

### API Token Issues

- Verify token has correct permissions
- Check token hasn't expired
- Ensure token is in `.env.local`

## Next Steps

1. Add real content through Strapi Admin
2. Configure image upload settings
3. Set up email provider (if needed)
4. Configure backup strategy
5. Set up monitoring

---

For more information, visit [Strapi Documentation](https://docs.strapi.io)

