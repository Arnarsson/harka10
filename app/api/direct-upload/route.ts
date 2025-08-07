import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
      return NextResponse.json({ 
        error: 'Supabase not configured. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_KEY to environment variables.' 
      }, { status: 500 })
    }

    // Direct Supabase connection - bypass Clerk
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY // Use service key for full access
    )

    const formData = await request.formData()
    const file = formData.get('file') as File
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type)

    // Create a safe filename
    const fileExtension = file.name.split('.').pop()
    const safeFileName = `${Date.now()}-${title.replace(/[^a-zA-Z0-9]/g, '_')}.${fileExtension}`

    // Convert File to ArrayBuffer for Supabase
    const fileBuffer = await file.arrayBuffer()

    // Upload to Supabase Storage
    console.log('Uploading to Supabase storage bucket: content')
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('content')
      .upload(safeFileName, fileBuffer, {
        contentType: file.type,
        cacheControl: '3600'
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json({ 
        error: `Upload failed: ${uploadError.message}`,
        details: uploadError
      }, { status: 500 })
    }

    console.log('File uploaded successfully:', uploadData.path)

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('content')
      .getPublicUrl(safeFileName)

    // Save metadata to database
    console.log('Saving metadata to database')
    const { data: dbData, error: dbError } = await supabase
      .from('content')
      .insert({
        title,
        description,
        category,
        file_path: safeFileName,
        file_url: urlData.publicUrl,
        file_type: file.type,
        file_size: file.size,
        created_at: new Date().toISOString(),
        user_id: 'direct-upload' // Mark as direct upload
      })
      .select()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json({ 
        error: `Database save failed: ${dbError.message}`,
        details: dbError
      }, { status: 500 })
    }

    console.log('Content saved successfully:', dbData)

    return NextResponse.json({ 
      success: true, 
      message: 'Content uploaded successfully!',
      data: dbData[0],
      fileUrl: urlData.publicUrl
    })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ 
      error: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      details: error
    }, { status: 500 })
  }
}