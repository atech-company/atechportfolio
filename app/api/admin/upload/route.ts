import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Priority 1: Use Supabase Storage if configured
    if (isSupabaseConfigured && supabaseAdmin) {
      try {
        const timestamp = Date.now();
        const filename = `${timestamp}-${file.name}`;
        const fileBuffer = Buffer.from(await file.arrayBuffer());

        // Upload to Supabase Storage
        const { data, error } = await supabaseAdmin.storage
          .from('uploads')
          .upload(filename, fileBuffer, {
            contentType: file.type,
            upsert: false,
          });

        if (error) {
          throw error;
        }

        // Get public URL
        const { data: urlData } = supabaseAdmin.storage
          .from('uploads')
          .getPublicUrl(filename);

        return NextResponse.json({
          url: urlData.publicUrl,
          filename,
          size: file.size,
          type: file.type,
        });
      } catch (error: any) {
        console.error('Supabase upload error:', error);
        // Fall through to file system fallback
      }
    }

    // Fallback: Use local file system (development)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadsDir)) {
      mkdirSync(uploadsDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;
    const filepath = join(uploadsDir, filename);

    // Save file
    await writeFile(filepath, buffer);

    // Return URL
    const url = `/uploads/${filename}`;

    return NextResponse.json({
      url,
      filename,
      size: file.size,
      type: file.type,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

