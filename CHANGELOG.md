# Changelog

## CMS and Supabase Integration - 2025-01-31

### Added

#### Backend & Database
- **Supabase Integration**: Added `@supabase/supabase-js` client library
- **Database Schema**: Created `supabase-schema.sql` with complete table definition for blog posts
- **Environment Configuration**: Added `.env.example` template for Supabase credentials
- **Service Layer**: Created `src/services/blogService.ts` with full CRUD operations
- **Supabase Client**: Configured client in `src/lib/supabase.ts`

#### CMS Interface
- **Admin Dashboard** (`src/pages/Admin.tsx`): View all posts with edit/delete actions
- **Create Post Page** (`src/pages/CreatePost.tsx`): Form for creating new blog posts
- **Edit Post Page** (`src/pages/EditPost.tsx`): Form for editing existing posts
- **Blog Form Component** (`src/components/BlogForm.tsx`): Reusable form with:
  - Title, excerpt, and markdown content fields
  - Author, date, and read time inputs
  - Tag management with add/remove functionality
  - Cover image URL support
  - Form validation
  - Loading states

#### Routing
- `/admin` - Admin dashboard
- `/admin/create` - Create new post
- `/admin/edit/:id` - Edit existing post
- Updated Header navigation with Admin link

#### Updated Components
- **Home Page**: Now fetches posts from Supabase with loading/error states
- **BlogPost Page**: Fetches individual posts from Supabase dynamically
- **Type Definitions**: Enhanced BlogPost interface with timestamps and new types

#### Documentation
- **SUPABASE_SETUP.md**: Comprehensive setup guide including:
  - Step-by-step Supabase project creation
  - Database setup instructions
  - Environment configuration
  - CMS usage guide
  - Troubleshooting section
  - Security considerations
- **Updated README.md**: Added CMS and Supabase information

#### Styling
- `BlogForm.css` - Form styling with dark mode support
- `Admin.css` - Admin dashboard table and actions styling
- `CreatePost.css` / `EditPost.css` - Page-specific styles
- Updated `Home.css` with loading/error state styles

### Changed

- **Home Page**: Migrated from static data to dynamic Supabase fetching
- **BlogPost Page**: Migrated from static lookup to database queries
- **Type System**: Added `CreateBlogPost` and `UpdateBlogPost` types
- **.gitignore**: Added `.env` to prevent credential leaks

### Technical Details

#### Database Schema
- Table: `blog_posts`
- Columns: id (uuid), title, excerpt, content, author, date, read_time, tags, cover_image, created_at, updated_at
- Indexes on date and tags for performance
- Automatic timestamp updates via trigger
- Row Level Security (RLS) enabled with development-friendly policies

#### Features
- Full CRUD operations for blog posts
- Markdown support for content
- Tag management
- Loading and error states throughout
- Form validation
- TypeScript type safety
- Responsive design
- Dark/light mode support

### Security Notes

⚠️ **Important**: The current setup uses permissive RLS policies for development. Before production deployment:
1. Implement Supabase Authentication
2. Restrict RLS policies to authenticated users
3. Add role-based access control for admin operations
4. Remove the "Allow all operations (dev only)" policy

### Migration Notes

For existing users:
1. The old `src/data/blogPosts.ts` is still present but no longer used
2. All posts should now be managed through the CMS at `/admin`
3. You'll need to manually migrate existing posts to Supabase if desired
4. Set up Supabase credentials in `.env` before running the app

### Breaking Changes

- Home page and individual post pages now require Supabase connection
- Without proper `.env` configuration, the app will show an error
- Static post data is no longer the default content source
