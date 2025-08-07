# Admin Setup Instructions

## Method 1: Using Clerk Dashboard (Recommended)

1. **Go to your Clerk Dashboard**: https://dashboard.clerk.com
2. **Navigate to Users** in the sidebar
3. **Find your user** (the one you signed up with)
4. **Click "Edit"** on your user
5. **Go to "Metadata" tab**
6. **In "Public Metadata" section**, add:
   ```json
   {
     "role": "admin"
   }
   ```
7. **Click "Save"**
8. **Sign out and sign back in** to your app

## Method 2: Programmatic Setup (Alternative)

If you can't access the Clerk dashboard, you can temporarily modify your app:

1. Create a temporary admin setup page
2. Use the Clerk `clerkClient.users.updateUserMetadata()` API
3. Remove the temporary page after setup

## Method 3: Environment Variable Override (For Development)

Add this to your `.env.local` (temporary):
```env
# Temporary admin override - REMOVE IN PRODUCTION
ADMIN_EMAIL=your-email@example.com
```

Then modify middleware to check this email temporarily.

## Verification

After setting up admin role:

1. Sign in to your app
2. Go to http://localhost:3000/admin
3. You should see the admin dashboard
4. Check browser console for debug logs

## Debug Information

The app now includes debug logging. Check your terminal (where you run `pnpm run dev`) to see:
- User ID and role information
- Metadata being checked
- Access grant/deny decisions

## Common Issues

- **Still no access**: Make sure you signed out and back in after setting the role
- **Role not found**: Double-check the JSON format in Clerk dashboard
- **Clerk dashboard access**: Contact your team admin if you can't access the Clerk project

## Security Note

Remember to remove debug logging before production deployment!