import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Public API endpoint (for frontend)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');
    const slug = searchParams.get('slug');

    let projects = await db.getProjects();

    if (featured === 'true') {
      projects = projects.filter((p: any) => p.featured === true);
    }

    if (slug) {
      const project = projects.find((p: any) => p.slug === slug);
      if (project) {
        // Transform to match Strapi format
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

    return NextResponse.json({ data: transformed });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

