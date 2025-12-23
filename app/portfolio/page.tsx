import { Metadata } from "next";
import { fetchProjects } from "@/lib/api";
import PortfolioHero from "@/components/sections/PortfolioHero";
import ProjectsGrid from "@/components/sections/ProjectsGrid";

export const metadata: Metadata = {
  title: "Portfolio - Our Projects & Case Studies | ATECH",
  description:
    "Explore our portfolio of innovative projects and digital solutions crafted for clients worldwide. See our web development, mobile apps, and custom software projects.",
  keywords: [
    "portfolio projects",
    "web development portfolio",
    "mobile app portfolio",
    "software projects",
    "case studies",
    "client work",
    "tech portfolio",
  ],
  openGraph: {
    title: "Portfolio - Our Projects & Case Studies | ATECH",
    description:
      "Explore our portfolio of innovative projects and digital solutions crafted for clients worldwide.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://atech.com"}/portfolio`,
    type: "website",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://atech.com"}/portfolio`,
  },
};

export const revalidate = 0; // Always fetch fresh data - no caching
export const dynamic = 'force-dynamic'; // Force dynamic rendering

export default async function PortfolioPage() {
  console.log('[Portfolio Page] Starting to fetch projects...');
  const projects = await fetchProjects();
  console.log('[Portfolio Page] fetchProjects returned:', {
    type: typeof projects,
    isArray: Array.isArray(projects),
    length: Array.isArray(projects) ? projects.length : 'not array',
    value: projects,
  });

  // Debug logging
  console.log('[Portfolio Page] Projects received:', {
    count: projects?.length || 0,
    projects: projects?.map((p: any) => ({
      id: p.id,
      title: p.title,
      featured: p.featured,
      slug: p.slug,
    })) || [],
  });
  
  // Additional validation
  if (!projects || projects.length === 0) {
    console.error('[Portfolio Page] WARNING: No projects received from fetchProjects');
    console.error('[Portfolio Page] Projects value:', projects);
    console.error('[Portfolio Page] Projects type:', typeof projects);
    console.error('[Portfolio Page] Is array:', Array.isArray(projects));
    
    // Try direct database call as fallback
    try {
      const { db } = await import('@/lib/db');
      const directProjects = await db.getProjects();
      console.log('[Portfolio Page] Direct DB call returned:', directProjects.length, 'projects');
      if (directProjects.length > 0) {
        return (
          <>
            <PortfolioHero />
            <ProjectsGrid projects={directProjects} />
          </>
        );
      }
    } catch (err) {
      console.error('[Portfolio Page] Direct DB call failed:', err);
    }
  } else {
    console.log('[Portfolio Page] First project details:', {
      id: projects[0]?.id,
      title: projects[0]?.title,
      slug: projects[0]?.slug,
      featured: projects[0]?.featured,
      allKeys: Object.keys(projects[0] || {}),
    });
  }

  return (
    <>
      <PortfolioHero />
      <ProjectsGrid projects={projects || []} />
    </>
  );
}

