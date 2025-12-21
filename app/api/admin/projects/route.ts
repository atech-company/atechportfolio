import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET all projects
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
      projects = projects.filter((p: any) => p.slug === slug);
    }

    if (limit) {
      projects = projects.slice(0, Number(limit));
    }

    return NextResponse.json({ data: projects });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST create project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const project = await db.createProject(body);
    return NextResponse.json({ data: project }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

