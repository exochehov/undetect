import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import CheatMenu from './components/CheatMenu';
import Loader from './components/Loader';
import ProductPage from './components/ProductPage';
import StatusPage from './components/StatusPage';
import MouseEffect from './components/MouseEffect';

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-dark noise-bg">
      {loading && <Loader />}
      <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <MouseEffect />
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <Pricing />
            </>
          } />
          <Route path="/product/:id" element={<ProductPage setLoading={setLoading} />} />
          <Route path="/status" element={<StatusPage />} />
        </Routes>
        <Footer />
        <CheatMenu />
      </div>
    </div>
  );
}

export default App;