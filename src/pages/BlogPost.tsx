import { useParams, Navigate } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { renderMarkdown } from '../utils/markdown';
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
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
