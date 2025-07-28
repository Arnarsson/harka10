# Run Database Migration

Since we're using the existing Supabase instance, you'll need to run the migration manually:

## Steps:

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project: `mvsbbtdaekskmdrvhbgq`
3. Navigate to **SQL Editor**
4. Click **New Query**
5. Copy and paste the entire contents of:
   ```
   supabase/migrations/20240728000000_initial_schema.sql
   ```
6. Click **RUN**

## Important Notes:

- The migration creates all necessary tables with Row Level Security
- If you get errors about existing types/tables, you may need to drop them first
- Make sure to backup any existing data before running migrations

## Verify Migration:

After running, you should see these tables in your database:
- profiles
- teams
- team_members
- learning_modules
- user_progress
- ai_interactions
- analytics_events

## Next Steps:

Once migration is complete, you can:
1. Run `pnpm install` to install dependencies
2. Run `pnpm dev` to start the development server
3. Visit http://localhost:3000