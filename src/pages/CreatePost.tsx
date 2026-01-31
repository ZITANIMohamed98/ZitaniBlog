import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogForm from '../components/BlogForm';
import { blogService } from '../services/blogService';
import type { CreateBlogPost } from '../types/blog';
import './CreatePost.css';

const CreatePost = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CreateBlogPost) => {
    try {
      setIsLoading(true);
      setError(null);
      await blogService.createPost(data);
      navigate('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <div className="create-post-container">
      <div className="create-post-header">
        <h1>Create New Blog Post</h1>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      <BlogForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isLoading} />
    </div>
  );
};

export default CreatePost;
