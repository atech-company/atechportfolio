# Strapi Beginner's Guide - Complete Tutorial

Don't worry! This guide will walk you through everything step by step.

---

## Part 1: Starting Strapi

### Step 1: Open PowerShell
1. Press `Windows Key + X`
2. Click **"Windows PowerShell"** or **"Terminal"**

### Step 2: Go to Your Project
Type these commands one by one (press Enter after each):

```powershell
cd Desktop
cd atechportfolio
cd strapi
cd strapi
```

### Step 3: Start Strapi
Type:
```powershell
npm run develop
```

### Step 4: Wait
You'll see a lot of text scrolling. Wait until you see:
```
Server started on port 1337
```

**Don't close this window!** Keep it open.

### Step 5: Open Strapi in Browser
1. Open your web browser (Chrome, Edge, Firefox)
2. Go to: **http://localhost:1337/admin**
3. You should see the Strapi login page

---

## Part 2: Logging Into Strapi

### If You Already Have an Account:
1. Enter your email and password
2. Click **"Sign in"**

### If You Don't Have an Account:
1. Click **"Create your account"** or **"Register"**
2. Fill in:
   - First Name: Your name
   - Last Name: Your last name
   - Email: Your email
   - Password: Create a password (remember it!)
3. Click **"Let's start"**

You're now in Strapi Admin! 🎉

---

## Part 3: Understanding Strapi Interface

### Left Sidebar (Main Menu):
- **Content-Type Builder** - Create content types (like forms)
- **Content Manager** - Add and edit content
- **Media Library** - Upload images/files
- **Settings** - Configure Strapi

### Top Bar:
- **Search** - Search for content
- **Your Profile** - Click to see your account

---

## Part 4: Creating Content Types (The Structure)

Think of content types as "forms" or "templates" for your content.

### Example: Creating "Project" Content Type

1. **Click "Content-Type Builder"** (left sidebar)

2. **Click "+ Create new collection type"**
   - Collection type = You can add many items (like many projects)
   - Single type = Only one item (like one homepage)

3. **Fill in:**
   - Display name: `Project`
   - API ID (singular): `project` (auto-filled, lowercase)
   - Click **Continue**

4. **Add Fields** (like form fields):
   
   Click **"+ Add another field"** for each field:
   
   - **title** → Click **Text** → **Short text** → Check **Required** → Click **Finish**
   - **slug** → Click **Text** → **UID** → Based on: `title` → Check **Required** → Click **Finish**
   - **description** → Click **Text** → **Long text** → Check **Required** → Click **Finish**
   - **featured** → Click **Boolean** → Click **Finish**
   - **techStack** → Click **JSON** → Click **Finish**
   - **projectUrl** → Click **Text** → **Short text** → Click **Finish**
   - **githubUrl** → Click **Text** → **Short text** → Click **Finish**
   - **images** → Click **Media** → **Multiple media** → Click **Finish**
   - **thumbnail** → Click **Media** → **Single media** → Click **Finish**

5. **Click "Save"** (top right)

6. **Wait** - Strapi will restart automatically

Done! You created a "Project" content type.

---

## Part 5: Adding Content (Filling the Forms)

Now that you have a content type, you can add actual content!

### Example: Adding a Project

1. **Click "Content Manager"** (left sidebar)

2. **Click "Project"** (you'll see it in the list)

3. **Click "+ Create new entry"** (top right)

4. **Fill in the form:**
   - **Title**: "My First Project"
   - **Slug**: Auto-filled (or type: "my-first-project")
   - **Description**: "This is my awesome project..."
   - **Featured**: Toggle ON (if you want it featured)
   - **Tech Stack**: Click "Add an entry", type "Next.js", click "Add an entry" again, type "React", etc.
   - **Project URL**: "https://example.com"
   - **GitHub URL**: "https://github.com/user/repo"
   - **Thumbnail**: Click to upload an image
   - **Images**: Click to upload multiple images

5. **Click "Save"** (top right)

6. **Click "Publish"** (top right) ⚠️ **IMPORTANT!**
   - "Save" = Draft (not visible on website)
   - "Publish" = Live (visible on website)

Done! You added a project! 🎉

---

## Part 6: Setting Permissions (Making Content Visible)

By default, your content is private. You need to make it public:

1. **Click "Settings"** (bottom left, gear icon)

2. **Click "Users & Permissions Plugin"**

3. **Click "Roles"**

4. **Click "Public"** (the role name)

5. **Scroll down** to find your content types

6. **For each content type** (Project, Service, etc.):
   - Check ☑ **find**
   - Check ☑ **findOne**
   - Check ☑ **create** (if you want to add via API)
   - Check ☑ **update** (for single types)

7. **Click "Save"** (top right)

8. **Restart Strapi** (see Part 7)

---

## Part 7: Restarting Strapi

After changing permissions or content types, restart Strapi:

1. **Go to the PowerShell window** where Strapi is running

2. **Press `Ctrl+C`** (this stops Strapi)

3. **Type:**
   ```powershell
   npm run develop
   ```

4. **Wait** for "Server started on port 1337"

Strapi is restarted!

---

## Part 8: Creating API Token (For Seeder Script)

To use the seeder script, you need an API token:

1. **Click "Settings"** → **"API Tokens"**

2. **Click "+ Create new API Token"**

3. **Fill in:**
   - **Name**: "Seeder Token"
   - **Token type**: **Full access** (NOT Read-only!)
   - **Duration**: Unlimited

4. **Click "Save"**

5. **COPY THE TOKEN** (you'll only see it once!)

6. **Open `seed-strapi.js`** in your code editor

7. **Find line 15** that says:
   ```javascript
   const API_TOKEN = 'YOUR_TOKEN_HERE';
   ```

8. **Replace `YOUR_TOKEN_HERE`** with your copied token

9. **Save the file**

---

## Part 9: Using the Seeder Script

Once everything is set up:

1. **Make sure Strapi is running** (see Part 1)

2. **Open PowerShell** in your project folder (`atechportfolio`)

3. **Run:**
   ```powershell
   node seed-strapi.js
   ```

4. **Wait** - It will add all sample data automatically!

---

## Common Tasks

### Upload an Image:
1. **Content Manager** → Click your content type → Click an entry
2. Click the image field
3. Click **"Upload"** or **"Select an asset"**
4. Choose your image

### Edit Content:
1. **Content Manager** → Click content type → Click the entry
2. Make changes
3. Click **"Save"** then **"Publish"**

### Delete Content:
1. **Content Manager** → Click content type → Click the entry
2. Click **"Delete"** (bottom)
3. Confirm

---

## Quick Reference

| Task | Where to Go |
|------|-------------|
| Create content type | Content-Type Builder |
| Add content | Content Manager |
| Upload images | Media Library |
| Set permissions | Settings → Users & Permissions → Roles → Public |
| Create API token | Settings → API Tokens |
| View content | Content Manager → Click content type |

---

## Need Help?

- **Strapi won't start?** → Check `HOW_TO_RUN_STRAPI.md`
- **Can't add content?** → Check permissions (Part 6)
- **Seeder script fails?** → Check `FINAL_FIX_PERMISSIONS.md`
- **Don't see content on website?** → Make sure you clicked **"Publish"**!

---

## Summary: What You Learned

1. ✅ How to start Strapi
2. ✅ How to log in
3. ✅ How to create content types (forms)
4. ✅ How to add content (fill forms)
5. ✅ How to set permissions
6. ✅ How to create API tokens
7. ✅ How to use the seeder script

**You're now ready to use Strapi!** 🎉

Start with Part 1 and work through each part. Take your time!

