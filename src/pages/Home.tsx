import { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import { blogService } from '../services/blogService';
import type { BlogPost } from '../types/blog';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await blogService.getAllPosts();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <div className="hero">
        <h1 className="portfolio-section-title">My Blog</h1>
        <p className="subtitle-a">Thoughts, stories, and ideas about technology and development</p>
      </div>

      {loading && (
        <div className="portfolio-loading">
          <p>Loading posts...</p>
        </div>
      )}

      {error && (
        <div className="portfolio-error">
          <p>{error}</p>
          <button className="portfolio-btn" onClick={loadPosts}>Retry</button>
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="portfolio-loading">
          <p>No blog posts yet. Check back soon!</p>
        </div>
      )}

      {!loading && !error && posts.length > 0 && (
        <div className="blog-list">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
