# Supabase Setup Guide for Art Café

This guide will help you set up Supabase to use as a backend for your Art Café website.

## Step 1: Create a Supabase Account

1. Go to [Supabase](https://supabase.com/) and sign up for a free account.
2. After signing up, create a new project.
3. Give your project a name (e.g., "art-cafe") and choose a secure password.
4. Select a region closest to your target audience.
5. Wait for your database to be set up (this may take a few minutes).

## Step 2: Set Up Database Tables

You have two options for setting up your database tables:

### Option 1: Using the SQL Editor in Supabase

1. In your Supabase dashboard, go to the "SQL Editor" section.
2. Create a new query.
3. Copy and paste the contents of the `lib/supabase-sql.sql` file from this project.
4. Execute the SQL commands to create the required tables and functions.

### Option 2: Using the Admin Dashboard

1. Navigate to the `/admin` route in your Art Café website.
2. Look for the "Database Management" section.
3. Click the "Create Tables" button to automatically create the required tables.

## Step 3: Configure Environment Variables

1. In your Supabase project dashboard, go to "Settings" > "API".
2. Find your project URL and anon/public key.
3. Create a `.env.local` file in the root of your project with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Replace the placeholders with your actual Supabase project URL and anon key.

## Step 4: Migrate Existing Data

If you have existing data in localStorage that you want to transfer to Supabase:

1. Make sure your database tables are created (Step 2).
2. Navigate to the `/admin` route in your Art Café website.
3. In the "Database Management" section, click the "Migrate Local Data" button.
4. Confirm the action when prompted.
5. Wait for the migration to complete. You should see a success message when done.

## Step 5: Verify Setup

1. Navigate to your Supabase dashboard.
2. Go to the "Table Editor" section.
3. You should see the following tables:
   - `events` - For managing art and cultural events
   - `artworks` - For managing artwork displays
   - `cafe_items` - For managing café menu items
   - `hours` - For storing opening hours

4. You can also verify through your website by:
   - Adding data through the admin dashboard
   - Checking the "Database Management" section to test the connection

## Troubleshooting

- **Error when creating tables**: Make sure you have the correct permissions. You might need to be the owner of the project.
- **Migration errors**: Check if your localStorage data format matches the expected format for Supabase tables.
- **Connection issues**: Verify that your environment variables are correctly set and that your project is active in Supabase.

## Next Steps

After successfully setting up Supabase, your Art Café website will now store all data in your Supabase database. This provides several advantages:

- Data persistence across devices and sessions
- Ability to back up your data
- Potential for user authentication and authorization in the future
- Better performance for data operations 