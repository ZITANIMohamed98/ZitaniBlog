-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  date DATE NOT NULL,
  read_time INTEGER NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  cover_image TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on date for sorting
CREATE INDEX IF NOT EXISTS idx_blog_posts_date ON blog_posts(date DESC);

-- Create index on tags for filtering
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN(tags);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function before updates
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (you can restrict this later based on authentication)
-- For now, we allow anyone to read posts
CREATE POLICY "Allow public read access" ON blog_posts
  FOR SELECT
  USING (true);

-- You can add policies for authenticated users to create/update/delete posts
-- Example: Allow authenticated users to insert posts
-- CREATE POLICY "Allow authenticated insert" ON blog_posts
--   FOR INSERT
--   WITH CHECK (auth.role() = 'authenticated');

-- Example: Allow authenticated users to update their own posts
-- CREATE POLICY "Allow authenticated update" ON blog_posts
--   FOR UPDATE
--   USING (auth.role() = 'authenticated');

-- Example: Allow authenticated users to delete their own posts
-- CREATE POLICY "Allow authenticated delete" ON blog_posts
--   FOR DELETE
--   USING (auth.role() = 'authenticated');

-- For development purposes, you might want to allow all operations without authentication
-- WARNING: Remove these policies in production and implement proper authentication
CREATE POLICY "Allow all operations (dev only)" ON blog_posts
  FOR ALL
  USING (true)
  WITH CHECK (true);
