import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BlogForm from '../components/BlogForm';
import { blogService } from '../services/blogService';
import type { BlogPost, CreateBlogPost } from '../types/blog';
import './EditPost.css';

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadPost(id);
    }
  }, [id]);

  const loadPost = async (postId: string) => {
    try {
      setIsFetching(true);
      setError(null);
      const data = await blogService.getPostById(postId);
      if (!data) {
        setError('Post not found');
      } else {
        setPost(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load post');
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (data: CreateBlogPost) => {
    if (!id) return;

    try {
      setIsLoading(true);
      setError(null);
      await blogService.updatePost(id, data);
      navigate('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post');
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  if (isFetching) {
    return (
      <div className="edit-post-container">
        <div className="loading">Loading post...</div>
      </div>
    );
  }

  if (error && !post) {
    return (
      <div className="edit-post-container">
        <div className="error">
          <p>{error}</p>
          <button onClick={() => navigate('/admin')}>Back to Admin</button>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-post-container">
      <div className="edit-post-header">
        <h1>Edit Blog Post</h1>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {post && (
        <BlogForm
          initialData={post}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default EditPost;
