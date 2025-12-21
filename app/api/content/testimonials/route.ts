import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit');
    
    let testimonials = await db.getTestimonials();
    
    if (limit) {
      testimonials = testimonials.slice(0, Number(limit));
    }
    
    return NextResponse.json({ data: testimonials });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

