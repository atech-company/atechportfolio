# Step-by-Step: Create All Content Types in Strapi

Follow these exact steps to create all content types. This will take about 15-20 minutes.

## Prerequisites
- Strapi is running at http://localhost:1337/admin
- You're logged into Strapi Admin

---

## 1. Home Page (Single Type)

### Create the Type
1. Click **Content-Type Builder** (left sidebar)
2. Click **"+ Create new single type"**
3. Display name: `Home Page`
4. API ID (singular): `home-page`
5. Click **Continue**

### Add Hero Component
1. Click **"+ Add another field"**
2. Select **Component**
3. Name: `hero`
4. Type: **Single component**
5. Click **Continue**
6. Click **"+ Add another field"** and add:
   - **title** → Text → Short text → Required ✅
   - **subtitle** → Text → Long text → Required ✅
   - **ctaText** → Text → Short text → Required ✅
   - **ctaLink** → Text → Short text → Required ✅
   - **backgroundImage** → Media → Single media
7. Click **Finish**

### Add CTA Component
1. Click **"+ Add another field"**
2. Select **Component**
3. Name: `cta`
4. Type: **Single component**
5. Click **Continue**
6. Add fields:
   - **title** → Text → Short text → Required ✅
   - **description** → Text → Long text → Required ✅
   - **ctaText** → Text → Short text → Required ✅
   - **ctaLink** → Text → Short text → Required ✅
7. Click **Finish**

### Save
Click **Save** (top right)

---

## 2. Project (Collection Type)

### Create the Type
1. **Content-Type Builder** → **"+ Create new collection type"**
2. Display name: `Project`
3. API ID (singular): `project`
4. Click **Continue**

### Add Fields
Click **"+ Add another field"** for each:

1. **title** → Text → Short text → Required ✅
2. **slug** → Text → UID → Based on: `title` → Required ✅
3. **description** → Text → Long text → Required ✅
4. **featured** → Boolean → Default: `false`
5. **techStack** → JSON
6. **projectUrl** → Text → Short text
7. **githubUrl** → Text → Short text
8. **images** → Media → Multiple media
9. **thumbnail** → Media → Single media

### Save
Click **Save**

---

## 3. Service (Collection Type)

### Create the Type
1. **Content-Type Builder** → **"+ Create new collection type"**
2. Display name: `Service`
3. API ID (singular): `service`
4. Click **Continue**

### Add Fields
1. **title** → Text → Short text → Required ✅
2. **slug** → Text → UID → Based on: `title` → Required ✅
3. **description** → Text → Long text → Required ✅
4. **icon** → Text → Short text

### Save
Click **Save**

---

## 4. Testimonial (Collection Type)

### Create the Type
1. **Content-Type Builder** → **"+ Create new collection type"**
2. Display name: `Testimonial`
3. API ID (singular): `testimonial`
4. Click **Continue**

### Add Fields
1. **name** → Text → Short text → Required ✅
2. **role** → Text → Short text → Required ✅
3. **company** → Text → Short text → Required ✅
4. **content** → Text → Long text → Required ✅
5. **rating** → Number → Integer → Min: `1`, Max: `5` → Required ✅
6. **avatar** → Media → Single media

### Save
Click **Save**

---

## 5. Team Member (Collection Type)

### Create the Type
1. **Content-Type Builder** → **"+ Create new collection type"**
2. Display name: `Team Member`
3. API ID (singular): `team-member`
4. Click **Continue**

### Add Basic Fields
1. **name** → Text → Short text → Required ✅
2. **role** → Text → Short text → Required ✅
3. **bio** → Text → Long text → Required ✅
4. **avatar** → Media → Single media

### Add Social Links Component
1. Click **"+ Add another field"**
2. Select **Component**
3. Name: `socialLinks`
4. Type: **Single component**
5. Click **Continue**
6. Add fields:
   - **linkedin** → Text → Short text
   - **twitter** → Text → Short text
   - **github** → Text → Short text
7. Click **Finish**

### Save
Click **Save**

---

## 6. Blog Post (Collection Type)

### Create the Type
1. **Content-Type Builder** → **"+ Create new collection type"**
2. Display name: `Blog Post`
3. API ID (singular): `blog-post`
4. Click **Continue**

### Add Fields
1. **title** → Text → Short text → Required ✅
2. **slug** → Text → UID → Based on: `title` → Required ✅
3. **excerpt** → Text → Long text → Required ✅
4. **content** → Rich text → Required ✅
5. **publishedAt** → Date → Date → Required ✅
6. **category** → Text → Short text
7. **tags** → JSON
8. **featuredImage** → Media → Single media
9. **author** → Relation → Many-to-One → Related to: **Team Member**

### Save
Click **Save**

---

## 7. Global Setting (Single Type)

### Create the Type
1. **Content-Type Builder** → **"+ Create new single type"**
2. Display name: `Global Setting`
3. API ID (singular): `global-setting`
4. Click **Continue**

### Add Basic Fields
1. **siteName** → Text → Short text → Required ✅ → Default: `ATECH`

### Add Social Links Component
1. Click **"+ Add another field"**
2. Select **Component**
3. Name: `socialLinks`
4. Type: **Single component**
5. Add fields:
   - **facebook** → Text → Short text
   - **twitter** → Text → Short text
   - **linkedin** → Text → Short text
   - **github** → Text → Short text
   - **instagram** → Text → Short text
6. Click **Finish**

### Add SEO Defaults Component
1. Click **"+ Add another field"**
2. Select **Component**
3. Name: `seoDefaults`
4. Type: **Single component**
5. Add fields:
   - **metaTitle** → Text → Short text
   - **metaDescription** → Text → Long text
   - **metaImage** → Media → Single media
6. Click **Finish**

### Save
Click **Save**

---

## 8. Set Permissions (CRITICAL!)

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles**
2. Click **Public** role
3. Scroll down to **Permissions**

### For Each Content Type, Enable:

#### Single Types (Home Page, Global Setting):
- ☑ **find**
- ☑ **findOne**
- ☑ **create**
- ☑ **update**

#### Collection Types (Project, Service, Testimonial, Team Member, Blog Post):
- ☑ **find**
- ☑ **findOne**
- ☑ **create**

4. Click **Save** (top right)

---

## 9. Create API Token

1. **Settings** → **API Tokens**
2. Click **"+ Create new API Token"**
3. Fill in:
   - **Name**: `Seeder Token`
   - **Token type**: **Full access**
   - **Duration**: Unlimited
4. Click **Save**
5. **COPY THE TOKEN** (you'll only see it once!)
6. Update `seed-strapi.js` line 15 with the new token

---

## 10. Test Everything

Run the diagnostic:
```bash
node test-strapi-api.js
```

You should see:
- ✅ All content types exist
- ✅ API token is valid
- ✅ Create permission works

---

## 11. Run Seeder

```bash
node seed-strapi.js
```

---

## Troubleshooting

**"Content type already exists"**
- That's OK! Skip that one and continue.

**"Can't find Component option"**
- Make sure you're adding a field first, then selecting Component.

**"Permission denied"**
- Make sure you enabled **create** permission for all content types.

**"API token invalid"**
- Create a new Full access token and update the script.

---

**After completing all steps, your seeder script will work!** 🎉

