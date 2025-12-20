/**
 * API Integration Layer for Custom Admin Dashboard
 * Handles all API calls to local Next.js API routes
 * During build time, reads directly from files to avoid HTTP requests
 */

// Dynamic import for db to avoid bundling fs in client code
let db: any = null;

async function getDb() {
  if (!db && typeof window === 'undefined') {
    // Only import db on server-side
    const dbModule = await import('./db');
    db = dbModule.db;
  }
  return db;
}

/**
 * Check if we're in build time (no server running)
 */
function isBuildTime(): boolean {
  return process.env.NEXT_PHASE === 'phase-production-build' || 
         process.env.VERCEL === '1' && !process.env.VERCEL_URL;
}

/**
 * Get the base URL for API requests
 * Handles both server-side and client-side requests
 */
function getBaseUrl(): string {
  // During build time, return empty to use direct file access
  if (isBuildTime()) {
    return '';
  }
  
  // Server-side: use environment variable or construct from request
  if (typeof window === 'undefined') {
    // In production, use the full URL
    if (process.env.NEXT_PUBLIC_SITE_URL) {
      return process.env.NEXT_PUBLIC_SITE_URL;
    }
    // In development, use localhost
    return 'http://localhost:3000';
  }
  // Client-side: use relative URL
  return '';
}

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiEntity<T> {
  id: number;
  attributes: T;
}

interface Image {
  data: {
    id: number;
    attributes: {
      url: string;
      alternativeText?: string;
      width: number;
      height: number;
    };
  } | null;
}

// Types
export interface Hero {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: Image;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon?: string;
  slug: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  slug: string;
  featured: boolean;
  techStack: string[];
  projectUrl?: string;
  githubUrl?: string;
  images: Image | string[] | string;
  thumbnail?: Image | string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: Image;
  rating: number;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  avatar?: Image;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author?: TeamMember;
  featuredImage?: Image;
  category?: string;
  tags?: string[];
}

export interface HomePage {
  hero: Hero;
  cta: {
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
  };
}

export interface GlobalSettings {
  siteName: string;
  logo?: Image;
  favicon?: Image;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
  seoDefaults?: {
    metaTitle?: string;
    metaDescription?: string;
    metaImage?: Image;
  };
}

/**
 * Generic fetch function for local API
 */
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T | null> {
  try {
    const baseUrl = getBaseUrl();
    const url = baseUrl ? `${baseUrl}${endpoint}` : endpoint;
    
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
      // Use revalidate for better performance while keeping data fresh
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data: StrapiResponse<T> = await response.json();
    return data.data as T;
  } catch (error) {
    console.error("Error fetching from API:", error);
    return null;
  }
}

/**
 * Fetch home page data
 */
export async function fetchHomePage(): Promise<HomePage | null> {
  // During build time, read directly from files
  if (isBuildTime()) {
    const database = await getDb();
    return database ? database.getHomePage() : null;
  }
  const data = await fetchAPI<HomePage>("/api/content/home-page");
  return data;
}

/**
 * Fetch about page data
 */
export async function fetchAboutPage(): Promise<any | null> {
  // During build time, read directly from files
  if (isBuildTime()) {
    const database = await getDb();
    return database ? database.getAboutPage() : null;
  }
  const data = await fetchAPI<any>("/api/content/about-page");
  return data;
}

/**
 * Fetch all services
 */
export async function fetchServices(): Promise<Service[]> {
  // During build time, read directly from files
  if (isBuildTime()) {
    const database = await getDb();
    return database ? database.getServices() : [];
  }
  const data = await fetchAPI<Service[]>("/api/content/services");
  if (!data) return [];
  // Handle array of services
  return Array.isArray(data) ? data : [];
}

/**
 * Fetch a single service by slug
 */
export async function fetchService(slug: string): Promise<Service | null> {
  // During build time, read directly from files
  if (isBuildTime()) {
    const database = await getDb();
    return database ? (database.getServiceBySlug(slug) || null) : null;
  }
  const data = await fetchAPI<Service>(`/api/content/services?slug=${slug}`);
  return data || null;
}

