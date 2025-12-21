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
    if (!isSupabaseConfigured || !supabaseAdmin) return [];
    const { data, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
    
    return (data || []).map(transformProject);
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
      .select()
      .single();
    
    if (error) {
      console.error('Error creating project:', error);
      throw error;
    }
    
    return transformProject(data);
  },

  async updateProject(id: string | number, projectData: any) {
    if (!isSupabaseConfigured || !supabaseAdmin) {
      throw new Error('Supabase is not configured');
    }
    
    const { data, error } = await supabaseAdmin
      .from('projects')
      .update(transformProjectToDb(projectData))
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating project:', error);
      throw error;
    }
    
    return transformProject(data);
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
      .select()
      .single();
    
    if (error) {
      console.error('Error updating service:', error);
      throw error;
    }
    
    return transformService(data);
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
      .select()
      .single();
    
    if (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }
    
    return transformBlogPost(data);
  },

  async updateBlogPost(id: string | number, postData: any) {
    if (!isSupabaseConfigured || !supabaseAdmin) {
      throw new Error('Supabase is not configured');
    }
    
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .update(transformBlogPostToDb(postData))
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating blog post:', error);
      throw error;
    }
    
    return transformBlogPost(data);
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
      .select()
      .single();
    
    if (error) {
      console.error('Error creating testimonial:', error);
      throw error;
    }
    
    return transformTestimonial(data);
  },

  async updateTestimonial(id: string | number, testimonialData: any) {
    if (!isSupabaseConfigured || !supabaseAdmin) {
      throw new Error('Supabase is not configured');
    }
    
    const { data, error } = await supabaseAdmin
      .from('testimonials')
      .update(transformTestimonialToDb(testimonialData))
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating testimonial:', error);
      throw error;
    }
    
    return transformTestimonial(data);
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
      .select()
      .single();
    
    if (error) {
      console.error('Error creating team member:', error);
      throw error;
    }
    
    return transformTeamMember(data);
  },

  async updateTeamMember(id: string | number, memberData: any) {
    if (!isSupabaseConfigured || !supabaseAdmin) {
      throw new Error('Supabase is not configured');
    }
    
    const { data, error } = await supabaseAdmin
      .from('team_members')
      .update(transformTeamMemberToDb(memberData))
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating team member:', error);
      throw error;
    }
    
    return transformTeamMember(data);
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
      .select()
      .single();
    
    if (error) {
      console.error('Error updating home page:', error);
      throw error;
    }
    
    return {
      hero: data.hero,
      cta: data.cta,
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
      .select()
      .single();
    
    if (error) {
      console.error('Error updating about page:', error);
      throw error;
    }
    
    return {
      hero: data.hero,
      mission: data.mission,
      vision: data.vision,
      values: data.values || [],
      timeline: data.timeline || [],
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
      .select()
      .single();
    
    if (error) {
      console.error('Error updating global settings:', error);
      throw error;
    }
    
    return {
      siteName: data.site_name,
      socialLinks: data.social_links || {},
      seoDefaults: data.seo_defaults || {},
    };
  },
};

// Transform functions - Database to App format
function transformProject(dbProject: any) {
  return {
    id: dbProject.id,
    title: dbProject.title,
    slug: dbProject.slug,
    description: dbProject.description,
    featured: dbProject.featured || false,
    techStack: dbProject.tech_stack || [],
    projectUrl: dbProject.project_url,
    githubUrl: dbProject.github_url,
    thumbnail: dbProject.thumbnail,
    images: Array.isArray(dbProject.images) ? dbProject.images : [],
    createdAt: dbProject.created_at,
    updatedAt: dbProject.updated_at,
  };
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

