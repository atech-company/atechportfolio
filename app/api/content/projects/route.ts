import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Public API endpoint (for frontend)
export const dynamic = 'force-dynamic'; // Force dynamic rendering
export const revalidate = 0; // No caching

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');
    const slug = searchParams.get('slug');

    let projects = await db.getProjects();
    
    // Debug logging
    console.log('[Projects API] Total projects fetched:', projects.length);
    if (projects.length > 0) {
      console.log('[Projects API] First project sample:', {
        id: projects[0].id,
        title: projects[0].title,
        slug: projects[0].slug,
        featured: projects[0].featured,
        thumbnail: projects[0].thumbnail,
        hasImages: !!projects[0].images,
        imagesCount: Array.isArray(projects[0].images) ? projects[0].images.length : 0,
      });
    } else {
      console.warn('[Projects API] No projects found in database');
    }

    if (featured === 'true') {
      const beforeCount = projects.length;
      projects = projects.filter((p: any) => {
        // Handle both boolean and string values
        const isFeatured = p.featured === true || p.featured === 'true' || p.featured === 1;
        console.log('[Projects API] Project featured check:', {
          id: p.id,
          title: p.title,
          featured: p.featured,
          featuredType: typeof p.featured,
          isFeatured,
        });
        return isFeatured;
      });
      console.log('[Projects API] Filtered featured projects:', {
        before: beforeCount,
        after: projects.length,
        filtered: beforeCount - projects.length,
      });
    }

    if (slug) {
      const project = projects.find((p: any) => p.slug === slug);
      if (project) {
        // Transform to match Strapi format for single project
        return NextResponse.json({
          data: {
            id: project.id,
            attributes: {
              ...project,
              images: project.images ? { data: project.images } : null,
              thumbnail: project.thumbnail ? { data: project.thumbnail } : null,
            },
          },
        });
      }
      console.warn('[Projects API] Project not found for slug:', slug);
      return NextResponse.json({ data: null });
    }

    if (limit) {
      projects = projects.slice(0, Number(limit));
    }

    // Return projects with thumbnail and images as simple strings/arrays
    const transformed = projects.map((project: any) => {
      // Create attributes object - copy all properties including thumbnail
      const attributes: any = {};
      
      // Copy all properties from project
      Object.keys(project).forEach(key => {
        attributes[key] = project[key];
      });
      
      // Ensure thumbnail and images are preserved (even if they're null/undefined)
      attributes.thumbnail = project.thumbnail;
      attributes.images = project.images;
      
      return {
        id: project.id,
        attributes,
      };
    });

    console.log('[Projects API] Returning transformed projects:', transformed.length);
    return NextResponse.json({ data: transformed });
  } catch (error: any) {
    console.error('[Projects API] Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

