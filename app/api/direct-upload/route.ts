import { NextRequest, NextResponse } from 'next/server'

// This endpoint is DEPRECATED and INSECURE
// It was exposing service keys and allowing unauthenticated uploads
export async function POST(request: NextRequest) {
  return NextResponse.json({ 
    error: 'This endpoint is deprecated for security reasons. Please use /api/storage/sign-upload instead.',
    migration: {
      old: '/api/direct-upload',
      new: '/api/storage/sign-upload',
      docs: 'The new endpoint requires authentication and returns signed upload URLs'
    }
  }, { status: 410 }) // 410 Gone
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    error: 'This endpoint is deprecated for security reasons.',
    message: 'Direct upload was removed because it exposed service keys publicly.'
  }, { status: 410 })
}