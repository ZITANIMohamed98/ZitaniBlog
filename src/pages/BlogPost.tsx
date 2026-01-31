import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { blogService } from '../services/blogService';
import { renderMarkdown } from '../utils/markdown';
import type { BlogPost as BlogPostType } from '../types/blog';
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadPost(id);
    }
  }, [id]);

  const loadPost = async (postId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await blogService.getPostById(postId);
      setPost(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="blog-post-container">
        <div className="loading-state">Loading post...</div>
      </div>
    );
  }

  if (error || !post) {
    return <Navigate to="/" replace />;
  }

  return (
    <article className="blog-post">
      <header className="post-header">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span className="author">By {post.author}</span>
          <span className="date">{new Date(post.date).toLocaleDateString()}</span>
          <span className="read-time">{post.readTime} min read</span>
        </div>
        <div className="post-tags">
          {post.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </header>
      <div className="post-content">
        {renderMarkdown(post.content)}
      </div>
    </article>
  );
};

export default BlogPost;
