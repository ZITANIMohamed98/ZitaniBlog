import { supabase } from '../lib/supabase';
import type { BlogPost, CreateBlogPost, UpdateBlogPost } from '../types/blog';

export interface BlogPostRow {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  read_time: number;
  tags: string[];
  cover_image: string | null;
  created_at: string;
  updated_at: string;
}

// Helper to convert database row to BlogPost
const mapRowToPost = (row: BlogPostRow): BlogPost => ({
  id: row.id,
  title: row.title,
  excerpt: row.excerpt,
  content: row.content,
  author: row.author,
  date: row.date,
  readTime: row.read_time,
  tags: row.tags,
  coverImage: row.cover_image || undefined,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

// Helper to convert BlogPost to database row format
const mapPostToRow = (post: CreateBlogPost | UpdateBlogPost) => ({
  title: post.title,
  excerpt: post.excerpt,
  content: post.content,
  author: post.author,
  date: post.date,
  read_time: post.readTime,
  tags: post.tags,
  cover_image: post.coverImage || null,
});

export const blogService = {
  async getAllPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }

    return (data as BlogPostRow[]).map(mapRowToPost);
  },

  async getPostById(id: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Post not found
      }
      throw new Error(`Failed to fetch post: ${error.message}`);
    }

    return mapRowToPost(data as BlogPostRow);
  },

  async createPost(post: CreateBlogPost): Promise<BlogPost> {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([mapPostToRow(post)])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create post: ${error.message}`);
    }

    return mapRowToPost(data as BlogPostRow);
  },

  async updatePost(id: string, post: UpdateBlogPost): Promise<BlogPost> {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(mapPostToRow(post as CreateBlogPost))
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update post: ${error.message}`);
    }

    return mapRowToPost(data as BlogPostRow);
  },

  async deletePost(id: string): Promise<void> {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete post: ${error.message}`);
    }
  },
};
