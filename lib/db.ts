/**
 * Simple Database Layer
 * Uses JSON files for data storage
 * Can be easily switched to SQLite or PostgreSQL later
 */

import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Data file paths
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

// Helper functions
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

// Database operations
export const db = {
  // Home Page (Single)
  getHomePage() {
    return readFile(DATA_FILES.homePage, {
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
  },

  updateHomePage(data: any) {
    writeFile(DATA_FILES.homePage, data);
    return data;
  },

  // About Page (Single)
  getAboutPage() {
    return readFile(DATA_FILES.aboutPage, {
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
    });
  },

  updateAboutPage(data: any) {
    writeFile(DATA_FILES.aboutPage, data);
    return data;
  },

  // Projects (Collection)
  getProjects() {
    return readFile<Array<any>>(DATA_FILES.projects, []);
  },

  getProject(id: string | number) {
    const projects = this.getProjects();
    return projects.find((p: any) => p.id === id || p.id === Number(id));
  },

  getProjectBySlug(slug: string) {
    const projects = this.getProjects();
    return projects.find((p: any) => p.slug === slug);
  },

  createProject(data: any) {
    const projects = this.getProjects();
    const newProject = {
      id: Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    projects.push(newProject);
    writeFile(DATA_FILES.projects, projects);
    return newProject;
  },

  updateProject(id: string | number, data: any) {
    const projects = this.getProjects();
    const index = projects.findIndex((p: any) => p.id === id || p.id === Number(id));
    if (index === -1) throw new Error('Project not found');
    projects[index] = {
      ...projects[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    writeFile(DATA_FILES.projects, projects);
    return projects[index];
  },

  deleteProject(id: string | number) {
    const projects = this.getProjects();
    const filtered = projects.filter((p: any) => p.id !== id && p.id !== Number(id));
    writeFile(DATA_FILES.projects, filtered);
    return true;
  },

  // Services (Collection)
  getServices() {
    return readFile<Array<any>>(DATA_FILES.services, []);
  },

  getService(id: string | number) {
    const services = this.getServices();
    return services.find((s: any) => s.id === id || s.id === Number(id));
  },

  getServiceBySlug(slug: string) {
    const services = this.getServices();
    return services.find((s: any) => s.slug === slug);
  },

  createService(data: any) {
    const services = this.getServices();
    const newService = {
      id: Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    services.push(newService);
    writeFile(DATA_FILES.services, services);
    return newService;
  },

  updateService(id: string | number, data: any) {
    const services = this.getServices();
    const index = services.findIndex((s: any) => s.id === id || s.id === Number(id));
    if (index === -1) throw new Error('Service not found');
    services[index] = {
      ...services[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    writeFile(DATA_FILES.services, services);
    return services[index];
  },

  deleteService(id: string | number) {
    const services = this.getServices();
    const filtered = services.filter((s: any) => s.id !== id && s.id !== Number(id));
    writeFile(DATA_FILES.services, filtered);
    return true;
  },

  // Testimonials (Collection)
  getTestimonials() {
    return readFile<Array<any>>(DATA_FILES.testimonials, []);
  },

  createTestimonial(data: any) {
    const testimonials = this.getTestimonials();
    const newTestimonial = {
      id: Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    testimonials.push(newTestimonial);
    writeFile(DATA_FILES.testimonials, testimonials);
    return newTestimonial;
  },

  updateTestimonial(id: string | number, data: any) {
    const testimonials = this.getTestimonials();
    const index = testimonials.findIndex((t: any) => t.id === id || t.id === Number(id));
    if (index === -1) throw new Error('Testimonial not found');
    testimonials[index] = { ...testimonials[index], ...data };
    writeFile(DATA_FILES.testimonials, testimonials);
    return testimonials[index];
  },

  deleteTestimonial(id: string | number) {
    const testimonials = this.getTestimonials();
    const filtered = testimonials.filter((t: any) => t.id !== id && t.id !== Number(id));
    writeFile(DATA_FILES.testimonials, filtered);
    return true;
  },

  // Team Members (Collection)
  getTeamMembers() {
    return readFile<Array<any>>(DATA_FILES.teamMembers, []);
  },

  createTeamMember(data: any) {
    const members = this.getTeamMembers();
    const newMember = {
      id: Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    members.push(newMember);
    writeFile(DATA_FILES.teamMembers, members);
    return newMember;
  },

  updateTeamMember(id: string | number, data: any) {
    const members = this.getTeamMembers();
    const index = members.findIndex((m: any) => m.id === id || m.id === Number(id));
    if (index === -1) throw new Error('Team member not found');
    members[index] = { ...members[index], ...data };
    writeFile(DATA_FILES.teamMembers, members);
    return members[index];
  },

  deleteTeamMember(id: string | number) {
    const members = this.getTeamMembers();
    const filtered = members.filter((m: any) => m.id !== id && m.id !== Number(id));
    writeFile(DATA_FILES.teamMembers, filtered);
    return true;
  },

  // Blog Posts (Collection)
  getBlogPosts() {
    return readFile<Array<any>>(DATA_FILES.blogPosts, []);
  },

  getBlogPost(id: string | number) {
    const posts = this.getBlogPosts();
    return posts.find((p: any) => p.id === id || p.id === Number(id));
  },

  getBlogPostBySlug(slug: string) {
    const posts = this.getBlogPosts();
    return posts.find((p: any) => p.slug === slug);
  },

  createBlogPost(data: any) {
    const posts = this.getBlogPosts();
    const newPost = {
      id: Date.now(),
      ...data,
      publishedAt: data.publishedAt || new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    posts.push(newPost);
    writeFile(DATA_FILES.blogPosts, posts);
    return newPost;
  },

  updateBlogPost(id: string | number, data: any) {
    const posts = this.getBlogPosts();
    const index = posts.findIndex((p: any) => p.id === id || p.id === Number(id));
    if (index === -1) throw new Error('Blog post not found');
    posts[index] = { ...posts[index], ...data };
    writeFile(DATA_FILES.blogPosts, posts);
    return posts[index];
  },

  deleteBlogPost(id: string | number) {
    const posts = this.getBlogPosts();
    const filtered = posts.filter((p: any) => p.id !== id && p.id !== Number(id));
    writeFile(DATA_FILES.blogPosts, filtered);
    return true;
  },

  // Global Settings (Single)
  getGlobalSettings() {
    return readFile(DATA_FILES.globalSettings, {
      siteName: 'ATECH',
      socialLinks: {},
      seoDefaults: {},
    });
  },

  updateGlobalSettings(data: any) {
    writeFile(DATA_FILES.globalSettings, data);
    return data;
  },
};

