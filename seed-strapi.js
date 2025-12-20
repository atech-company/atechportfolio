/**
 * Strapi Auto Seeder
 * Handles single types (home-page, global-setting) and collection types
 * 
 * Usage: node seed-strapi.js
 */

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = '48c28c84ab257f369ed4a44bf7fc615fd5deeb0755246398b70333216f2f2ddca3b2a60d96ed89b476f9164bdbd3e69ff5d4e49d7b883a58886a3af468e47f8cdb267441e835650a2693469a1a893915d014dd81283eb493e6855ddb529226af5e092d1e7bb4fa8cc72a2f27e241f3a44b53ca96878fbbc8f054fc858088d9f6'; // Replace with your Full Access token

// Console colors
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

// Helper for Strapi requests
async function strapiRequest(endpoint, method = 'GET', data = null) {
  const url = `${STRAPI_URL}/api${endpoint}`;
  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };
  if (data) options.body = JSON.stringify({ data });
  const res = await fetch(url, options);
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.error?.message || res.statusText);
  return json;
}

// Handle single types
async function createOrUpdateSingleType(contentType, data) {
  let exists = false;
  try {
    const res = await strapiRequest(`/${contentType}`, 'GET');
    if (res.data) exists = true;
  } catch {}
  const method = exists ? 'PUT' : 'POST';
  await strapiRequest(`/${contentType}`, method, data);
  console.log(`${colors.green}✓${colors.reset} ${exists ? 'Updated' : 'Created'} ${contentType}`);
}

// Handle collection types
async function createCollectionEntry(contentType, data) {
  await strapiRequest(`/${contentType}`, 'POST', data);
  console.log(`${colors.green}✓${colors.reset} Created ${contentType}: ${data.title || data.name || data.siteName}`);
}

// Main seeding function
async function seed() {
  console.log(`${colors.blue}🚀 Starting Strapi seeding...${colors.reset}\n`);

  // --- SINGLE TYPES ---
  console.log(`${colors.yellow}⚡ Seeding Single Types...${colors.reset}`);
  await createOrUpdateSingleType('home-page', {
    hero: {
      title: 'Building Digital Excellence',
      subtitle: 'We craft premium software solutions that transform businesses and delight users.',
      ctaText: 'Start Your Project',
      ctaLink: '/contact',
    },
    cta: {
      title: 'Ready to Start Your Project?',
      description: "Let's work together to bring your vision to life.",
      ctaText: 'Get Started',
      ctaLink: '/contact',
    },
  });

  await createOrUpdateSingleType('global-setting', {
    siteName: 'ATECH',
    socialLinks: {
      facebook: 'https://facebook.com/atech',
      twitter: 'https://twitter.com/atech',
      linkedin: 'https://linkedin.com/company/atech',
      github: 'https://github.com/atech',
      instagram: 'https://instagram.com/atech',
    },
    seoDefaults: {
      metaTitle: 'ATECH - Premium Software Development Agency',
      metaDescription: 'ATECH is a premium software development agency specializing in modern web applications, mobile apps, and digital solutions.',
    },
  });

  // --- COLLECTION TYPES ---
  console.log(`\n${colors.yellow}⚡ Seeding Collection Types...${colors.reset}`);

  // Projects
  const projects = [
    {
      title: 'E-Commerce Platform',
      slug: 'ecommerce-platform',
      description: 'Modern e-commerce platform with Next.js & Strapi.',
      featured: true,
      techStack: ['Next.js', 'Strapi', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
      projectUrl: 'https://example.com',
      githubUrl: 'https://github.com/atech/ecommerce-platform',
    },
    {
      title: 'SaaS Dashboard',
      slug: 'saas-dashboard',
      description: 'Comprehensive SaaS dashboard with analytics.',
      featured: true,
      techStack: ['React', 'Node.js', 'MongoDB'],
      projectUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com/atech/saas-dashboard',
    },
  ];
  for (const p of projects) await createCollectionEntry('project', p);

  // Services
  const services = [
    { title: 'Web Development', slug: 'web-development', description: 'Responsive web applications.', icon: 'web' },
    { title: 'Mobile Apps', slug: 'mobile-apps', description: 'Cross-platform mobile apps.', icon: 'mobile' },
  ];
  for (const s of services) await createCollectionEntry('service', s);

  // Testimonials
  const testimonials = [
    { name: 'John Smith', role: 'CEO', company: 'TechCorp', content: 'Great work!', rating: 5 },
    { name: 'Sarah Johnson', role: 'CTO', company: 'StartupXYZ', content: 'Excellent team!', rating: 5 },
  ];
  for (const t of testimonials) await createCollectionEntry('testimonial', t);

  // Team Members
  const team = [
    { name: 'Alex Thompson', role: 'Lead Developer', bio: 'Full-stack dev.', socialLinks: { linkedin: 'https://linkedin.com/in/alexthompson' } },
    { name: 'Emily Rodriguez', role: 'UI/UX Designer', bio: 'Creative designer.', socialLinks: { linkedin: 'https://linkedin.com/in/emilyrodriguez' } },
  ];
  for (const m of team) await createCollectionEntry('team-member', m);

  // Blog Posts
  const now = new Date();
  const blogs = [
    {
      title: 'Getting Started with Next.js',
      slug: 'getting-started-with-nextjs',
      excerpt: 'Learn Next.js basics.',
      content: '<p>Next.js is awesome!</p>',
      publishedAt: now.toISOString(),
      category: 'Development',
      tags: ['Next.js', 'React'],
    },
  ];
  for (const b of blogs) await createCollectionEntry('blog-post', b);

  console.log(`\n${colors.green}✅ All sample data seeded successfully!${colors.reset}`);
}

// Run the seed
seed().catch(err => console.error(`${colors.red}❌ Seeding failed: ${err.message}${colors.reset}`));
