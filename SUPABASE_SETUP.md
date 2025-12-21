# Supabase Setup Guide

This guide will help you set up Supabase for your ATECH portfolio website.

## Prerequisites

1. A Supabase account (free at [supabase.com](https://supabase.com))
2. A Supabase project created

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: `atech-portfolio` (or your preferred name)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose the closest region to your users
5. Click "Create new project"
6. Wait for the project to be created (takes 1-2 minutes)

## Step 2: Get API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")
   - **service_role** key (under "Project API keys") - **Keep this secret!**

## Step 3: Create Database Tables

1. In your Supabase project, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
4. Click "Run" (or press Ctrl+Enter)
5. Verify tables were created by going to **Table Editor**

You should see these tables:
- `projects`
- `services`
- `blog_posts`
- `testimonials`
- `team_members`
- `home_page`
- `about_page`
- `global_settings`

## Step 4: Create Storage Bucket

1. Go to **Storage** in your Supabase dashboard
2. Click "Create a new bucket"
3. Name: `uploads`
4. **Public bucket**: ✅ Enable (uncheck "Private")
5. Click "Create bucket"

### Set Up Storage Policies (Optional but Recommended)

1. Click on the `uploads` bucket
2. Go to **Policies** tab
3. Click "New policy"
4. Select "For full customization"
5. Policy name: `Public uploads`
6. Allowed operation: `INSERT`, `SELECT`, `UPDATE`, `DELETE`
7. Policy definition:
   ```sql
   true
   ```
8. Click "Review" then "Save policy"

Alternatively, you can use the SQL Editor to create the policy:

```sql
-- Allow public read access
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'uploads');

-- Allow authenticated insert (you'll need to set up auth for this)
-- For now, use service role key for uploads (already configured)
```

## Step 5: Set Environment Variables

### Local Development

Create/update `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### Vercel Deployment

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables:

   - **Key**: `NEXT_PUBLIC_SUPABASE_URL`
     **Value**: `https://your-project.supabase.co`
     **Environment**: Production, Preview, Development

   - **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     **Value**: `your-anon-key-here`
     **Environment**: Production, Preview, Development

   - **Key**: `SUPABASE_SERVICE_ROLE_KEY`
     **Value**: `your-service-role-key-here`
     **Environment**: Production, Preview, Development
     ⚠️ **Important**: Keep this key secret! Never commit it to Git.

4. Click "Save"

## Step 6: Deploy

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Add Supabase integration"
   git push
   ```

2. Vercel will automatically redeploy with the new environment variables

## Step 7: Verify Setup

1. Deploy to Vercel (or run locally with `npm run dev`)
2. Go to your admin panel: `/admin`
3. Try creating a new project
4. Upload an image - it should save to Supabase Storage
5. Check your Supabase dashboard:
   - **Table Editor** → `projects` - should see your new project
   - **Storage** → `uploads` - should see your uploaded images

## Migration from JSON Files (Optional)

If you have existing data in JSON files, you can migrate it:

1. Export your JSON files from `/data` folder
2. Use the Supabase dashboard **Table Editor** to manually add records
3. Or create a migration script (see below)

### Quick Migration Script Example

Create `scripts/migrate-to-supabase.js`:

```javascript
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  // Read projects from JSON
  const projectsPath = path.join(process.cwd(), 'data', 'projects.json');
  const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

  // Insert into Supabase
  for (const project of projects) {
    const { error } = await supabase.from('projects').insert({
      title: project.title,
      slug: project.slug,
      description: project.description,
      featured: project.featured,
      tech_stack: project.techStack || [],
      project_url: project.projectUrl,
      github_url: project.githubUrl,
      thumbnail: project.thumbnail,
      images: Array.isArray(project.images) ? project.images : [],
    });

    if (error) {
      console.error(`Error migrating project ${project.title}:`, error);
    } else {
      console.log(`✅ Migrated: ${project.title}`);
    }
  }
}

migrate();
```

Run it:
```bash
node scripts/migrate-to-supabase.js
```

## Troubleshooting

### "Supabase is not configured" warning

- Check that environment variables are set correctly
- Verify `.env.local` exists and has the correct values
- Restart your dev server after adding environment variables

### Upload fails

- Check that the `uploads` bucket exists and is public
- Verify storage policies allow inserts
- Check browser console and server logs for detailed errors

### Database connection errors

- Verify your Supabase URL is correct
- Check that your API keys are valid
- Ensure your Supabase project is active (not paused)

### Tables don't exist

- Run the migration SQL again
- Check the SQL Editor for any errors
- Verify you're connected to the correct database

## Next Steps

- Set up Row Level Security (RLS) policies for better security
- Configure backups in Supabase dashboard
- Set up database indexes for better performance
- Consider using Supabase Auth for admin authentication

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Storage Guide](https://supabase.com/docs/guides/storage)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

