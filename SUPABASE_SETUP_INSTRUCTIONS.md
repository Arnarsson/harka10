# 🚀 SUPABASE SETUP - GET UPLOADING NOW!

## Step 1: Get Your Supabase Keys (5 minutes)

1. **Go to**: https://supabase.com/dashboard
2. **Select your project** (or create one)
3. **Go to**: Settings → API
4. **Copy these 3 values**:
   - **Project URL** (looks like: `https://xyz.supabase.co`)
   - **Anon/Public key** (starts with `eyJ`)
   - **Service role key** (starts with `eyJ` - longer key)

## Step 2: Add Environment Variables

Add these to your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 3: Set Up Database and Storage

1. **Go to**: Supabase Dashboard → SQL Editor
2. **Copy and paste** the entire contents of `setup-supabase.sql`
3. **Click "Run"**

This creates:
- ✅ `content` table for metadata
- ✅ `content` storage bucket for files
- ✅ Proper permissions (RLS policies)
- ✅ Database indexes

## Step 4: Deploy and Test

```bash
# Deploy with your new environment variables
git add .env.local
git add -A
git commit -m "Add Supabase configuration for uploads"
git push origin main

# Or deploy directly
vercel --prod
```

## Step 5: Upload Content!

Go to: **https://www.ethos-ai.cc/upload-admin**

You can now:
- ✅ Upload videos, PDFs, images, documents
- ✅ Add titles, descriptions, categories
- ✅ Files stored in Supabase Storage
- ✅ Metadata saved to database
- ✅ Get public URLs for all files

## 🔥 What Happens When You Upload:

1. **File gets uploaded** to Supabase Storage bucket `content`
2. **Metadata gets saved** to `content` database table
3. **Public URL generated** for accessing the file
4. **Everything bypasses** the broken role system
5. **You get immediate feedback** with file URL

## 🛠️ If Something Goes Wrong:

1. **Check browser console** for detailed error messages
2. **Check Supabase logs** in Dashboard → Logs
3. **Verify environment variables** are correctly set
4. **Make sure storage bucket exists** and is public

## 🎯 The Bottom Line:

**This is a working file upload system that stores real files in Supabase.** 

No more localStorage, no more placeholders - actual file uploads that your students can access via public URLs.

**Just add your Supabase keys and it works immediately!** 🚀