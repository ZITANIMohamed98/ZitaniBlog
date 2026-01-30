import { Link } from 'react-router-dom';
import type { BlogPost } from '../types/blog';
import './BlogCard.css';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <article className="blog-card">
      <div className="blog-card-content">
        <div className="blog-meta">
          <span className="author">{post.author}</span>
          <span className="date">{new Date(post.date).toLocaleDateString()}</span>
          <span className="read-time">{post.readTime} min read</span>
        </div>
        <Link to={`/post/${post.id}`} className="blog-title-link">
          <h2>{post.title}</h2>
        </Link>
        <p className="blog-excerpt">{post.excerpt}</p>
        <div className="blog-tags">
          {post.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <Link to={`/post/${post.id}`} className="read-more">
          Read more →
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
