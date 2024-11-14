import { Check, Shield, Target, Crosshair, Sparkles, Lock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/products';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Pricing() {
  return (
    <div id="pricing" className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-sm text-purple-300">Choose Your Game</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
            Premium Gaming Tools
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6" />
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Select your game and dominate with our advanced features
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
        >
          {Object.entries(products).map(([id, product], index) => {
            const Icon = product.icon;
            const hasValidPricing = product.pricing && product.pricing.length > 0;
            
            return (
              <motion.div
                key={id}
                variants={item}
                className="group relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl 
                             group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500" />
                
                <div className="relative bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden
                             group-hover:border-purple-500/20 transition-all duration-500">
                  {/* Header */}
                  <div className="p-8 pb-0">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 
                                    group-hover:scale-110 transition-transform duration-500">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                            {product.name}
                          </h3>
                        </div>
                      </div>
                      {hasValidPricing ? (
                        <Shield className="w-6 h-6 text-purple-500" />
                      ) : (
                        <Lock className="w-6 h-6 text-gray-500" />
                      )}
                    </div>

                    <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors duration-300">
                      {product.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="px-8 pb-6">
                    <div className="space-y-3">
                      {product.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <Check className="w-5 h-5 text-purple-500" />
                          </div>
                          <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="p-8 bg-black/20 border-t border-white/5">
                    {hasValidPricing ? (
                      <>
                        <div className="flex items-baseline mb-4">
                          <span className="text-3xl font-bold text-white">
                            ${product.pricing[0].price}
                          </span>
                          <span className="ml-2 text-gray-400">/ {product.pricing[0].period}</span>
                        </div>
                        <Link 
                          to={`/product/${id}`}
                          className="block bg-purple-600/20 text-purple-300 py-3 px-4 rounded-lg text-center font-medium
                                   group-hover:bg-purple-600 group-hover:text-white transition-all duration-300
                                   relative overflow-hidden"
                        >
                          <span className="relative z-10">View Details</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 
                                      group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>
                      </>
                    ) : (
                      <div className="flex items-center justify-center space-x-2 py-3 text-gray-500">
                        <AlertTriangle className="w-5 h-5" />
                        <span>Coming Soon</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}