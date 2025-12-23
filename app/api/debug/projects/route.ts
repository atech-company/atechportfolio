import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Debug endpoint to check projects
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    console.log('[DEBUG] Starting project fetch...');
    
    // Check which database is being used
    const projects = await db.getProjects();
    
    console.log('[DEBUG] Projects fetched:', {
      count: projects.length,
      projects: projects.map((p: any) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        featured: p.featured,
        hasThumbnail: !!p.thumbnail,
        hasImages: !!p.images,
        imagesCount: Array.isArray(p.images) ? p.images.length : 0,
      })),
    });
    
    return NextResponse.json({
      success: true,
      count: projects.length,
      projects: projects,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('[DEBUG] Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack,
    }, { status: 500 });
  }
}

