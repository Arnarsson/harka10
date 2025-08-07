-- SUPABASE SETUP SCRIPT FOR HARKA UPLOAD SYSTEM
-- Run this in your Supabase SQL Editor

-- Create content table
CREATE TABLE IF NOT EXISTS content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'general',
  file_path TEXT NOT NULL,
  file_url TEXT,
  file_type TEXT,
  file_size INTEGER,
  user_id TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage bucket (if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('content', 'content', true)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies (allow all for now - you can restrict later)
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Policy to allow all operations for now (TEMPORARY)
CREATE POLICY "Allow all operations on content" ON content
FOR ALL USING (true) WITH CHECK (true);

-- Storage policy - allow all uploads and reads
CREATE POLICY "Allow all uploads" ON storage.objects
FOR ALL USING (bucket_id = 'content') WITH CHECK (bucket_id = 'content');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_content_created_at ON content(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_content_category ON content(category);
CREATE INDEX IF NOT EXISTS idx_content_user_id ON content(user_id);

-- Add a trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_content_updated_at 
    BEFORE UPDATE ON content 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Success message
SELECT 'HARKA Upload System Database Setup Complete!' as status;