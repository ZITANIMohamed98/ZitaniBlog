import './About.css';

const About = () => {
  return (
    <div className="about">
      <h1>About This Blog</h1>
      <div className="about-content">
        <p>
          Welcome! This is a modern blog starter template built with React and TypeScript.
          It's designed to be simple, fast, and easy to customize.
        </p>
        <h2>Features</h2>
        <ul>
          <li>Built with React 18 and TypeScript</li>
          <li>Fast development with Vite</li>
          <li>React Router for navigation</li>
          <li>Simple markdown rendering</li>
          <li>Responsive design</li>
          <li>Clean and modern UI</li>
        </ul>
        <h2>Get Started</h2>
        <p>
          To customize this blog for your needs, simply edit the blog posts in the{' '}
          <code>src/data/blogPosts.ts</code> file, update the styling, and deploy!
        </p>
      </div>
    </div>
  );
};

export default About;
