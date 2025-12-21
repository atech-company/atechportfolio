import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');

    let services = await db.getServices();

    if (slug) {
      const service = services.find((s: any) => s.slug === slug);
      return NextResponse.json({ data: service || null });
    }

    return NextResponse.json({ data: services });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

