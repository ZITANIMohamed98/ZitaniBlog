import BlogCard from '../components/BlogCard';
import { blogPosts } from '../data/blogPosts';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to My Blog</h1>
        <p>Thoughts, stories, and ideas about web development</p>
      </div>
      <div className="blog-list">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
