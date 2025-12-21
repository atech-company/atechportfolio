import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const homePage = await db.getHomePage();
    return NextResponse.json({ data: homePage });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

