import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const stats = {
      projects: db.getProjects().length,
      services: db.getServices().length,
      blogPosts: db.getBlogPosts().length,
      testimonials: db.getTestimonials().length,
      teamMembers: db.getTeamMembers().length,
    };

    return NextResponse.json(stats);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

