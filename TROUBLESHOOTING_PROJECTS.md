# Troubleshooting: Projects Not Appearing

If projects you add in the admin are not appearing on the home page or portfolio page, follow these steps:

## Step 1: Check Debug Endpoint

After deploying, visit:
```
https://your-site.com/api/debug/projects
```

This will show:
- How many projects are in the database
- The raw project data
- Any errors that occurred

## Step 2: Check Server Logs

Look for these log messages in your deployment logs (Vercel/Hostinger):

### When Creating a Project:
- `[Admin Projects API] Creating project:`
- `[Admin Projects API] Project created successfully:`
- `[Admin Projects API] Total projects after creation:`

### When Viewing Pages:
- `[Projects API] Total projects fetched:`
- `[Supabase DB] Fetching projects from Supabase...`
- `[Supabase DB] Projects fetched:`
- `[Supabase DB] Transformed projects:`

## Step 3: Verify Supabase Configuration

Check that these environment variables are set:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Step 4: Check Supabase Dashboard

1. Go to your Supabase dashboard
2. Navigate to Table Editor → `projects` table
3. Verify that projects are actually saved there
4. Check the data structure matches:
   - `id` (number)
   - `title` (text)
   - `slug` (text)
   - `description` (text)
   - `featured` (boolean)
   - `tech_stack` (array/jsonb)
   - `project_url` (text, nullable)
   - `github_url` (text, nullable)
   - `thumbnail` (text, nullable)
   - `images` (array/jsonb, nullable)

## Step 5: Common Issues

### Issue: Projects saved but not appearing
**Solution:** 
- Check if `featured` is set to `true` for home page (home page only shows featured projects)
- Verify the project has a valid `slug`
- Check browser console for JavaScript errors

### Issue: "No projects found in database"
**Possible causes:**
- Supabase not configured correctly
- Service role key missing
- Database connection issue

### Issue: Projects appear in admin but not on pages
**Possible causes:**
- Caching issue (should be fixed with latest changes)
- Data transformation issue
- Component rendering issue

## Step 6: Test the API Directly

Test these endpoints directly:

1. **Admin API** (should show all projects):
   ```
   GET /api/admin/projects
   ```

2. **Public API** (should show all projects):
   ```
   GET /api/content/projects
   ```

3. **Featured Projects** (should show only featured):
   ```
   GET /api/content/projects?featured=true
   ```

4. **Debug Endpoint** (shows raw data):
   ```
   GET /api/debug/projects
   ```

## Step 7: Check Component Logs

If projects are returned by the API but not displayed:

1. Open browser console (F12)
2. Look for errors in the console
3. Check Network tab to see if API calls are successful
4. Verify the response contains project data

## Still Not Working?

If projects still don't appear after checking all above:

1. Share the output from `/api/debug/projects`
2. Share relevant server logs
3. Share browser console errors (if any)
4. Verify Supabase table structure matches the expected schema

