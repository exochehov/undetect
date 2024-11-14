import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check, Play, MonitorX } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import PurchaseLoader from './PurchaseLoader';

const periodLabels: { [key: string]: string } = {
  '2h': '2 Hours',
  'day': '24 Hours',
  'week': '7 Days',
  'month': '30 Days'
};

export default function ProductPage({ setLoading }: { setLoading: (loading: boolean) => void }) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [activeTab, setActiveTab] = useState('aimbot');
  const [isPurchasing, setIsPurchasing] = useState(false);
  
  const product = products[id as keyof typeof products];

  useEffect(() => {
    if (!product) {
      navigate('/');
      return;
    }

    window.scrollTo(0, 0);
    if (product.pricing && product.pricing.length > 0) {
      setSelectedPeriod(product.pricing[0].period);
    }
    setLoading(true);
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      setLoading(false);
    };
  }, [id, setLoading, product, navigate]);

  const handlePurchase = () => {
    setIsPurchasing(true);
    setTimeout(() => {
      window.location.href = 'https://undetect.sellsn.io/explore';
    }, 2000);
  };

  if (!product) return null;
  if (isPurchasing) return <PurchaseLoader />;

  const nextImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const renderFeatures = (features: any) => {
    if (!features) return null;

    if (Array.isArray(features)) {
      return (
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-300">
              <Check className="w-5 h-5 text-purple-500 mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      );
    }

    return Object.entries(features).map(([subCategory, subFeatures]) => (
      <div key={subCategory} className="mb-6">
        <h4 className="text-lg font-medium text-purple-400 mb-3">
          {subCategory.charAt(0).toUpperCase() + subCategory.slice(1)}
        </h4>
        {renderFeatures(subFeatures)}
      </div>
    ));
  };

  const hasValidPricing = product.pricing && product.pricing.length > 0;

  return (
    <div className="pt-20 min-h-screen bg-gradient-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Image Slider */}
          <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
            {showVideo ? (
              <iframe
                className="w-full h-full"
                src={product.videoUrl}
                title="Product Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    isTransitioning ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/75 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/75 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
                {product.videoUrl && (
                  <button
                    onClick={() => setShowVideo(true)}
                    className="absolute bottom-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-700 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    <span>Watch Video</span>
                  </button>
                )}
              </>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-white">{product.name}</h1>
            <p className="text-gray-400">{product.description}</p>

            {/* System Requirements */}
            {product.systemRequirements && (
              <div className="bg-gray-900/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">System Requirements</h3>
                <ul className="space-y-2">
                  {product.systemRequirements.map((req, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-purple-500 mr-2" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pricing */}
            {hasValidPricing ? (
              <div className="bg-gray-900/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Select Period</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.pricing.map(({ period, price }) => (
                    <button
                      key={period}
                      onClick={() => setSelectedPeriod(period)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedPeriod === period
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-gray-700 hover:border-purple-500/50'
                      }`}
                    >
                      <div className="text-white font-semibold">{periodLabels[period]}</div>
                      <div className="text-2xl font-bold text-white">${price}</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-gray-900/50 rounded-xl p-6">
                <div className="flex items-center justify-center space-x-2 text-gray-400">
                  <MonitorX className="w-6 h-6" />
                  <span>Currently Unavailable</span>
                </div>
              </div>
            )}

            {/* Purchase Button */}
            {hasValidPricing && (
              <button
                onClick={handlePurchase}
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium 
                         transform hover:scale-105 transition-all duration-300 
                         hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/20"
              >
                Purchase Now
              </button>
            )}
          </div>
        </motion.div>

        {/* Features */}
        <div className="mt-16">
          <div className="border-b border-gray-800">
            <nav className="flex space-x-8">
              {Object.keys(product.featureCategories).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 relative ${
                    activeTab === tab
                      ? 'text-purple-500'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-gray-900/50 rounded-xl p-6"
          >
            {renderFeatures(product.featureCategories[activeTab as keyof typeof product.featureCategories])}
          </motion.div>
        </div>
      </div>
    </div>
  );
}