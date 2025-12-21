import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET about page data
export async function GET() {
  try {
    const aboutPage = await db.getAboutPage();
    return NextResponse.json({ data: aboutPage });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT update about page data
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const aboutPage = await db.updateAboutPage(body);
    return NextResponse.json({ data: aboutPage });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