/**
 * Fetch projects with optional filters
 */
export async function fetchProjects(options?: {
  featured?: boolean;
  limit?: number;
  slug?: string;
}): Promise<Project[]> {
  // During build time, read directly from files
  if (isBuildTime()) {
    const database = await getDb();
    if (!database) return [];
    
    let projects = database.getProjects();
    
    // Apply filters
    if (options?.slug) {
      const project = projects.find((p: any) => p.slug === options.slug);
      return project ? [project] : [];
    }
    
    if (options?.featured) {
      projects = projects.filter((p: any) => p.featured === true);
    }
    
    if (options?.limit) {
      projects = projects.slice(0, options.limit);
    }
    
    return projects;
  }
  
  let endpoint = "/api/content/projects";
  const params: string[] = [];

  if (options?.featured) {
    params.push("featured=true");
  }

  if (options?.slug) {
    params.push(`slug=${options.slug}`);
  }

  if (options?.limit) {
    params.push(`limit=${options.limit}`);
  }

  if (params.length > 0) {
    endpoint += `?${params.join("&")}`;
  }

  const data = await fetchAPI<any[]>(endpoint);
  if (!data) return [];
  
  // Transform from API response - extract attributes if present
  return data.map((item: any) => {
    let project: any;
    
    if (item.attributes) {
      project = { id: item.id, ...item.attributes };
    } else {
      project = item;
    }
    
    // Thumbnail should already be a string, but handle Strapi format just in case
    if (project.thumbnail && typeof project.thumbnail === 'object') {
      if (project.thumbnail.data) {
        if (project.thumbnail.data.attributes && project.thumbnail.data.attributes.url) {
          project.thumbnail = project.thumbnail.data.attributes.url;
        } else if (typeof project.thumbnail.data === 'string') {
          project.thumbnail = project.thumbnail.data;
        } else if (project.thumbnail.data && typeof project.thumbnail.data === 'object' && project.thumbnail.data.url) {
          project.thumbnail = project.thumbnail.data.url;
        }
      } else if (project.thumbnail.attributes && project.thumbnail.attributes.url) {
        project.thumbnail = project.thumbnail.attributes.url;
      } else if (project.thumbnail.url) {
        project.thumbnail = project.thumbnail.url;
      }
    }
    
    // Images should already be an array of strings, but handle Strapi format just in case
    if (project.images && typeof project.images === 'object' && !Array.isArray(project.images)) {
      if (project.images.data) {
        if (Array.isArray(project.images.data)) {
          project.images = project.images.data.map((img: any) => {
            if (typeof img === 'string') return img;
            if (img.attributes && img.attributes.url) return img.attributes.url;
            if (typeof img === 'object' && img.url) return img.url;
            return img;
          });
        } else if (project.images.data.attributes && project.images.data.attributes.url) {
          project.images = [project.images.data.attributes.url];
        } else if (typeof project.images.data === 'string') {
          project.images = [project.images.data];
        }
      }
    }
    
    return project;
  });
}

/**
 * Fetch a single project by slug
 */
