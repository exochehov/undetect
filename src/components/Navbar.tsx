import { useState, useEffect } from 'react';
import { Menu, X, Shield, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProductsToggle = () => {
    setIsProductsOpen(!isProductsOpen);
  };

  return (
    <>
      <nav className={`fixed w-full bg-black/40 backdrop-blur-md z-[60] border-b border-white/5 transition-all duration-300 ${
        isScrolled ? 'bg-black/60' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center group">
                <Shield className="w-8 h-8 text-purple-500 group-hover:scale-110 transition-transform duration-300" />
                <span className="ml-2 text-xl font-bold text-white">UDP | undetect.net</span>
              </Link>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  Home
                </Link>
                <button 
                  onClick={handleProductsToggle}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                >
                  Products
                  <ChevronDown 
                    className={`ml-1 w-4 h-4 transform transition-transform duration-300 ${
                      isProductsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <Link to="/status" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  Status
                </Link>
              </div>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-black/40 backdrop-blur-md border-t border-white/5">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <button
                onClick={handleProductsToggle}
                className="text-gray-300 hover:text-white w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center"
              >
                Products
                <ChevronDown 
                  className={`ml-1 w-4 h-4 transform transition-transform duration-300 ${
                    isProductsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <Link
                to="/status"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Status
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Products Dropdown */}
      <div 
        className={`fixed top-16 inset-x-0 transform transition-all duration-300 z-[55] ${
          isProductsOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-black/80 backdrop-blur-md border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(products).map(([id, product]) => {
                const Icon = product.icon;
                return (
                  <Link
                    key={id}
                    to={`/product/${id}`}
                    onClick={() => setIsProductsOpen(false)}
                    className="group p-4 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-6 h-6 text-purple-500 group-hover:scale-110 transition-transform duration-300" />
                      <div>
                        <h3 className="text-white font-medium group-hover:text-purple-400 transition-colors duration-300">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-1">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isProductsOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[50]"
          onClick={() => setIsProductsOpen(false)}
        />
      )}
    </>
  );
}