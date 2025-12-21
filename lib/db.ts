/**
 * Database Layer
 * Uses Supabase (primary), Vercel KV (fallback), or file system (local dev)
 * 
 * NOTE: This file is server-only and uses Node.js modules
 * It should only be imported dynamically in server contexts
 */

import fs from 'fs';
import path from 'path';

// Lazy load Supabase DB
let supabaseDb: any = null;
let supabaseDbInitialized = false;

async function getSupabaseDb() {
  if (supabaseDbInitialized) return supabaseDb;
  if (typeof window !== 'undefined') {
    supabaseDbInitialized = true;
    return null;
  }
  try {
    const { isSupabaseConfigured } = await import('./supabase');
    if (isSupabaseConfigured) {
      const dbModule = await import('./supabase-db');
      supabaseDb = dbModule.supabaseDb;
    }
    supabaseDbInitialized = true;
    return supabaseDb;
  } catch (e) {
    console.warn('Supabase DB not available, using file system');
    supabaseDbInitialized = true;
    return null;
  }
}

// Check if we're on Vercel and have KV configured (legacy support)
const isVercel = process.env.VERCEL === '1';
const hasKV = !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;

// Lazy load KV (will be initialized on first use)
let kv: any = null;
let kvInitialized = false;

async function getKV() {
  if (kvInitialized) return kv;
  if (!hasKV || typeof window !== 'undefined') {
    kvInitialized = true;
    return null;
  }
  try {
    const kvModule = await import('@vercel/kv');
    kv = kvModule.kv;
    kvInitialized = true;
    return kv;
  } catch (e) {
    console.warn('Vercel KV not available, using file system');
    kvInitialized = true;
    return null;
  }
}

const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists (for local development)
if (!isVercel && !fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Data file paths (for file system fallback)
const DATA_FILES = {
  homePage: path.join(DATA_DIR, 'home-page.json'),
  aboutPage: path.join(DATA_DIR, 'about-page.json'),
  projects: path.join(DATA_DIR, 'projects.json'),
  services: path.join(DATA_DIR, 'services.json'),
  testimonials: path.join(DATA_DIR, 'testimonials.json'),
  teamMembers: path.join(DATA_DIR, 'team-members.json'),
  blogPosts: path.join(DATA_DIR, 'blog-posts.json'),
  globalSettings: path.join(DATA_DIR, 'global-settings.json'),
};

// KV keys
const KV_KEYS = {
  homePage: 'home-page',
  aboutPage: 'about-page',
  projects: 'projects',
  services: 'services',
  testimonials: 'testimonials',
  teamMembers: 'team-members',
  blogPosts: 'blog-posts',
  globalSettings: 'global-settings',
};

// Helper functions for file system
function readFile<T>(filePath: string, defaultValue: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
  }
  return defaultValue;
}

function writeFile<T>(filePath: string, data: T): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
    throw error;
  }
}

// Helper functions for KV
async function readKV<T>(key: string, defaultValue: T): Promise<T> {
  const kvInstance = await getKV();
  if (!kvInstance) return defaultValue;
  try {
    const data = await kvInstance.get(key);
    return data || defaultValue;
  } catch (error) {
    console.error(`Error reading KV ${key}:`, error);
    return defaultValue;
  }
}

async function writeKV<T>(key: string, data: T): Promise<void> {
  const kvInstance = await getKV();
  if (!kvInstance) throw new Error('KV not available');
  try {
    await kvInstance.set(key, data);
  } catch (error) {
    console.error(`Error writing KV ${key}:`, error);
    throw error;
  }
}