export async function fetchProject(slug: string): Promise<Project | null> {
  // During build time, read directly from files
  if (isBuildTime()) {
    const database = await getDb();
    return database ? (database.getProjectBySlug(slug) || null) : null;
  }
  
  const data = await fetchAPI<any>(`/api/content/projects?slug=${slug}`);
  if (!data) return null;
  
  // Handle Strapi format transformation
  let project: any;
  if (data.attributes) {
    project = { id: data.id, ...data.attributes };
  } else {
    project = data;
  }
  
  // Extract thumbnail URL from Strapi format if needed
  if (project.thumbnail && typeof project.thumbnail === 'object' && project.thumbnail.data) {
    if (project.thumbnail.data.attributes && project.thumbnail.data.attributes.url) {
      project.thumbnail = project.thumbnail.data.attributes.url;
    } else if (typeof project.thumbnail.data === 'string') {
      project.thumbnail = project.thumbnail.data;
    }
  }
  
  // Extract images array from Strapi format if needed
  if (project.images && typeof project.images === 'object' && project.images.data) {
    if (Array.isArray(project.images.data)) {
      project.images = project.images.data.map((img: any) => {
        if (typeof img === 'string') return img;
        if (img.attributes && img.attributes.url) return img.attributes.url;
        if (typeof img === 'object' && img.url) return img.url;
        return img;
      });
    } else if (project.images.data.attributes && project.images.data.attributes.url) {
      project.images = [project.images.data.attributes.url];
    } else if (typeof project.images.data === 'string') {
      project.images = [project.images.data];
    }
  }
  
  return project;
}

/**
 * Fetch testimonials
 */
export async function fetchTestimonials(limit?: number): Promise<Testimonial[]> {
  // During build time, read directly from files
  if (isBuildTime()) {
    const database = await getDb();
    if (!database) return [];
    
    let testimonials = database.getTestimonials();
    if (limit) {
      testimonials = testimonials.slice(0, limit);
    }
    return testimonials;
  }
  
  let endpoint = "/api/content/testimonials";
  if (limit) {
    endpoint += `?limit=${limit}`;
  }
  const data = await fetchAPI<Testimonial[]>(endpoint);
  return data || [];
}

/**
 * Fetch team members
 */
export async function fetchTeamMembers(): Promise<TeamMember[]> {
  // During build time, read directly from files
  if (isBuildTime()) {
    const database = await getDb();
    return database ? database.getTeamMembers() : [];
  }
  
  const data = await fetchAPI<TeamMember[]>("/api/content/team-members");
  return data || [];
}

/**
 * Fetch blog posts
 */
export async function fetchBlogPosts(options?: {
  limit?: number;
  slug?: string;
  category?: string;
}): Promise<BlogPost[]> {
  // During build time, read directly from files
  if (isBuildTime()) {
    const database = await getDb();
    if (!database) return [];
    
    let posts = database.getBlogPosts();
    
    if (options?.slug) {
      const post = posts.find((p: any) => p.slug === options.slug);
      return post ? [post] : [];
    }
    
    if (options?.category) {
      posts = posts.filter((p: any) => p.category === options.category);
    }
    
    if (options?.limit) {
      posts = posts.slice(0, options.limit);
    }
    
    return posts;
  }
  
  // If slug is provided, fetch single post
  if (options?.slug) {
    const post = await fetchBlogPost(options.slug);
    return post ? [post] : [];
  }

  let endpoint = "/api/content/blog-posts";
  const params: string[] = [];

  if (options?.category) {
    params.push(`category=${options.category}`);
  }

  if (options?.limit) {
    params.push(`limit=${options.limit}`);
  }

  if (params.length > 0) {
    endpoint += `?${params.join("&")}`;
  }

  const data = await fetchAPI<BlogPost[]>(endpoint);
  return data || [];
}

/**
 * Fetch a single blog post by slug
 */
export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await fetchBlogPosts({ slug });
  return posts.length > 0 ? posts[0] : null;
}

/**
 * Fetch global settings
 */
export async function fetchGlobalSettings(): Promise<GlobalSettings | null> {
  // During build time, read directly from files
  if (isBuildTime()) {
    const database = await getDb();
    return database ? database.getGlobalSettings() : null;
  }
  
  const data = await fetchAPI<GlobalSettings>("/api/content/global-settings");
  return data || null;
}

/**
 * Get image URL from image object
 */
export function getStrapiImageUrl(image: Image | string | undefined | null): string | null {
  if (!image) return null;
  // If it's already a string URL, return it
  if (typeof image === 'string') return image;
  // If it's an object with data, extract URL
  if (image?.data) {
    const url = image.data.attributes?.url || image.data;
    return typeof url === 'string' ? url : null;
  }
  return null;
}

