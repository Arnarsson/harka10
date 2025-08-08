-- Create content table if it doesn't exist
CREATE TABLE IF NOT EXISTS content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    teacher_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL,
    category TEXT,
    difficulty TEXT DEFAULT 'beginner',
    tags TEXT[] DEFAULT '{}',
    content_url TEXT,
    metadata JSONB DEFAULT '{}',
    status TEXT DEFAULT 'draft',
    views INTEGER DEFAULT 0,
    rating DECIMAL(3,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create content_views table for tracking individual views
CREATE TABLE IF NOT EXISTS content_views (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content_id UUID REFERENCES content(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(content_id, user_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_content_teacher_id ON content(teacher_id);
CREATE INDEX IF NOT EXISTS idx_content_status ON content(status);
CREATE INDEX IF NOT EXISTS idx_content_type ON content(type);
CREATE INDEX IF NOT EXISTS idx_content_views_content_id ON content_views(content_id);
CREATE INDEX IF NOT EXISTS idx_content_views_user_id ON content_views(user_id);

-- Create function to increment views
CREATE OR REPLACE FUNCTION increment_content_views(content_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE content 
    SET views = views + 1 
    WHERE id = content_id;
END;
$$ LANGUAGE plpgsql;

-- Create RLS policies
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_views ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all published content
CREATE POLICY "Published content is viewable by all" ON content
    FOR SELECT USING (status = 'published');

-- Allow teachers to manage their own content
CREATE POLICY "Teachers can manage their own content" ON content
    FOR ALL USING (auth.uid()::text = teacher_id);

-- Allow anyone to track views
CREATE POLICY "Anyone can track views" ON content_views
    FOR INSERT WITH CHECK (true);

-- Allow users to see their own view history
CREATE POLICY "Users can see their own views" ON content_views
    FOR SELECT USING (auth.uid()::text = user_id);