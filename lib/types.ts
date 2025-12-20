/**
 * TypeScript types for the application
 * This file is safe to import in both client and server components
 */

export interface Image {
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

