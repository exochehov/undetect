import { ShieldCheck, Crosshair, Eye, Zap, Target, Crown, Cpu, Radar } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    icon: Eye,
    title: "Advanced ESP",
    description: "See through walls with customizable filters and real-time information display",
    gradient: "from-purple-500 to-pink-500",
    details: ["Player Position", "Health Status", "Equipment Info", "Distance Tracking"]
  },
  {
    icon: Target,
    title: "Precision Aimbot",
    description: "State-of-the-art targeting system with customizable parameters",
    gradient: "from-pink-500 to-purple-500",
    details: ["Smart Targeting", "Customizable FOV", "Smooth Aim", "Prediction System"]
  },
  {
    icon: ShieldCheck,
    title: "Undetectable",
    description: "Advanced protection system keeps your account safe",
    gradient: "from-purple-500 to-pink-500",
    details: ["HWID Spoofer", "Memory Protection", "Signature Bypass", "Auto-Updates"]
  },
  {
    icon: Radar,
    title: "Radar System",
    description: "Real-time position tracking and movement prediction",
    gradient: "from-pink-500 to-purple-500",
    details: ["2D Radar", "Sound ESP", "Movement Tracking", "Team Positions"]
  },
  {
    icon: Cpu,
    title: "Performance",
    description: "Zero impact on your game's performance",
    gradient: "from-purple-500 to-pink-500",
    details: ["No FPS Drop", "Low Memory Usage", "Optimized Code", "Smooth Experience"]
  },
  {
    icon: Crown,
    title: "Premium Support",
    description: "24/7 customer support and regular updates",
    gradient: "from-pink-500 to-purple-500",
    details: ["Discord Support", "Video Guides", "Regular Updates", "Priority Service"]
  }
];

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div id="features" className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />

      <motion.div
        ref={containerRef}
        style={{ opacity }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
            Advanced Features
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6" />
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience gaming excellence with our comprehensive suite of premium features
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl 
                           group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500" />
              
              <div className="relative p-8 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm 
                           hover:border-white/20 transition-all duration-500">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} 
                                group-hover:scale-110 transition-transform duration-500`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <motion.div 
                    style={{ y }}
                    className="w-12 h-12 rounded-full bg-white/5 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>

                <div className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center space-x-2 text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300"
                    >
                      <div className="w-1 h-1 rounded-full bg-purple-500" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}