// Database operations
export const db = {
  // Home Page (Single)
  async getHomePage() {
    const defaultValue = {
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
    };
    
    const supabase = await getSupabaseDb();
    if (supabase) {
      return await supabase.getHomePage();
    }
    if (kv) {
      return await readKV(KV_KEYS.homePage, defaultValue);
    }
    return readFile(DATA_FILES.homePage, defaultValue);
  },

  async updateHomePage(data: any) {
    const supabase = await getSupabaseDb();
    if (supabase) {
      return await supabase.updateHomePage(data);
    }
    if (kv) {
      await writeKV(KV_KEYS.homePage, data);
    } else {
      writeFile(DATA_FILES.homePage, data);
    }
    return data;
  },

  // About Page (Single)
  async getAboutPage() {
    const defaultValue = {
      hero: {
        title: 'About ATECH',
        subtitle: 'We are a team of passionate developers, designers, and innovators dedicated to crafting exceptional digital experiences that transform businesses and delight users.',
      },
      mission: {
        title: 'Our Mission',
        description: 'To empower businesses with cutting-edge technology solutions that drive growth and innovation.',
      },
      vision: {
        title: 'Our Vision',
        description: 'To be the leading software development agency recognized for excellence, innovation, and client success.',
      },
      values: [
        {
          title: 'Innovation',
          description: 'We stay ahead of the curve with the latest technologies and best practices.',
        },
        {
          title: 'Quality',
          description: 'We deliver exceptional work that exceeds expectations.',
        },
        {
          title: 'Integrity',
          description: 'We build trust through transparency and honest communication.',
        },
        {
          title: 'Collaboration',
          description: 'We work closely with our clients to achieve their goals.',
        },
      ],
      timeline: [
        {
          year: '2014',
          title: 'Company Founded',
          description: 'ATECH was established with a vision to transform businesses through innovative technology solutions.',
          location: 'San Francisco, CA',
          icon: 'rocket',
        },
        {
          year: '2016',
          title: 'First Major Client',
          description: 'Secured our first enterprise client and delivered a successful digital transformation project.',
          location: 'New York, NY',
          icon: 'award',
        },
        {
          year: '2018',
          title: 'Team Expansion',
          description: 'Grew from 5 to 25 team members, adding expertise in mobile development and cloud services.',
          location: 'Remote',
          icon: 'users',
        },
        {
          year: '2020',
          title: 'Global Recognition',
          description: 'Won Best Tech Agency award and reached 100+ successful projects milestone.',
          location: 'Global',
          icon: 'award',
        },
        {
          year: '2022',
          title: 'Innovation Lab Launch',
          description: 'Opened our innovation lab to research emerging technologies and develop cutting-edge solutions.',
          location: 'Austin, TX',
          icon: 'code',
        },
        {
          year: '2024',
          title: '500+ Projects Delivered',
          description: 'Reached a major milestone of 500+ successful projects, serving 200+ clients worldwide.',
          location: 'Worldwide',
          icon: 'rocket',
        },
      ],
    };
    
    const supabase = await getSupabaseDb();
    if (supabase) {
      return await supabase.getAboutPage();
    }
    if (kv) {
      return await readKV(KV_KEYS.aboutPage, defaultValue);
    }
    return readFile(DATA_FILES.aboutPage, defaultValue);
  },

  async updateAboutPage(data: any) {
    const supabase = await getSupabaseDb();
    if (supabase) {
      return await supabase.updateAboutPage(data);
    }
    if (kv) {
      await writeKV(KV_KEYS.aboutPage, data);
    } else {
      writeFile(DATA_FILES.aboutPage, data);
    }
    return data;
  },

  // Projects (Collection)
  async getProjects() {
    const supabase = await getSupabaseDb();
    if (supabase) {
      return await supabase.getProjects();
    }
    if (kv) {
      return await readKV<Array<any>>(KV_KEYS.projects, []);
    }
    return readFile<Array<any>>(DATA_FILES.projects, []);
  },

  async getProject(id: string | number) {
    const projects = await this.getProjects();
    return projects.find((p: any) => p.id === id || p.id === Number(id));
  },

  async getProjectBySlug(slug: string) {
    const projects = await this.getProjects();
    return projects.find((p: any) => p.slug === slug);
  },

  async createProject(data: any) {
    const supabase = await getSupabaseDb();
    if (supabase) {
      return await supabase.createProject(data);
    }
    
    // Check if we're on Vercel without Supabase
    if (process.env.VERCEL === '1') {
      throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY environment variables. See SUPABASE_SETUP.md for instructions.');
    }
    
    const projects = await this.getProjects();
    const newProject = {
      id: Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    projects.push(newProject);
    if (kv) {
      await writeKV(KV_KEYS.projects, projects);
    } else {
      writeFile(DATA_FILES.projects, projects);
    }
    return newProject;
  },

  async updateProject(id: string | number, data: any) {
    const supabase = await getSupabaseDb();
    if (supabase) {
      return await supabase.updateProject(id, data);
    }
    
    // Check if we're on Vercel without Supabase
    if (process.env.VERCEL === '1') {
      throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY environment variables. See SUPABASE_SETUP.md for instructions.');
    }
    
    const projects = await this.getProjects();
    const index = projects.findIndex((p: any) => p.id === id || p.id === Number(id));
    if (index === -1) throw new Error('Project not found');
    projects[index] = {
      ...projects[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    if (kv) {
      await writeKV(KV_KEYS.projects, projects);
    } else {
      writeFile(DATA_FILES.projects, projects);
    }
    return projects[index];
  },

  async deleteProject(id: string | number) {
    const supabase = await getSupabaseDb();
    if (supabase) {
      return await supabase.deleteProject(id);
    }
    
    // Check if we're on Vercel without Supabase
    if (process.env.VERCEL === '1') {
      throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY environment variables. See SUPABASE_SETUP.md for instructions.');
    }
    
    const projects = await this.getProjects();
    const filtered = projects.filter((p: any) => p.id !== id && p.id !== Number(id));
    if (kv) {
      await writeKV(KV_KEYS.projects, filtered);
    } else {
      writeFile(DATA_FILES.projects, filtered);
    }
    return true;
  },

  // Services (Collection)
  async getServices() {
    if (kv) {
      return await readKV<Array<any>>(KV_KEYS.services, []);
    }
    return readFile<Array<any>>(DATA_FILES.services, []);
  },

  async getService(id: string | number) {
    const services = await this.getServices();
    return services.find((s: any) => s.id === id || s.id === Number(id));
  },

  async getServiceBySlug(slug: string) {
    const services = await this.getServices();
    return services.find((s: any) => s.slug === slug);
  },

  async createService(data: any) {
    const services = await this.getServices();
    const newService = {
      id: Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    services.push(newService);
    if (kv) {
      await writeKV(KV_KEYS.services, services);
    } else {
      writeFile(DATA_FILES.services, services);
    }
    return newService;
  },

  async updateService(id: string | number, data: any) {
    const services = await this.getServices();
    const index = services.findIndex((s: any) => s.id === id || s.id === Number(id));
    if (index === -1) throw new Error('Service not found');
    services[index] = {
      ...services[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    if (kv) {
      await writeKV(KV_KEYS.services, services);
    } else {
      writeFile(DATA_FILES.services, services);
    }
    return services[index];
  },

  async deleteService(id: string | number) {
    const services = await this.getServices();
    const filtered = services.filter((s: any) => s.id !== id && s.id !== Number(id));
    if (kv) {
      await writeKV(KV_KEYS.services, filtered);
    } else {
      writeFile(DATA_FILES.services, filtered);
    }
    return true;
  },

  // Testimonials (Collection)
  async getTestimonials() {
    if (kv) {
      return await readKV<Array<any>>(KV_KEYS.testimonials, []);
    }
    return readFile<Array<any>>(DATA_FILES.testimonials, []);
  },

  async createTestimonial(data: any) {
    const testimonials = await this.getTestimonials();
    const newTestimonial = {
      id: Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    testimonials.push(newTestimonial);
    if (kv) {
      await writeKV(KV_KEYS.testimonials, testimonials);
    } else {
      writeFile(DATA_FILES.testimonials, testimonials);
    }
    return newTestimonial;
  },

  async updateTestimonial(id: string | number, data: any) {
    const testimonials = await this.getTestimonials();
    const index = testimonials.findIndex((t: any) => t.id === id || t.id === Number(id));
    if (index === -1) throw new Error('Testimonial not found');
    testimonials[index] = { ...testimonials[index], ...data };
    if (kv) {
      await writeKV(KV_KEYS.testimonials, testimonials);
    } else {
      writeFile(DATA_FILES.testimonials, testimonials);
    }
    return testimonials[index];
  },

  async deleteTestimonial(id: string | number) {
    const testimonials = await this.getTestimonials();
    const filtered = testimonials.filter((t: any) => t.id !== id && t.id !== Number(id));
    if (kv) {
      await writeKV(KV_KEYS.testimonials, filtered);
    } else {
      writeFile(DATA_FILES.testimonials, filtered);
    }
    return true;
  },

  // Team Members (Collection)
  async getTeamMembers() {
    if (kv) {
      return await readKV<Array<any>>(KV_KEYS.teamMembers, []);
    }
    return readFile<Array<any>>(DATA_FILES.teamMembers, []);
  },

  async createTeamMember(data: any) {
    const members = await this.getTeamMembers();
    const newMember = {
      id: Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    members.push(newMember);
    if (kv) {
      await writeKV(KV_KEYS.teamMembers, members);
    } else {
      writeFile(DATA_FILES.teamMembers, members);
    }
    return newMember;
  },

  async updateTeamMember(id: string | number, data: any) {
    const members = await this.getTeamMembers();
    const index = members.findIndex((m: any) => m.id === id || m.id === Number(id));
    if (index === -1) throw new Error('Team member not found');
    members[index] = { ...members[index], ...data };
    if (kv) {
      await writeKV(KV_KEYS.teamMembers, members);
    } else {
      writeFile(DATA_FILES.teamMembers, members);
    }
    return members[index];
  },

  async deleteTeamMember(id: string | number) {
    const members = await this.getTeamMembers();
    const filtered = members.filter((m: any) => m.id !== id && m.id !== Number(id));
    if (kv) {
      await writeKV(KV_KEYS.teamMembers, filtered);
    } else {
      writeFile(DATA_FILES.teamMembers, filtered);
    }
    return true;
  },

  // Blog Posts (Collection)
  async getBlogPosts() {
    if (kv) {
      return await readKV<Array<any>>(KV_KEYS.blogPosts, []);
    }
    return readFile<Array<any>>(DATA_FILES.blogPosts, []);
  },

  async getBlogPost(id: string | number) {
    const posts = await this.getBlogPosts();
    return posts.find((p: any) => p.id === id || p.id === Number(id));
  },

  async getBlogPostBySlug(slug: string) {
    const posts = await this.getBlogPosts();
    return posts.find((p: any) => p.slug === slug);
  },

  async createBlogPost(data: any) {
    const posts = await this.getBlogPosts();
    const newPost = {
      id: Date.now(),
      ...data,
      publishedAt: data.publishedAt || new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    posts.push(newPost);
    if (kv) {
      await writeKV(KV_KEYS.blogPosts, posts);
    } else {
      writeFile(DATA_FILES.blogPosts, posts);
    }
    return newPost;
  },

  async updateBlogPost(id: string | number, data: any) {
    const posts = await this.getBlogPosts();
    const index = posts.findIndex((p: any) => p.id === id || p.id === Number(id));
    if (index === -1) throw new Error('Blog post not found');
    posts[index] = { ...posts[index], ...data };
    if (kv) {
      await writeKV(KV_KEYS.blogPosts, posts);
    } else {
      writeFile(DATA_FILES.blogPosts, posts);
    }
    return posts[index];
  },

  async deleteBlogPost(id: string | number) {
    const posts = await this.getBlogPosts();
    const filtered = posts.filter((p: any) => p.id !== id && p.id !== Number(id));
    if (kv) {
      await writeKV(KV_KEYS.blogPosts, filtered);
    } else {
      writeFile(DATA_FILES.blogPosts, filtered);
    }
    return true;
  },

  // Global Settings (Single)
  async getGlobalSettings() {
    const defaultValue = {
      siteName: 'ATECH',
      socialLinks: {},
      seoDefaults: {},
    };
    if (kv) {
      return await readKV(KV_KEYS.globalSettings, defaultValue);
    }
    return readFile(DATA_FILES.globalSettings, defaultValue);
  },

  async updateGlobalSettings(data: any) {
    if (kv) {
      await writeKV(KV_KEYS.globalSettings, data);
    } else {
      writeFile(DATA_FILES.globalSettings, data);
    }
    return data;
  },
};
