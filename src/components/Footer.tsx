import { Shield, Github, MessageCircle, Heart, ExternalLink, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Footer() {
  return (
    <footer className="relative bg-black/40 backdrop-blur-md border-t border-white/5">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 via-transparent to-transparent" />
      
      <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
        >
          {/* Brand Section */}
          <motion.div variants={item} className="space-y-4">
            <Link to="/" className="flex items-center group">
              <Shield className="h-8 w-8 text-purple-500 group-hover:scale-110 transition-transform duration-300" />
              <span className="ml-2 text-xl font-bold text-white">UDP</span>
            </Link>
            <p className="text-gray-400 max-w-xs">
              Premium gaming tools with advanced features and undetectable technology.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={item} className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/status" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  Status
                </Link>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  Features
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Community */}
          <motion.div variants={item} className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Community</h3>
            <div className="flex space-x-4">
              <a 
                href="https://discord.gg/undetect" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors duration-300"
              >
                <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Discord</span>
                <ExternalLink className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          variants={item}
          className="pt-8 mt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="flex items-center space-x-2 text-gray-400 mb-4 md:mb-0">
            <span>&copy; {new Date().getFullYear()} UDP Gaming Tools</span>
            <Heart className="h-4 w-4 text-pink-500" />
            <span>All rights reserved</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20"
            >
              <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-sm text-purple-300">Premium Tools</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}