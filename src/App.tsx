import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Admin from './pages/Admin';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import './portfolio-theme.css';
import './App.css';

function App() {
  return (
    <Router basename="/blog">
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/create" element={<CreatePost />} />
            <Route path="/admin/edit/:id" element={<EditPost />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
