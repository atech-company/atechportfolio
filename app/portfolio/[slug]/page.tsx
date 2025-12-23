import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchProject, fetchProjects } from "@/lib/api";
import ProjectDetail from "@/components/sections/ProjectDetail";

export async function generateStaticParams() {
  try {
    const projects = await fetchProjects();
    return projects.map((project) => ({
      slug: project.slug,
    }));
  } catch (error: any) {
    console.error('[generateStaticParams] Error fetching projects:', error);
    return []; // Return empty array on error to prevent build failure
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const project = await fetchProject(params.slug);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://atech.com";
    
    if (!project) {
      return {
        title: "Project Not Found",
      };
    }

  let thumbnailUrl = "";
  const thumbnail = project.thumbnail as any;
  if (typeof thumbnail === 'string') {
    thumbnailUrl = thumbnail.startsWith('http') ? thumbnail : `${siteUrl}${thumbnail}`;
  } else if (thumbnail?.data?.attributes?.url) {
    thumbnailUrl = thumbnail.data.attributes.url.startsWith('http') 
      ? thumbnail.data.attributes.url 
      : `${siteUrl}${thumbnail.data.attributes.url}`;
  } else if (thumbnail?.data && typeof thumbnail.data === 'string') {
    thumbnailUrl = thumbnail.data.startsWith('http') ? thumbnail.data : `${siteUrl}${thumbnail.data}`;
  } else if (thumbnail?.url) {
    thumbnailUrl = thumbnail.url.startsWith('http') ? thumbnail.url : `${siteUrl}${thumbnail.url}`;
  }

    return {
      title: `${project.title} - Portfolio Project | ATECH`,
      description: project.description || `Explore ${project.title} - a project by ATECH showcasing our expertise in software development and digital solutions.`,
      keywords: [
        project.title,
        ...(project.techStack || []),
        "portfolio project",
        "case study",
        "software development",
      ],
      openGraph: {
        title: `${project.title} - Portfolio Project | ATECH`,
        description: project.description || `Explore ${project.title} - a project by ATECH.`,
        url: `${siteUrl}/portfolio/${params.slug}`,
        type: "website",
        images: thumbnailUrl ? [{ url: thumbnailUrl, width: 1200, height: 630, alt: project.title }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: `${project.title} - Portfolio Project | ATECH`,
        description: project.description || `Explore ${project.title} - a project by ATECH.`,
        images: thumbnailUrl ? [thumbnailUrl] : [],
      },
      alternates: {
        canonical: `${siteUrl}/portfolio/${params.slug}`,
      },
    };
  } catch (error: any) {
    console.error(`[Project Page Metadata] Error fetching project with slug ${params.slug}:`, error);
    return {
      title: "Project Not Found",
    };
  }
}

export const revalidate = 0; // Always fetch fresh data
export const dynamic = 'force-dynamic'; // Force dynamic rendering

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    console.log(`[Project Page] Fetching project with slug: ${params.slug}`);
    let project = await fetchProject(params.slug);

    // If project not found via API, try direct database call
    if (!project) {
      console.log(`[Project Page] Project not found via API, trying direct DB call for slug: ${params.slug}`);
      try {
        const { db } = await import('@/lib/db');
        const allProjects = await db.getProjects();
        console.log(`[Project Page] Direct DB call - all projects:`, {
          count: allProjects.length,
          slugs: allProjects.map((p: any) => p.slug),
        });
        
        const foundProject = allProjects.find((p: any) => p.slug === params.slug);
        if (foundProject) {
          console.log(`[Project Page] Found project via direct DB call:`, {
            id: foundProject.id,
            title: foundProject.title,
            slug: foundProject.slug,
          });
          project = foundProject;
        } else {
          console.warn(`[Project Page] Project not found in database for slug: ${params.slug}`);
          console.warn(`[Project Page] Available slugs:`, allProjects.map((p: any) => p.slug));
        }
      } catch (dbError: any) {
        console.error(`[Project Page] Error in direct DB fallback:`, dbError);
      }
    }

    if (!project) {
      console.warn(`[Project Page] Project not found for slug: ${params.slug}`);
      notFound();
    }

    console.log(`[Project Page] Project found, rendering detail page:`, {
      id: project.id,
      title: project.title,
      slug: project.slug,
    });

    return <ProjectDetail project={project} />;
  } catch (error: any) {
    console.error(`[Project Page] Error fetching project with slug ${params.slug}:`, error);
    console.error(`[Project Page] Error stack:`, error.stack);
    notFound();
  }
}

