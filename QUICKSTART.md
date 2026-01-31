# Quick Start Guide

Get your blog up and running in 5 minutes!

## 1. Install Dependencies

```bash
npm install
```

## 2. Set Up Supabase

### Create a Supabase Account
1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Wait for it to initialize (~2 minutes)

### Set Up the Database
1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the contents of `supabase-schema.sql`
4. Click **Run**

### Get Your Credentials
1. Go to **Settings** → **API**
2. Copy your **Project URL**
3. Copy your **anon/public** key

## 3. Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your Supabase credentials
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 5. Create Your First Post

1. Navigate to [http://localhost:5173/admin](http://localhost:5173/admin)
2. Click **"+ Create New Post"**
3. Fill in the form (all fields with * are required)
4. Click **"Create Post"**

Your post will now appear on the home page!

## What's Next?

- Read [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed setup instructions
- Check out [CHANGELOG.md](./CHANGELOG.md) to see all the new features
- Customize the styling in the CSS files
- Add authentication to protect your admin panel (see SUPABASE_SETUP.md)

## Common Issues

### "Missing Supabase environment variables"
- Make sure `.env` exists and has the correct values
- Restart your dev server after creating `.env`

### Posts not loading
- Check browser console for errors
- Verify Supabase credentials are correct
- Ensure the `blog_posts` table was created

### Need Help?
See the [Troubleshooting section](./SUPABASE_SETUP.md#troubleshooting) in SUPABASE_SETUP.md

## Project Structure

```
src/
├── components/      # Reusable UI components
│   ├── BlogForm.tsx        # Form for creating/editing posts
│   ├── BlogCard.tsx        # Post preview card
│   ├── Header.tsx          # Site header with navigation
│   └── Footer.tsx          # Site footer
├── pages/          # Page components
│   ├── Home.tsx            # Homepage with post list
│   ├── BlogPost.tsx        # Individual post view
│   ├── Admin.tsx           # Admin dashboard
│   ├── CreatePost.tsx      # Create new post page
│   └── EditPost.tsx        # Edit post page
├── services/       # API services
│   └── blogService.ts      # Supabase CRUD operations
├── lib/            # Utilities
│   └── supabase.ts         # Supabase client config
└── types/          # TypeScript types
    └── blog.ts             # Blog post type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

Happy blogging! 🚀
