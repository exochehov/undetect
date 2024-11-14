import { useState, useRef, useEffect } from 'react';
import { X, Minus, Shield, ArrowUpCircle, Sparkles, Lock, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PurchaseLoader from './PurchaseLoader';

interface Position {
  x: number;
  y: number;
}

interface Product {
  name: string;
  periods: {
    [key: string]: number;
  };
}

const menuVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: {
      duration: 0.2
    }
  }
};

export default function CheatMenu() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState<Position>({ x: window.innerWidth - 340, y: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [selectedProduct, setSelectedProduct] = useState('eft-full');
  const [selectedPeriod, setSelectedPeriod] = useState('day');
  const [isPurchasing, setIsPurchasing] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);

  const products: { [key: string]: Product } = {
    'apex': {
      name: 'Apex External',
      periods: {
        'day': 3.0,
        '3day': 5.0,
        'week': 15.0,
        'month': 30.0,
      }
    },
    'eft-full': {
      name: 'EFT Full',
      periods: {
        '2h': 1.00,
        'day': 14.99,
        'week': 49.99,
        'month': 149.99,
      }
    }
  };

  const periodLabels: { [key: string]: string } = {
    '2h': '2 Hours',
    'day': '24 Hours',
    '3day': '3 Days',
    'week': '7 Days',
    'month': '30 Days'
  };

  const handlePurchase = () => {
    setIsPurchasing(true);
    setTimeout(() => {
      window.location.href = 'https://undetect.sellsn.io/explore';
    }, 2000);
  };

  useEffect(() => {
    if (!isDragging) {
      const timer = setTimeout(() => {
        setPosition({ x: window.innerWidth - 340, y: 80 });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isDragging]);

  useEffect(() => {
    const handleResize = () => {
      if (!isDragging) {
        setPosition({ x: window.innerWidth - 340, y: 80 });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (menuRef.current) {
      setIsDragging(true);
      const rect = menuRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = Math.max(64, e.clientY - dragOffset.y);
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  if (isPurchasing) return <PurchaseLoader />;

  if (!isOpen) {
    return (
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-all z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Shield className="h-6 w-6" />
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      {isMinimized ? (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-t-lg shadow-lg z-40"
          style={{ left: position.x }}
          onClick={() => setIsMinimized(false)}
        >
          <ArrowUpCircle className="h-6 w-6" />
        </motion.div>
      ) : (
        <motion.div
          ref={menuRef}
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed w-80 bg-black/80 backdrop-blur-md rounded-lg shadow-2xl border border-purple-500/20 z-40"
          style={{
            left: position.x,
            top: position.y,
            cursor: isDragging ? 'grabbing' : 'auto',
          }}
        >
          {/* Header */}
          <div
            className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-3 rounded-t-lg flex items-center justify-between cursor-grab"
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-purple-400" />
              <span className="ml-2 font-bold text-white">UDP Menu</span>
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMinimized(true)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Minus className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Product Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Product
              </label>
              <div className="relative">
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full bg-white/5 text-white rounded-lg p-2 border border-white/10 focus:border-purple-500 
                           focus:ring-1 focus:ring-purple-500 transition-colors appearance-none"
                >
                  {Object.entries(products).map(([key, { name }]) => (
                    <option key={key} value={key} className="bg-gray-900">
                      {name}
                    </option>
                  ))}
                </select>
                <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none transform rotate-90" />
              </div>
            </div>

            {/* Period Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Subscription Period
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(products[selectedProduct].periods).map(([period, price]) => (
                  <motion.button
                    key={period}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPeriod(period)}
                    className={`p-3 rounded-lg border transition-all ${
                      selectedPeriod === period
                        ? 'border-purple-500 bg-purple-500/20 text-white'
                        : 'border-white/10 hover:border-purple-500/50 text-gray-400'
                    }`}
                  >
                    <div className="text-sm">{periodLabels[period]}</div>
                    <div className="text-lg font-bold">${price}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Purchase Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePurchase}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-medium
                       hover:shadow-lg hover:shadow-purple-500/20 transition-all relative group overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 mr-2" />
                Purchase Now
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 
                           group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            {/* Status Indicator */}
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
              <Lock className="w-4 h-4" />
              <span>Secure Payment</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}