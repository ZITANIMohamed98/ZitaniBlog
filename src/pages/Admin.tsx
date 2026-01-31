import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogService } from '../services/blogService';
import type { BlogPost } from '../types/blog';
import './Admin.css';

const Admin = () => {
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

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      await blogService.deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete post');
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-container">
        <div className="error">
          <p>{error}</p>
          <button onClick={loadPosts}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Manage Blog Posts</h1>
        <Link to="/admin/create" className="create-button">
          + Create New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="empty-state">
          <p>No blog posts yet.</p>
          <Link to="/admin/create" className="create-button">
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="posts-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Date</th>
                <th>Tags</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <Link to={`/post/${post.id}`} className="post-title">
                      {post.title}
                    </Link>
                  </td>
                  <td>{post.author}</td>
                  <td>{new Date(post.date).toLocaleDateString()}</td>
                  <td>
                    <div className="tags">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <span className="tag-more">+{post.tags.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="actions">
                      <Link to={`/admin/edit/${post.id}`} className="edit-button">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
