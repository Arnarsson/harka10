# HARKA Security Migration Guide

## Critical Security Update Required

This guide walks through the security fixes implemented to address critical vulnerabilities in the HARKA platform's upload system.

## Issues Fixed

### 1. **Public Upload Endpoints** (CRITICAL)
- **Issue**: `/api/direct-upload`, `/upload-admin`, and `/teacher-access` were publicly accessible
- **Risk**: Anyone could upload files and write to database without authentication
- **Fix**: Removed from public routes in middleware, added authentication requirements

### 2. **Exposed Service Keys** (CRITICAL)
- **Issue**: Supabase service key was used in public API endpoint
- **Risk**: Complete database and storage access to anyone
- **Fix**: Moved to signed URL pattern with server-side validation

### 3. **No Role Validation** (HIGH)
- **Issue**: Upload endpoints had no role checking
- **Risk**: Any authenticated user could upload as teacher
- **Fix**: Added role validation requiring teacher/admin role

### 4. **Permissive RLS Policies** (MEDIUM)
- **Issue**: Database RLS allowed "all operations" 
- **Risk**: Direct client database manipulation
- **Fix**: Strict RLS with server-only writes

## Migration Steps

### Step 1: Update Code (10 minutes)

1. Pull the latest changes:
```bash
git pull origin massive-cleanup-consolidation
```

2. Install dependencies (if any changed):
```bash
pnpm install
```

### Step 2: Rotate Supabase Service Key (5 minutes)

**CRITICAL**: Your service key was exposed in a public endpoint. Rotate immediately.

1. Go to Supabase Dashboard → Settings → API
2. Click "Roll" next to service_role key
3. Copy new key
4. Update `.env.local`:
```
SUPABASE_SERVICE_KEY=your-new-service-key
```

### Step 3: Run Database Migration (5 minutes)

1. Go to Supabase Dashboard → SQL Editor
2. Paste contents of `supabase-security-migration.sql`
3. Run the migration
4. Verify no errors

### Step 4: Update Environment Variables

Ensure your `.env.local` has:
```
# Clerk (existing)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_xxx
CLERK_SECRET_KEY=sk_xxx

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_KEY=xxx  # NEW rotated key

# Remove any SUPABASE_SERVICE_ROLE_KEY if present
```

### Step 5: Deploy Changes

```bash
# Build locally first to verify
pnpm run build

# Deploy to your platform
# Vercel: git push (auto-deploy)
# Other: follow your deployment process
```

### Step 6: Test Security

1. **Test Unauthenticated Access**:
   - Try accessing `/api/direct-upload` → Should return 410 Gone
   - Try accessing `/upload-admin` → Should show deprecation notice
   - Try accessing `/teacher-access` → Should redirect to sign-in

2. **Test Role Requirements**:
   - Sign in as student → Try `/teach/upload` → Should redirect
   - Sign in as teacher → Try `/teach/upload` → Should work
   
3. **Test Upload Flow**:
   - Upload a video as teacher
   - Verify file appears in Supabase storage under `teacher/{userId}/`
   - Verify content row created in database

## API Changes

### Deprecated Endpoints
- `POST /api/direct-upload` → Returns 410 Gone
- Use `POST /api/storage/sign-upload` instead

### New Secure Endpoints

#### `POST /api/storage/sign-upload`
Requires: Authentication + Teacher/Admin role
```json
Request: { "bucket": "videos", "pathHint": "my-video" }
Response: { "path": "teacher/user123/1234-my-video", "token": "xxx" }
```

#### `POST /api/content/secure`
Requires: Authentication + Teacher/Admin role
```json
Request: {
  "title": "My Video",
  "objectPath": "teacher/user123/1234-my-video",
  "bucket": "videos"
}
Response: { "success": true, "content": {...} }
```

## UI Changes

1. **Video Upload Component**:
   - Old: `VideoUpload` (direct upload)
   - New: `VideoUploadSecure` (signed URL flow)

2. **Upload Admin Page**:
   - Now shows security warning
   - Redirects to `/teach/upload` for authenticated users

3. **Teacher Dashboard**:
   - Now uses `/api/content/secure` for data
   - Proper role checking on all operations

## Rollback Plan

If issues occur:

1. **Immediate Rollback**:
```bash
git revert HEAD
git push
```

2. **Restore Old Service Key** (if rotated):
   - Use previous key from secure backup
   - Update environment variables

3. **Revert Database Changes**:
```sql
-- Disable RLS (temporary)
ALTER TABLE content DISABLE ROW LEVEL SECURITY;
```

## Security Best Practices Going Forward

1. **Never expose service keys** in client-accessible code
2. **Always validate roles** on server before sensitive operations
3. **Use signed URLs** for file uploads, not direct service key access
4. **Enable RLS** and write strict policies
5. **Audit API endpoints** regularly for auth requirements
6. **Monitor Supabase logs** for unauthorized access attempts

## Support

If you encounter issues:

1. Check browser console for API errors
2. Verify environment variables are set correctly
3. Check Supabase logs for database errors
4. Ensure user has correct role in Clerk dashboard

## Timeline

- **Immediate**: Rotate service keys (5 min)
- **Today**: Deploy code changes (30 min)
- **This Week**: Monitor for issues
- **Ongoing**: Regular security audits