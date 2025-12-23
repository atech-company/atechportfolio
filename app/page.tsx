import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import CTA from "@/components/sections/CTA";
import { fetchHomePage, fetchServices, fetchProjects } from "@/lib/api";

export const revalidate = 0; // Always fetch fresh data - no caching
export const dynamic = 'force-dynamic'; // Force dynamic rendering

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://atech.com";

export const metadata: Metadata = {
  title: "Home - Premium Software Development Agency | ATECH",
  description:
    "ATECH is a premium software development agency specializing in modern web applications, mobile apps, and digital solutions. Transform your business with cutting-edge technology.",
  keywords: [
    "software development",
    "web development",
    "mobile app development",
    "digital solutions",
    "custom software",
    "Next.js development",
    "React development",
  ],
  openGraph: {
    title: "ATECH - Premium Software Development Agency",
    description:
      "Transform your business with cutting-edge software development solutions. Expert web development, mobile apps, and digital solutions.",
    url: siteUrl,
    type: "website",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default async function Home() {
  // First, try to get featured projects
  let projects = await fetchProjects({ featured: true, limit: 6 });
  
  console.log('[Home Page] Featured projects from API:', {
    count: projects?.length || 0,
    projects: projects?.map((p: any) => ({
      id: p?.id,
      title: p?.title,
      featured: p?.featured,
      slug: p?.slug,
    })) || [],
  });
  
  // If no featured projects, try direct database call as fallback
  if (!projects || projects.length === 0) {
    console.log('[Home Page] No featured projects from API, trying direct DB call');
    try {
      const { db } = await import('@/lib/db');
      const allProjects = await db.getProjects();
      console.log('[Home Page] Direct DB call - all projects:', {
        count: allProjects.length,
        featuredProjects: allProjects.filter((p: any) => 
          p.featured === true || p.featured === 'true' || p.featured === 1 || p.featured === '1'
        ).map((p: any) => ({
          id: p.id,
          title: p.title,
          featured: p.featured,
          slug: p.slug,
        })),
      });
      
      // Filter for featured projects
      const featuredProjects = allProjects.filter((p: any) => 
        p.featured === true || p.featured === 'true' || p.featured === 1 || p.featured === '1'
      );
      
      if (featuredProjects.length > 0) {
        console.log('[Home Page] Found featured projects via direct DB call, using them');
        projects = featuredProjects.slice(0, 6);
      } else {
        console.log('[Home Page] No featured projects in DB, showing all projects');
        projects = allProjects.slice(0, 6);
      }
    } catch (error: any) {
      console.error('[Home Page] Error in direct DB fallback:', error);
      // Final fallback: try fetching all projects via API
      projects = await fetchProjects({ limit: 6 });
    }
  }

  const [homePage, services] = await Promise.all([
    fetchHomePage(),
    fetchServices(),
  ]);

  // Debug logging
  console.log('[Home Page] Final projects to display:', {
    count: projects?.length || 0,
    projects: projects?.map((p: any) => ({
      id: p?.id,
      title: p?.title,
      featured: p?.featured,
      slug: p?.slug,
    })) || [],
  });

  return (
    <>
      <Hero data={homePage?.hero} />
      <Services services={services} />
      <FeaturedProjects projects={projects || []} />
      <CTA data={homePage?.cta} />
    </>
  );
}
