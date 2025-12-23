# Vercel Deployment Fix

## Problem
Vercel's filesystem is read-only, so file uploads and JSON file writes fail with:
- `EROFS: read-only file system`
- `500 Internal Server Error` on `/api/admin/upload`

## Solution
The codebase has been updated to use:
1. **Vercel Blob Storage** for file uploads (when `BLOB_READ_WRITE_TOKEN` is set)
2. **Vercel KV** for data storage (when `KV_REST_API_URL` and `KV_REST_API_TOKEN` are set)
3. **File system fallback** for local development

## Setup Instructions

### 1. Install Vercel Blob and KV (Already Done)
```bash
npm install @vercel/blob @vercel/kv
```

### 2. Create Vercel Blob Store
1. Go to your Vercel project dashboard
2. Navigate to **Storage** → **Create Database**
3. Select **Blob** (or **KV** for data storage)
4. Create the store
5. Copy the `BLOB_READ_WRITE_TOKEN` (or `KV_REST_API_URL` and `KV_REST_API_TOKEN`)

### 3. Add Environment Variables in Vercel
Go to your Vercel project → **Settings** → **Environment Variables** and add:

#### For File Uploads (Blob Storage):
```
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxx
```

#### For Data Storage (KV - Optional but Recommended):
```
KV_REST_API_URL=https://your-kv-store.vercel-storage.com
KV_REST_API_TOKEN=your-kv-token
```

### 4. Deploy
After adding environment variables, redeploy your project:
```bash
git add .
git commit -m "Add Vercel Blob and KV support"
git push
```

Vercel will automatically redeploy with the new environment variables.

## How It Works

### File Uploads
- **On Vercel**: Uses Vercel Blob Storage (if `BLOB_READ_WRITE_TOKEN` is set)
- **Local Development**: Uses local file system (`/public/uploads/`)

### Data Storage
- **On Vercel with KV**: Uses Vercel KV (if `KV_REST_API_URL` and `KV_REST_API_TOKEN` are set)
- **Local Development**: Uses JSON files in `/data/` folder

## Migration from File System to KV

If you have existing data in JSON files and want to migrate to KV:

1. **Option 1: Manual Migration**
   - Export your JSON files
   - Use Vercel KV dashboard or API to import data

2. **Option 2: Keep Using File System**
   - Don't set KV environment variables
   - The app will use file system (but this won't work on Vercel for writes)
   - Consider using a different hosting provider (like Hostinger VPS) if you prefer file system

## Alternative: Use Hostinger VPS

If you prefer file system storage, consider deploying to Hostinger VPS instead:
- See `DEPLOYMENT_HOSTINGER.md` for instructions
- File system writes work on VPS hosting

## Troubleshooting

### Upload Still Fails
1. Check that `BLOB_READ_WRITE_TOKEN` is set in Vercel environment variables
2. Verify the token is correct
3. Check Vercel logs for detailed error messages

### Data Not Saving
1. If using KV, check that `KV_REST_API_URL` and `KV_REST_API_TOKEN` are set
2. Verify KV store is created and accessible
3. Check Vercel logs for errors

### Local Development
- File uploads will work locally (uses file system)
- Data storage will work locally (uses JSON files)
- No environment variables needed for local development

## Notes

- **Blob Storage**: Free tier includes 1 GB storage
- **KV Storage**: Free tier includes 256 MB storage
- Both services scale automatically with your Vercel plan


