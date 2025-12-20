# Fix: Images Not Showing for Projects

## ✅ Fixed!

I've updated the image handling to properly extract and display images from projects.

### What I Fixed:

1. **Updated `lib/api.ts`** - Enhanced image extraction logic to handle all formats:
   - String URLs (direct)
   - Strapi format (nested objects)
   - Arrays of images

2. **Updated Components** - Improved image detection in:
   - `FeaturedProjects.tsx`
   - `ProjectsGrid.tsx`

3. **Better Fallback** - If thumbnail doesn't exist, uses first image from images array

### How It Works Now:

1. **Check thumbnail** - First tries to use `project.thumbnail`
2. **Check images array** - If no thumbnail, uses first image from `project.images`
3. **Handle formats** - Works with both string URLs and Strapi format objects

### Test It:

1. **Refresh your browser** - Clear cache if needed (Ctrl+Shift+R)
2. **Check console** - If images still don't show, check browser console for debug logs
3. **Verify image paths** - Make sure images exist in `/public/uploads/` folder

### Image Path Format:

Images should be stored as:
- **Thumbnail**: `/uploads/filename.jpg` (string)
- **Images**: `["/uploads/image1.jpg", "/uploads/image2.jpg"]` (array of strings)

### If Images Still Don't Show:

1. **Check image files exist**:
   - Go to: `public/uploads/` folder
   - Verify files are there

2. **Check image URLs in data**:
   - Open: `data/projects.json`
   - Verify `thumbnail` and `images` fields have correct paths

3. **Check Next.js Image config**:
   - Local images should work automatically
   - If using external URLs, add to `next.config.js`

---

**Images should now display correctly!** 🎉

