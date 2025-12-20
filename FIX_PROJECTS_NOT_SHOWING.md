# Fix: Projects Not Showing on Website

## Issue
Projects added in admin don't appear on the website.

## ✅ Fixed!

I've updated the API to properly handle the data format. The issue was in the data transformation.

### What I Fixed:

1. **Updated `lib/api.ts`** - Fixed `fetchProjects()` to properly transform data
2. **Updated API routes** - Ensured correct data format
3. **Added image support** - Projects can now have images!

### Test It:

1. **Restart your dev server**:
   ```bash
   npm run dev
   ```

2. **Check your project**:
   - Go to: http://localhost:3000
   - Your project should appear!

3. **If still not showing**:
   - Check browser console (F12) for errors
   - Verify project is marked as "Featured" if using featured filter
   - Check `/data/projects.json` file exists and has data

---

## 🖼️ Image Upload Added!

I've also added **image upload functionality**!

### How to Add Images:

1. Go to **Admin** → **Projects** → **Add New** (or Edit existing)
2. Scroll to **"Thumbnail Image"** section
3. Click **"Choose File"** and select an image
4. Image will upload automatically
5. You can also add multiple **"Project Images"**
6. Click **"Create Project"** or **"Save Changes"**

### Image Storage:

- Images are saved to `/public/uploads/` folder
- URLs are stored in your project data
- Images are accessible at `/uploads/filename.jpg`

---

## 🔍 Debugging

If projects still don't show:

1. **Check API response**:
   - Visit: http://localhost:3000/api/content/projects
   - Should see your projects in JSON

2. **Check featured filter**:
   - If homepage shows only featured projects, make sure your project has `featured: true`

3. **Clear Next.js cache**:
   ```bash
   rm -rf .next
   npm run dev
   ```

---

**Everything should work now!** 🎉

