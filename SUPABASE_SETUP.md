# Supabase Setup Guide

This guide will help you set up Supabase for your React blog with CMS functionality.

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- Node.js and npm installed

## Step 1: Create a Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in your project details:
   - Name: Choose a name for your project
   - Database Password: Create a strong password
   - Region: Select the closest region to your users
4. Click "Create new project"
5. Wait for the project to be set up (this may take a few minutes)

## Step 2: Set Up the Database

### Option A: Using the Supabase SQL Editor (Recommended)

1. In your Supabase project dashboard, navigate to the **SQL Editor** in the left sidebar
2. Click "New Query"
3. Copy the entire contents of `supabase-schema.sql` from the project root
4. Paste it into the SQL editor
5. Click "Run" or press Ctrl/Cmd + Enter
6. You should see a success message indicating the table was created

### Option B: Using the Table Editor

1. Navigate to **Table Editor** in the left sidebar
2. Click "Create a new table"
3. Set table name to `blog_posts`
4. Add the following columns:
   - `id` (uuid, primary key, default: gen_random_uuid())
   - `title` (text, required)
   - `excerpt` (text, required)
   - `content` (text, required)
   - `author` (text, required)
   - `date` (date, required)
   - `read_time` (int4, required)
   - `tags` (text[], required, default: {})
   - `cover_image` (text, nullable)
   - `created_at` (timestamptz, default: now())
   - `updated_at` (timestamptz, default: now())
5. Enable Row Level Security (RLS) and add appropriate policies

## Step 3: Get Your API Credentials

1. In your Supabase project dashboard, go to **Settings** (gear icon in sidebar)
2. Click on **API** in the settings menu
3. You'll need two values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")

## Step 4: Configure Your React App

1. In your project root, create a `.env` file (it's already gitignored):

```bash
cp .env.example .env
```

2. Open `.env` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace `your_supabase_project_url` and `your_supabase_anon_key` with the values from Step 3.

## Step 5: Configure Row Level Security (RLS) Policies

The `supabase-schema.sql` file includes a development-friendly policy that allows all operations. 

**⚠️ Important for Production:**
- The current policy allows anyone to create, read, update, and delete posts
- Before deploying to production, you should:
  1. Remove the "Allow all operations (dev only)" policy
  2. Implement proper authentication
  3. Add restrictive policies based on user roles

Example production policies are commented out in the SQL file.

## Step 6: Test the Setup

1. Start your development server:

```bash
npm run dev
```

2. Navigate to http://localhost:5173/admin
3. Click "Create New Post"
4. Fill in the form and submit
5. Your post should now appear in both:
   - The admin dashboard
   - The home page
   - Supabase Table Editor

## Using the CMS

### Creating a Blog Post

1. Navigate to `/admin` in your browser
2. Click the "+ Create New Post" button
3. Fill in the required fields:
   - **Title**: The post title
   - **Excerpt**: A short summary (displayed on the home page)
   - **Content**: Full post content in Markdown format
   - **Author**: Author name
   - **Date**: Publication date
   - **Read Time**: Estimated reading time in minutes
   - **Cover Image**: Optional cover image URL
   - **Tags**: Add tags by typing and pressing Enter
4. Click "Create Post"

### Editing a Blog Post

1. Go to `/admin`
2. Find the post you want to edit
3. Click the "Edit" button
4. Make your changes
5. Click "Update Post"

### Deleting a Blog Post

1. Go to `/admin`
2. Find the post you want to delete
3. Click the "Delete" button
4. Confirm the deletion

## Markdown Support

The blog supports Markdown formatting in the content field. You can use:

- Headers: `# H1`, `## H2`, `### H3`, etc.
- Bold: `**bold text**`
- Italic: `*italic text*`
- Lists: `- item` or `1. item`
- Code blocks: \`\`\`language ... \`\`\`
- Links: `[text](url)`
- And more!

## Troubleshooting

### "Missing Supabase environment variables"

- Make sure you created the `.env` file in the project root
- Verify that the variable names start with `VITE_`
- Restart your dev server after creating/modifying `.env`

### "Failed to fetch posts" Error

- Check that your Supabase credentials are correct
- Verify that the `blog_posts` table was created successfully
- Check the browser console for detailed error messages
- Verify RLS policies allow the operations you're trying to perform

### Posts not appearing

- Check the Supabase Table Editor to see if posts are being saved
- Verify that your RLS policies allow SELECT operations
- Check for JavaScript errors in the browser console

## Security Considerations

### Development vs Production

The default setup uses permissive RLS policies for ease of development. For production:

1. **Enable Authentication**: Use Supabase Auth to protect admin routes
2. **Restrict Policies**: Only allow authenticated users to create/update/delete
3. **Add Authorization**: Implement role-based access control
4. **Rate Limiting**: Consider implementing rate limiting on the admin endpoints

### Example Production Policy

```sql
-- Allow only authenticated users to insert posts
CREATE POLICY "Authenticated users can insert" ON blog_posts
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Allow only post authors to update their posts
CREATE POLICY "Authors can update own posts" ON blog_posts
  FOR UPDATE
  USING (auth.uid() = author_id);
```

## Next Steps

- Implement user authentication with Supabase Auth
- Add image upload functionality with Supabase Storage
- Implement search and filtering for posts
- Add categories and featured posts
- Set up email notifications for new posts
- Add post scheduling functionality

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
