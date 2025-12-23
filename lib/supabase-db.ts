/**
 * Supabase Database Layer
 * Provides database operations using Supabase
 */

import { supabaseAdmin, isSupabaseConfigured } from './supabase';

// Check if Supabase is configured
if (!isSupabaseConfigured) {
  console.warn('Supabase is not configured. Using fallback storage.');
}

// Database operations using Supabase
export const supabaseDb = {
  // Projects
  async getProjects() {
    if (!isSupabaseConfigured || !supabaseAdmin) {
      console.warn('[Supabase DB] Supabase not configured or admin client not available');
      return [];
    }
    
    console.log('[Supabase DB] Fetching projects from Supabase...');
    try {
      const { data, error } = await supabaseAdmin
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false, nullsFirst: false });
      
      if (error) {
        console.error('[Supabase DB] Error fetching projects:', error);
        console.error('[Supabase DB] Error details:', JSON.stringify(error, null, 2));
        return [];
      }
      
      console.log('[Supabase DB] Raw data from Supabase:', {
        count: data?.length || 0,
        data: data,
      });
      
      if (!data || data.length === 0) {
        console.warn('[Supabase DB] No projects found in Supabase');
        return [];
      }
      
      console.log('[Supabase DB] First project raw data:', JSON.stringify(data[0], null, 2));
      
    const transformed = data
      .map(transformProject)
      .filter((p: any) => p !== null); // Filter out any null transformations
      
    console.log('[Supabase DB] Transformed projects:', transformed.length);
    if (transformed.length > 0) {
      console.log('[Supabase DB] First transformed project:', JSON.stringify(transformed[0], null, 2));
    }
    
    return transformed;
    } catch (err: any) {
      console.error('[Supabase DB] Exception in getProjects:', err);
      console.error('[Supabase DB] Exception stack:', err.stack);
      return [];
    }
  },

  async getProject(id: string | number) {
    if (!isSupabaseConfigured || !supabaseAdmin) return null;
    const { data, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching project:', error);
      return null;
    }
    
    return data ? transformProject(data) : null;
  },

  async getProjectBySlug(slug: string) {
    if (!isSupabaseConfigured || !supabaseAdmin) return null;
    const { data, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      console.error('Error fetching project by slug:', error);
      return null;
    }
    
    return data ? transformProject(data) : null;
  },

  async createProject(projectData: any) {
    if (!isSupabaseConfigured || !supabaseAdmin) {
      throw new Error('Supabase is not configured');
    }
    
    const { data, error } = await supabaseAdmin
      .from('projects')
      .insert(transformProjectToDb(projectData))
      .select();
    
    if (error) {
      console.error('Error creating project:', error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      throw new Error('Failed to create project: No data returned');
    }
    
    return transformProject(data[0]);
  },

  async updateProject(id: string | number, projectData: any) {
    if (!isSupabaseConfigured || !supabaseAdmin) {
      throw new Error('Supabase is not configured');
    }
    
    const { data, error } = await supabaseAdmin
      .from('projects')
      .update(transformProjectToDb(projectData))
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Error updating project:', error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      throw new Error('Project not found');
    }
    
    return transformProject(data[0]);
  },

  async deleteProject(id: string | number) {
    if (!isSupabaseConfigured || !supabaseAdmin) {
      throw new Error('Supabase is not configured');
    }
    
    const { error } = await supabaseAdmin
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
    
    return true;
  },

  // Services
  async getServices() {
    if (!isSupabaseConfigured || !supabaseAdmin) return [];
    const { data, error } = await supabaseAdmin
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching services:', error);
      return [];
    }
    
    return (data || []).map(transformService);
  },

  async getService(id: string | number) {
    if (!isSupabaseConfigured || !supabaseAdmin) return null;
    const { data, error } = await supabaseAdmin
      .from('services')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching service:', error);
      return null;
    }
    
    return data ? transformService(data) : null;
  },

  async getServiceBySlug(slug: string) {
    if (!isSupabaseConfigured || !supabaseAdmin) return null;
    const { data, error } = await supabaseAdmin
      .from('services')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      console.error('Error fetching service by slug:', error);
      return null;
    }
    
    return data ? transformService(data) : null;
  },

  async createService(serviceData: any) {
    if (!isSupabaseConfigured || !supabaseAdmin) {
      throw new Error('Supabase is not configured');
    }
    
    const { data, error } = await supabaseAdmin
      .from('services')
      .insert(transformServiceToDb(serviceData))
      .select()
      .single();
    
    if (error) {
      console.error('Error creating service:', error);
      throw error;
    }
    
    return transformService(data);
  },

  async updateService(id: string | number, serviceData: any) {
    if (!isSupabaseConfigured || !supabaseAdmin) {
      throw new Error('Supabase is not configured');
    }
    
    const { data, error } = await supabaseAdmin
      .from('services')
      .update(transformServiceToDb(serviceData))
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Error updating service:', error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      throw new Error('Service not found');
    }
    
    return transformService(data[0]);
  },

  async deleteService(id: string | number) {
    if (!isSupabaseConfigured || !supabaseAdmin) {
      throw new Error('Supabase is not configured');
    }
    
    const { error } = await supabaseAdmin
      .from('services')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
    
    return true;
  },

  // Blog Posts
  async getBlogPosts() {
    if (!isSupabaseConfigured || !supabaseAdmin) return [];
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false, nullsFirst: false });
    
    if (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
    
    return (data || []).map(transformBlogPost);
  },

  async getBlogPost(id: string | number) {
    if (!isSupabaseConfigured || !supabaseAdmin) return null;
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
    
    return data ? transformBlogPost(data) : null;
  },

  async getBlogPostBySlug(slug: string) {
    if (!isSupabaseConfigured || !supabaseAdmin) return null;
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      console.error('Error fetching blog post by slug:', error);
      return null;
    }
    
    return data ? transformBlogPost(data) : null;
  },

  async createBlogPost(postData: any) {
    if (!isSupabaseConfigured || !supabaseAdmin) {
      throw new Error('Supabase is not configured');
    }
    
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .insert(transformBlogPostToDb(postData))
      .select();
    
    if (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      throw new Error('Failed to create blog post: No data returned');
    }
    
    return transformBlogPost(data[0]);
  },

  async updateBlogPost(id: string | number, postData: any) {
    if (!isSupabaseConfigured || !supabaseAdmin) {
      throw new Error('Supabase is not configured');
    }
    
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .update(transformBlogPostToDb(postData))
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Error updating blog post:', error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      throw new Error('Blog post not found');
    }
    
    return transformBlogPost(data[0]);
  },

  async deleteBlogPost(id: string | number) {
    if (!isSupabaseConfigured || !supabaseAdmin) {
      throw new Error('Supabase is not configured');
    }
    
    const { error } = await supabaseAdmin
      .from('blog_posts')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting blog post:', error);
      throw error;
    }
    
    return true;
  },

  // Testimonials
  async getTestimonials() {
    if (!isSupabaseConfigured || !supabaseAdmin) return [];
    const { data, error } = await supabaseAdmin
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
    
    return (data || []).map(transformTestimonial);
  },

  async createTestimonial(testimonialData: any) {
    if (!isSupabaseConfigured || !supabaseAdmin) {
      throw new Error('Supabase is not configured');
    }
    
    const { data, error } = await supabaseAdmin
      .from('testimonials')
      .insert(transformTestimonialToDb(testimonialData))
      .select();
    
    if (error) {
      console.error('Error creating testimonial:', error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      throw new Error('Failed to create testimonial: No data returned');
    }
    
    return transformTestimonial(data[0]);
  },

  async updateTestimonial(id: string | number, testimonialData: any) {
    if (!isSupabaseConfigured || !supabaseAdmin) {
      throw new Error('Supabase is not configured');
    }
    
    const { data, error } = await supabaseAdmin
      .from('testimonials')
      .update(transformTestimonialToDb(testimonialData))
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Error updating testimonial:', error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      throw new Error('Testimonial not found');
    }
    
    return transformTestimonial(data[0]);
  },

  async deleteTestimonial(id: string | number) {
    if (!isSupabaseConfigured || !supabaseAdmin) {
      throw new Error('Supabase is not configured');
    }
    
    const { error } = await supabaseAdmin
      .from('testimonials')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting testimonial:', error);
      throw error;
    }
    
    return true;
  },

  // Team Members
  async getTeamMembers() {
    if (!isSupabaseConfigured || !supabaseAdmin) return [];
    const { data, error } = await supabaseAdmin
      .from('team_members')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching team members:', error);
      return [];
    }
    
    return (data || []).map(transformTeamMember);
  },

  async createTeamMember(memberData: any) {
    if (!isSupabaseConfigured || !supabaseAdmin) {
      throw new Error('Supabase is not configured');
    }
    
    const { data, error } = await supabaseAdmin
      .from('team_members')
      .insert(transformTeamMemberToDb(memberData))
      .select();
    
    if (error) {
      console.error('Error creating team member:', error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      throw new Error('Failed to create team member: No data returned');
    }
    
    return transformTeamMember(data[0]);
  },

  async updateTeamMember(id: string | number, memberData: any) {
    if (!isSupabaseConfigured || !supabaseAdmin) {
      throw new Error('Supabase is not configured');
    }
    
    const { data, error } = await supabaseAdmin
      .from('team_members')
      .update(transformTeamMemberToDb(memberData))
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Error updating team member:', error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      throw new Error('Team member not found');
    }
    
    return transformTeamMember(data[0]);
  },

  async deleteTeamMember(id: string | number) {
    if (!isSupabaseConfigured || !supabaseAdmin) {
      throw new Error('Supabase is not configured');
    }
    
    const { error } = await supabaseAdmin
      .from('team_members')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting team member:', error);
      throw error;
    }
    
    return true;
  },

  // Home Page
  async getHomePage() {
    if (!isSupabaseConfigured || !supabaseAdmin) {
      return getDefaultHomePage();
    }
    
    const { data, error } = await supabaseAdmin
      .from('home_page')
      .select('*')
      .eq('id', 1)
      .single();
    
    if (error || !data) {
      return getDefaultHomePage();
    }
    
    return {
      hero: data.hero,
      cta: data.cta,
    };
  },

  async updateHomePage(pageData: any) {
    if (!isSupabaseConfigured || !supabaseAdmin) {
      throw new Error('Supabase is not configured');
    }
    
    const { data, error } = await supabaseAdmin
      .from('home_page')
      .upsert({
        id: 1,
        hero: pageData.hero,
        cta: pageData.cta,
      })
      .select();
    
    if (error) {
      console.error('Error updating home page:', error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      throw new Error('Failed to update home page: No data returned');
    }
    
    return {
      hero: data[0].hero,
      cta: data[0].cta,
    };
  },

  // About Page
  async getAboutPage() {
    if (!isSupabaseConfigured || !supabaseAdmin) {
      return getDefaultAboutPage();
    }
    
    const { data, error } = await supabaseAdmin
      .from('about_page')
      .select('*')
      .eq('id', 1)
      .single();
    
    if (error || !data) {
      return getDefaultAboutPage();
    }
    
    return {
      hero: data.hero,
      mission: data.mission,
      vision: data.vision,
      values: data.values || [],
      timeline: data.timeline || [],
    };
  },

  async updateAboutPage(pageData: any) {
    if (!isSupabaseConfigured || !supabaseAdmin) {
      throw new Error('Supabase is not configured');
    }
    
    const { data, error } = await supabaseAdmin
      .from('about_page')
      .upsert({
        id: 1,
        hero: pageData.hero,
        mission: pageData.mission,
        vision: pageData.vision,
        values: pageData.values || [],
        timeline: pageData.timeline || [],
      })
      .select();
    
    if (error) {
      console.error('Error updating about page:', error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      throw new Error('Failed to update about page: No data returned');
    }
    
    return {
      hero: data[0].hero,
      mission: data[0].mission,
      vision: data[0].vision,
      values: data[0].values || [],
      timeline: data[0].timeline || [],
    };
  },

  // Global Settings
  async getGlobalSettings() {
    if (!isSupabaseConfigured || !supabaseAdmin) {
      return getDefaultGlobalSettings();
    }
    
    const { data, error } = await supabaseAdmin
      .from('global_settings')
      .select('*')
      .eq('id', 1)
      .single();
    
    if (error || !data) {
      return getDefaultGlobalSettings();
    }
    
    return {
      siteName: data.site_name,
      socialLinks: data.social_links || {},
      seoDefaults: data.seo_defaults || {},
    };
  },

  async updateGlobalSettings(settingsData: any) {
    if (!isSupabaseConfigured || !supabaseAdmin) {
      throw new Error('Supabase is not configured');
    }
    
    const { data, error } = await supabaseAdmin
      .from('global_settings')
      .upsert({
        id: 1,
        site_name: settingsData.siteName,
        social_links: settingsData.socialLinks || {},
        seo_defaults: settingsData.seoDefaults || {},
      })
      .select();
    
    if (error) {
      console.error('Error updating global settings:', error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      throw new Error('Failed to update global settings: No data returned');
    }
    
    return {
      siteName: data[0].site_name,
      socialLinks: data[0].social_links || {},
      seoDefaults: data[0].seo_defaults || {},
    };
  },
};

// Transform functions - Database to App format
function transformProject(dbProject: any) {
  if (!dbProject) {
    console.warn('[Transform] Received null/undefined project');
    return null;
  }
  
  try {
    const transformed = {
      id: dbProject.id,
      title: dbProject.title || '',
      slug: dbProject.slug || '',
      description: dbProject.description || '',
      featured: dbProject.featured === true || dbProject.featured === 'true' || dbProject.featured === 1 || dbProject.featured === '1' || false,
      techStack: Array.isArray(dbProject.tech_stack) ? dbProject.tech_stack : (dbProject.tech_stack ? [dbProject.tech_stack] : []),
      projectUrl: dbProject.project_url || null,
      githubUrl: dbProject.github_url || null,
      thumbnail: dbProject.thumbnail || null,
      images: Array.isArray(dbProject.images) ? dbProject.images : (dbProject.images ? [dbProject.images] : []),
      createdAt: dbProject.created_at || new Date().toISOString(),
      updatedAt: dbProject.updated_at || new Date().toISOString(),
    };
    
    console.log('[Transform] Project transformed:', {
      id: transformed.id,
      title: transformed.title,
      slug: transformed.slug,
      featured: transformed.featured,
      featuredType: typeof transformed.featured,
      originalFeatured: dbProject.featured,
      originalFeaturedType: typeof dbProject.featured,
    });
    
    return transformed;
  } catch (err: any) {
    console.error('[Transform] Error transforming project:', err);
    console.error('[Transform] Raw project data:', JSON.stringify(dbProject, null, 2));
    return null;
  }
}

function transformProjectToDb(project: any) {
  return {
    title: project.title,
    slug: project.slug,
    description: project.description,
    featured: project.featured || false,
    tech_stack: project.techStack || [],
    project_url: project.projectUrl,
    github_url: project.githubUrl,
    thumbnail: project.thumbnail,
    images: Array.isArray(project.images) ? project.images : [],
  };
}

function transformService(dbService: any) {
  return {
    id: dbService.id,
    title: dbService.title,
    slug: dbService.slug,
    description: dbService.description,
    icon: dbService.icon,
    createdAt: dbService.created_at,
    updatedAt: dbService.updated_at,
  };
}

function transformServiceToDb(service: any) {
  return {
    title: service.title,
    slug: service.slug,
    description: service.description,
    icon: service.icon,
  };
}

function transformBlogPost(dbPost: any) {
  return {
    id: dbPost.id,
    title: dbPost.title,
    slug: dbPost.slug,
    excerpt: dbPost.excerpt,
    content: dbPost.content,
    featuredImage: dbPost.featured_image,
    category: dbPost.category,
    publishedAt: dbPost.published_at,
    createdAt: dbPost.created_at,
    updatedAt: dbPost.updated_at,
  };
}

function transformBlogPostToDb(post: any) {
  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    featured_image: post.featuredImage,
    category: post.category,
    published_at: post.publishedAt || post.published_at,
  };
}

function transformTestimonial(dbTestimonial: any) {
  return {
    id: dbTestimonial.id,
    name: dbTestimonial.name,
    role: dbTestimonial.role,
    company: dbTestimonial.company,
    content: dbTestimonial.content,
    avatar: dbTestimonial.avatar,
    rating: dbTestimonial.rating,
    createdAt: dbTestimonial.created_at,
  };
}

function transformTestimonialToDb(testimonial: any) {
  return {
    name: testimonial.name,
    role: testimonial.role,
    company: testimonial.company,
    content: testimonial.content,
    avatar: testimonial.avatar,
    rating: testimonial.rating,
  };
}

function transformTeamMember(dbMember: any) {
  return {
    id: dbMember.id,
    name: dbMember.name,
    role: dbMember.role,
    bio: dbMember.bio,
    avatar: dbMember.avatar,
    socialLinks: dbMember.social_links || {},
    createdAt: dbMember.created_at,
  };
}

function transformTeamMemberToDb(member: any) {
  return {
    name: member.name,
    role: member.role,
    bio: member.bio,
    avatar: member.avatar,
    social_links: member.socialLinks || {},
  };
}

// Default values
function getDefaultHomePage() {
  return {
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
}

function getDefaultAboutPage() {
  return {
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
    values: [],
    timeline: [],
  };
}

function getDefaultGlobalSettings() {
  return {
    siteName: 'ATECH',
    socialLinks: {},
    seoDefaults: {},
  };
}

