import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET single project
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = await db.getProject(params.id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json({ data: project });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT update project
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const project = await db.updateProject(params.id, body);
    return NextResponse.json({ data: project });
  } catch (error: any) {
    console.error('Update project error:', error);
    const statusCode = error.message.includes('not configured') ? 503 : 500;
    return NextResponse.json({ 
      error: error.message,
      code: error.message.includes('not configured') ? 'SUPABASE_REQUIRED' : 'UNKNOWN_ERROR'
    }, { status: statusCode });
  }
}

// DELETE project
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.deleteProject(params.id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete project error:', error);
    const statusCode = error.message.includes('not configured') ? 503 : 500;
    return NextResponse.json({ 
      error: error.message,
      code: error.message.includes('not configured') ? 'SUPABASE_REQUIRED' : 'UNKNOWN_ERROR'
    }, { status: statusCode });
  }
}

