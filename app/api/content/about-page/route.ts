import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Public API endpoint for About page
export async function GET(request: NextRequest) {
  try {
    const aboutPage = await db.getAboutPage();
    return NextResponse.json({ data: aboutPage });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

