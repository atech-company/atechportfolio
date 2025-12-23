# ⚠️ Supabase Required for Vercel Deployment

## Problem

When deploying to Vercel, you're getting errors like:
- `EROFS: read-only file system, open '/var/task/data/projects.json'`
- Cannot save/delete projects
- File system operations fail

## Why This Happens

Vercel's filesystem is **read-only**. Your application is trying to write to JSON files in the `/data` folder, which is not allowed on Vercel.

## Solution: Set Up Supabase

You **must** configure Supabase for your Vercel deployment. The application will automatically use Supabase when configured.

### Quick Setup Steps

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Wait for it to initialize (1-2 minutes)

2. **Run Database Migration**
   - Go to Supabase Dashboard → SQL Editor
   - Copy contents of `supabase/migrations/001_initial_schema.sql`
   - Paste and run it

3. **Create Storage Bucket**
   - Go to Storage → Create bucket
   - Name: `uploads`
   - Make it **public**

4. **Get API Keys**
   - Go to Settings → API
   - Copy:
     - Project URL
     - `anon` public key
     - `service_role` key (keep secret!)

5. **Add to Vercel**
   - Go to your Vercel project → Settings → Environment Variables
   - Add these 3 variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
     ```
   - Select all environments (Production, Preview, Development)
   - Click Save

6. **Redeploy**
   - Vercel will automatically redeploy
   - Or trigger a new deployment manually

## Detailed Guide

See `SUPABASE_SETUP.md` for complete step-by-step instructions with screenshots and troubleshooting.

## Local Development

For local development, the application will work without Supabase (uses file system). But for Vercel deployment, Supabase is **required**.

## What Happens After Setup

Once Supabase is configured:
- ✅ Projects can be created, updated, and deleted
- ✅ Images upload to Supabase Storage
- ✅ All data stored in PostgreSQL database
- ✅ Works on Vercel without file system restrictions

## Need Help?

1. Check `SUPABASE_SETUP.md` for detailed instructions
2. Verify environment variables are set correctly in Vercel
3. Check Supabase dashboard to see if data is being created
4. Check Vercel logs for detailed error messages


