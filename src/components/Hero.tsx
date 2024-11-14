import { Shield, MessageCircle, Sparkles, Zap, Lock, Star, Cpu, Gauge } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const glowVariants = {
  initial: { opacity: 0.5, scale: 0.8 },
  animate: { 
    opacity: [0.5, 0.8, 0.5],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const scrollToFeatures = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      const offset = 80;
      const targetPosition = featuresSection.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const stats = [
    { icon: Star, value: '99.9%', label: 'Uptime' },
    { icon: Shield, value: '24/7', label: 'Support' },
    { icon: Cpu, value: '0%', label: 'Performance Impact' },
    { icon: Gauge, value: '1ms', label: 'Response Time' },
  ];

  return (
    <div ref={containerRef} id="home" className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/50 via-gray-900 to-black">
        <motion.div style={{ opacity }} className="absolute inset-0 bg-black opacity-50" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      {/* Animated Glow Effects */}
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className="absolute top-1/4 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"
      />
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className="absolute bottom-1/4 -right-20 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl"
      />

      <motion.div 
        style={{ opacity, scale, y }}
        className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-sm text-purple-300">Premium Gaming Tools</span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            variants={floatingAnimation}
            initial="initial"
            animate="animate"
            className="relative"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 animate-gradient bg-300% pb-2">
              UDP Gaming Tools
            </h1>
            <div className="absolute -inset-x-20 top-1/2 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-20" />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-2xl mx-auto text-xl text-gray-300 leading-relaxed"
          >
            Elevate your gaming experience with our premium tools. 
            Gain the competitive edge with advanced features and undetectable technology.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="https://discord.gg/undetect"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-medium overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ x: '100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.5 }}
              />
              <MessageCircle className="w-5 h-5 mr-2 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10">Join Discord</span>
            </motion.a>

            <motion.a
              href="#features"
              onClick={scrollToFeatures}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center bg-white/5 text-white px-8 py-3 rounded-lg text-lg font-medium 
                       border border-white/10 transition-all duration-300 
                       hover:bg-white/10 hover:border-white/20 overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              <Zap className="w-5 h-5 mr-2 text-purple-400 group-hover:text-purple-300 group-hover:rotate-12 transition-all duration-300" />
              <span className="relative z-10">Explore Features</span>
            </motion.a>
          </motion.div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-purple-500/5 rounded-lg blur-xl group-hover:bg-purple-500/10 transition-all duration-300" />
                <div className="relative p-6 bg-white/5 rounded-lg border border-white/10 group-hover:border-purple-500/20 transition-all duration-300">
                  <stat.icon className="w-6 h-6 text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Feature 
            icon={Shield} 
            title="Undetectable" 
            description="Advanced protection system ensures your safety"
            delay={0}
            gradient="from-purple-500 to-pink-500"
          />
          <Feature 
            icon={Zap} 
            title="High Performance" 
            description="Zero impact on your game's FPS"
            delay={0.1}
            gradient="from-pink-500 to-purple-500"
          />
          <Feature 
            icon={Lock} 
            title="Secure Updates" 
            description="Regular updates and maintenance"
            delay={0.2}
            gradient="from-purple-500 to-pink-500"
          />
        </div>
      </motion.div>
    </div>
  );
}

function Feature({ icon: Icon, title, description, delay, gradient }: { 
  icon: any, 
  title: string, 
  description: string, 
  delay: number,
  gradient: string 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl 
                    group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500" />
      <div className="relative p-8 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm 
                    hover:border-white/20 transition-all duration-500 h-full">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-r ${gradient} group-hover:scale-110 transition-transform duration-500`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="w-12 h-12 rounded-full bg-white/5 group-hover:scale-110 transition-transform duration-500" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>
      </div>
    </motion.div>
  );
}