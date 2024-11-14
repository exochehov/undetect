import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Target, Crosshair, ArrowRight } from 'lucide-react';
import { products } from '../data/products';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

interface ProductDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDropdown({ isOpen, onClose }: ProductDropdownProps) {
  if (!isOpen) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[45]"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-16 inset-x-0 z-[50] bg-black/80 backdrop-blur-md border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {Object.entries(products).map(([id, product]) => {
              const Icon = product.icon;
              const hasValidPricing = product.pricing && product.pricing.length > 0;
              
              return (
                <motion.div
                  key={id}
                  variants={item}
                  whileHover={{ scale: 1.02 }}
                  className="group relative"
                >
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl 
                               group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500" />

                  <Link
                    to={`/product/${id}`}
                    onClick={onClose}
                    className="relative block p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm 
                             hover:border-purple-500/20 transition-all duration-500"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 
                                  group-hover:scale-110 transition-transform duration-500">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      {hasValidPricing ? (
                        <div className="flex items-center space-x-1 text-purple-400">
                          <span>From</span>
                          <span className="text-lg font-bold">${product.pricing[0].price}</span>
                        </div>
                      ) : (
                        <span className="text-gray-500">Coming Soon</span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
                      {product.description}
                    </p>

                    <div className="flex items-center text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                      <span className="text-sm">Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}