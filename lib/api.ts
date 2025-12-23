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
      fullResponse: JSON.stringify(jsonData).substring(0, 500), // First 500 chars for debugging
    });
    
    // Handle case where response might not have 'data' wrapper
    if (!jsonData.data && Array.isArray(jsonData)) {
      console.log('[fetchAPI] Response is direct array, not wrapped in data');
      return jsonData as T;
    }
    
    const data: StrapiResponse<T> = jsonData;
    const extracted = data.data as T;
    
    console.log('[fetchAPI] Extracted data:', {
      type: typeof extracted,
      isArray: Array.isArray(extracted),
      length: Array.isArray(extracted) ? extracted.length : 'not array',
    });
    
    return extracted;
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
    firstItem: Array.isArray(data) && data.length > 0 ? JSON.stringify(data[0]).substring(0, 200) : null,
    dataType: typeof data,
    fullData: JSON.stringify(data).substring(0, 1000), // First 1000 chars
  });
  
  if (!data) {
    console.warn('[fetchProjects] No data returned from API');
    return [];
  }
  
  // Ensure data is an array
  if (!Array.isArray(data)) {
    console.error('[fetchProjects] Data is not an array:', {
      type: typeof data,
      value: JSON.stringify(data).substring(0, 500),
    });
    // Try to extract array from object
    if (data && typeof data === 'object' && data !== null && 'data' in data) {
      const dataObj = data as any;
      if (Array.isArray(dataObj.data)) {
        console.log('[fetchProjects] Found data.data array, using that');
        return dataObj.data;
      }
    }
    return [];
  }
  
  if (data.length === 0) {
    console.warn('[fetchProjects] Empty array returned from API');
    return [];
  }
  
  // Transform from API response - extract attributes if present
  const transformed = data.map((item: any, index: number) => {
    try {
      console.log(`[fetchProjects] Transforming item ${index}:`, {
        hasAttributes: !!item.attributes,
        hasId: !!item.id,
        itemKeys: Object.keys(item),
      });
      
      let project: any;
      
      if (item.attributes) {
        // Strapi format: { id, attributes: {...} }
        project = { id: item.id, ...item.attributes };
        console.log(`[fetchProjects] Item ${index} - Extracted from attributes:`, {
          id: project.id,
          title: project.title,
          slug: project.slug,
        });
      } else {
        // Direct format: already flattened
        project = item;
        console.log(`[fetchProjects] Item ${index} - Using direct format:`, {
          id: project.id,
          title: project.title,
          slug: project.slug,
        });
      }
      
      // Ensure we have required fields
      if (!project.id || !project.title) {
        console.warn(`[fetchProjects] Item ${index} missing required fields:`, project);
        return null;
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
      
      console.log(`[fetchProjects] Item ${index} transformed successfully:`, {
        id: project.id,
        title: project.title,
        slug: project.slug,
        hasThumbnail: !!project.thumbnail,
        hasImages: !!project.images,
      });
      
      return project;
    } catch (error: any) {
      console.error(`[fetchProjects] Error transforming item ${index}:`, error);
      console.error(`[fetchProjects] Item data:`, JSON.stringify(item, null, 2));
      return null;
    }
  }).filter((p: any) => p !== null && p !== undefined); // Filter out any null/undefined projects
  
  console.log('[fetchProjects] Transformed projects:', {
    count: transformed.length,
    projects: transformed.map((p: any) => ({
      id: p?.id,
      title: p?.title,
      slug: p?.slug,
    })),
  });
  
  if (transformed.length === 0 && data.length > 0) {
    console.error('[fetchProjects] WARNING: Transformation resulted in empty array but input had data!');
    console.error('[fetchProjects] Original data sample:', JSON.stringify(data[0], null, 2));
    // Fallback: return data as-is if transformation failed
    return data.filter((item: any) => item && (item.id || item.attributes?.id));
  }
  
  return transformed;
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

