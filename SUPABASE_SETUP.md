# Supabase Setup for Direct Upload

## Required Environment Variables

Add these to your `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key_for_full_access
```

## Get Your Supabase Keys

1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to Settings → API
4. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Anon/Public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Service Role key → `SUPABASE_SERVICE_KEY`

## Create Storage Bucket

1. Go to Storage in Supabase dashboard
2. Create a new bucket called `content`
3. Make it public or configure RLS policies

## Create Content Table

Run this SQL in Supabase SQL editor:

```sql
CREATE TABLE IF NOT EXISTS content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  file_path TEXT NOT NULL,
  file_type TEXT,
  user_id TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Test Direct Upload

Once deployed, access:
```
https://www.ethos-ai.cc/upload-admin
```

This bypasses all authentication and lets you upload directly!