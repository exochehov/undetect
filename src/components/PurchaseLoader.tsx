import { motion } from 'framer-motion';
import { Shield, ExternalLink } from 'lucide-react';

export default function PurchaseLoader() {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center text-center max-w-md mx-auto p-8">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Shield className="h-16 w-16 text-purple-500" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 space-y-4"
        >
          <h2 className="text-2xl font-bold text-white">Redirecting to Payment</h2>
          <p className="text-gray-400">
            You are being redirected to our secure payment platform...
          </p>
          <div className="flex items-center justify-center space-x-2 text-purple-500">
            <ExternalLink className="w-5 h-5" />
            <span>undetect.sellsn.io</span>
          </div>
        </motion.div>

        <div className="mt-8 flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ 
                duration: 1, 
                repeat: Infinity, 
                delay: i * 0.2 
              }}
              className="w-3 h-3 bg-purple-500 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}