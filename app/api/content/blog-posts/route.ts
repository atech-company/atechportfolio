import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit');
    const slug = searchParams.get('slug');
    const category = searchParams.get('category');
    
    let posts = await db.getBlogPosts();
    
    // Sort by publishedAt descending
    posts.sort((a: any, b: any) => {
      const dateA = new Date(a.publishedAt || a.createdAt || 0).getTime();
      const dateB = new Date(b.publishedAt || b.createdAt || 0).getTime();
      return dateB - dateA;
    });
    
    if (slug) {
      const post = posts.find((p: any) => p.slug === slug);
      return NextResponse.json({ data: post || null });
    }
    
    if (category) {
      posts = posts.filter((p: any) => p.category === category);
    }
    
    if (limit) {
      posts = posts.slice(0, Number(limit));
    }
    
    return NextResponse.json({ data: posts });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

