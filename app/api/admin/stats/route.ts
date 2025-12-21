import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const stats = {
      projects: (await db.getProjects()).length,
      services: (await db.getServices()).length,
      blogPosts: (await db.getBlogPosts()).length,
      testimonials: (await db.getTestimonials()).length,
      teamMembers: (await db.getTeamMembers()).length,
    };

    return NextResponse.json(stats);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

