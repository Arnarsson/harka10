-- SECURITY MIGRATION: Lock down content table and storage buckets
-- Run this AFTER rotating your service keys

-- 1. Add missing columns if needed
ALTER TABLE content ADD COLUMN IF NOT EXISTS published boolean DEFAULT false;
ALTER TABLE content ADD COLUMN IF NOT EXISTS teacher_id TEXT;

-- 2. Enable RLS (Row Level Security)
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- 3. Drop all existing permissive policies
DROP POLICY IF EXISTS "Allow all operations on content" ON content;
DROP POLICY IF EXISTS "Content is viewable by everyone" ON content;
DROP POLICY IF EXISTS "Content is editable by everyone" ON content;

-- 4. Create strict policies

-- No direct client writes - all writes happen server-side with service role
-- This prevents any client from inserting/updating/deleting

-- Read policies:
-- Public can only read published content
CREATE POLICY "Public can read published content" ON content
    FOR SELECT
    USING (published = true);

-- Authenticated users can read their own content (drafts included)
CREATE POLICY "Users can read own content" ON content
    FOR SELECT
    USING (auth.uid()::text = teacher_id);

-- 5. Storage bucket policies
-- First, check if buckets exist
DO $$
BEGIN
    -- Create buckets if they don't exist
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('content', 'content', true)
    ON CONFLICT (id) DO NOTHING;
    
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('videos', 'videos', true)
    ON CONFLICT (id) DO NOTHING;
END $$;

-- Remove any permissive storage policies
DROP POLICY IF EXISTS "Allow all uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Give users access to own folder" ON storage.objects;

-- Only allow public reads (files are served publicly after upload)
CREATE POLICY "Public read content bucket" ON storage.objects
    FOR SELECT
    USING (bucket_id IN ('content', 'videos'));

-- No direct uploads via client - only via signed URLs from server
-- No insert/update/delete policies = no direct client modifications

-- 6. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_content_published ON content(published);
CREATE INDEX IF NOT EXISTS idx_content_teacher_id ON content(teacher_id);
CREATE INDEX IF NOT EXISTS idx_content_created_at ON content(created_at DESC);

-- 7. Add view tracking table if it doesn't exist
CREATE TABLE IF NOT EXISTS content_views (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content_id UUID REFERENCES content(id) ON DELETE CASCADE,
    user_id TEXT,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(content_id, user_id)
);

-- Enable RLS on views table
ALTER TABLE content_views ENABLE ROW LEVEL SECURITY;

-- Anyone can insert a view (for tracking)
CREATE POLICY "Anyone can track views" ON content_views
    FOR INSERT
    WITH CHECK (true);

-- Users can only read their own view history
CREATE POLICY "Users can read own view history" ON content_views
    FOR SELECT
    USING (auth.uid()::text = user_id);

-- 8. Function to safely increment view count (called from server)
CREATE OR REPLACE FUNCTION increment_content_views(p_content_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE content 
    SET views = COALESCE(views, 0) + 1
    WHERE id = p_content_id;
END;
$$;

-- IMPORTANT NOTES:
-- 1. After running this migration, rotate your Supabase service key
-- 2. Update your environment variables with the new service key
-- 3. Test that uploads still work through the signed URL flow
-- 4. Verify that direct client uploads are blocked
-- 5. Check that public users can only see published content