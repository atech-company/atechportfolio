# ATECH Portfolio Website

A premium, ultra-fast, high-performance agency portfolio website built with Next.js 14, featuring a custom admin dashboard, modern design, and full SEO optimization.

## 🚀 Features

- **Ultra-fast Performance**: Optimized for speed with image optimization, caching, and code splitting
- **Modern Design**: Dark theme with neon accents, glassmorphism effects, and smooth animations
- **Custom Admin Dashboard**: Full CMS functionality without external dependencies
- **Splash Screen**: Beautiful animated welcome screen with typing effect
- **Full SEO**: Meta tags, OpenGraph, structured data (JSON-LD), sitemap, robots.txt
- **Responsive**: Mobile, tablet, and desktop optimized
- **Animations**: Framer Motion animations throughout
- **Type-safe**: Full TypeScript support

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: JSON file-based (no external database needed)
- **Language**: TypeScript
- **Deployment**: Ready for VPS (Hostinger, etc.)

## 📋 Prerequisites

- Node.js 18+ and npm/yarn

## ⚡ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/atechportfolio.git
   cd atechportfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your site URL
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Access the site**
   - Frontend: http://localhost:3000
   - Admin Dashboard: http://localhost:3000/admin
   - Default credentials: Check `.env.local` file

## 📁 Project Structure

```
atechportfolio/
├── app/                    # Next.js App Router pages
│   ├── about/             # About Us page
│   ├── admin/             # Admin dashboard
│   ├── blog/              # Blog pages
│   ├── contact/            # Contact page
│   ├── portfolio/         # Portfolio pages
│   ├── services/           # Services pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── layout/            # Header, Footer
│   ├── sections/          # Page sections
│   ├── ui/                # Reusable UI components
│   └── SplashScreen.tsx   # Welcome splash screen
├── data/                  # JSON database (admin data)
│   ├── projects.json
│   ├── services.json
│   └── about-page.json
├── lib/
│   ├── api.ts             # API integration
│   ├── db.ts              # Database functions
│   └── utils.ts           # Utility functions
├── public/
│   └── uploads/           # User-uploaded images
└── package.json
```

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#0ea5e9 to #0284c7)
- **Neon Accents**: 
  - Blue: #00f0ff
  - Green: #00ff88
- **Dark Theme**: #0d1117 to #212529

### Features
- Glassmorphism cards
- Smooth hover effects
- Subtle animations
- Responsive grid layouts
- Animated background patterns

## 📝 Content Management

All content is managed through the custom admin dashboard at `/admin`.

### Content Types
1. **Projects** - Portfolio projects with images
2. **Services** - Service offerings
3. **Blog Posts** - Blog articles
4. **About Page** - Company information, mission, vision, values, timeline

### Admin Features
- Create, edit, delete projects
- Upload and manage images
- Edit services
- Manage blog posts
- Edit About Us page content
- Timeline/journey management

## 🚀 Deployment

### Deploy to Hostinger VPS
See `DEPLOYMENT_HOSTINGER.md` for detailed instructions.

### Deploy to Vercel
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

## 🔒 Security

- Admin routes protected
- Environment variables for sensitive data
- Input validation
- Secure file uploads

## 📊 Performance

- **Lighthouse Score**: 90+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s

## 🎯 SEO Features

- Meta tags and Open Graph
- Structured data (JSON-LD)
- Sitemap generation
- Robots.txt
- Canonical URLs
- Optimized images

## 📄 License

This project is private and proprietary.

## 👨‍💻 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
```

## 🤝 Contributing

This is a private project. For issues or questions, please contact the maintainer.

## 📞 Support

For support, email contact@atech.com or create an issue in the repository.

---

Built with ❤️ by ATECH
