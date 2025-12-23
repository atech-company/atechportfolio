/**
 * API Integration Layer for Custom Admin Dashboard
 * Handles all API calls to local Next.js API routes
 * During build time, reads directly from files to avoid HTTP requests
 * 
 * NOTE: This file should only be imported in Server Components
 * For types, import from @/lib/types instead
 */

// Import types for use in this file
import type {
  Hero,
  Service,
  Project,
  Testimonial,
  TeamMember,
  BlogPost,
  HomePage,
  GlobalSettings,
  Image,
} from './types';

// Re-export types for convenience (but prefer importing from types.ts)
export type {
  Hero,
  Service,
  Project,
  Testimonial,
  TeamMember,
  BlogPost,
  HomePage,
  GlobalSettings,
  Image,
} from './types';

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
      // Force fresh data - no caching
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(`[fetchAPI] API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const jsonData: any = await response.json();
    console.log('[fetchAPI] Raw response:', {
      endpoint,
      hasData: !!jsonData.data,
      dataType: Array.isArray(jsonData.data) ? 'array' : typeof jsonData.data,
      dataLength: Array.isArray(jsonData.data) ? jsonData.data.length : 'not array',
    });
    
    const data: StrapiResponse<T> = jsonData;
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
    return database ? await database.getHomePage() : null;
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
    return database ? await database.getAboutPage() : null;
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
    return database ? await database.getServices() : [];
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
    return database ? (await database.getServiceBySlug(slug) || null) : null;
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
    
    let projects = await database.getProjects();
    
    // Apply filters
    if (options?.slug) {
      const project = projects.find((p: any) => p.slug === options.slug);
      return project ? [project] : [];
    }
    
    if (options?.featured) {
      projects = projects.filter((p: any) => {
        // Handle boolean, string, and number values
        return p.featured === true || p.featured === 'true' || p.featured === 1 || p.featured === '1';
      });
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
  console.log('[fetchProjects] API response:', {
    hasData: !!data,
    isArray: Array.isArray(data),
    length: Array.isArray(data) ? data.length : 'not array',
    firstItem: Array.isArray(data) && data.length > 0 ? data[0] : null,
  });
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
    return database ? (await database.getProjectBySlug(slug) || null) : null;
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
    
    let testimonials = await database.getTestimonials();
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
    return database ? await database.getTeamMembers() : [];
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
    
    let posts = await database.getBlogPosts();
    
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
    return database ? await database.getGlobalSettings() : null;
  }
  
  const data = await fetchAPI<GlobalSettings>("/api/content/global-settings");
  return data || null;
}

// Re-export getStrapiImageUrl for convenience (but prefer importing from image-utils.ts)
export { getStrapiImageUrl } from './image-utils';

