import { motion } from 'framer-motion';
import {
  Shield,
  AlertTriangle,
  RefreshCcw,
  Lock,
  Loader2,
  Activity,
  Clock,
  Sparkles,
  Users,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface StatusCard {
  id: string;
  name: string;
  status: 'undetected' | 'detected' | 'testing' | 'updating' | 'closed';
  lastUpdated: string;
  activeUsers?: number;
  lastCountUpdate?: string;
}

const statuses: StatusCard[] = [
  {
    id: 'eft-full',
    name: 'EFT External',
    status: 'undetected',
    lastUpdated: '11.06.2024 14:57',
    activeUsers: 1247,
    lastCountUpdate: '11.14.2024 23:59',
  },
  {
    id: 'apex',
    name: 'Apex External',
    status: 'testing',
    lastUpdated: '11.13.2024 17:38',
    activeUsers: 78,
    lastCountUpdate: '11.14.2024 23:59',
  },
  {
    id: 'fortnite',
    name: 'Fortnite',
    status: 'testing',
    lastUpdated: '-',
    activeUsers: 3,
    lastCountUpdate: '11.14.2024 23:59',
  },
  {
    id: 'rust',
    name: 'Rust External',
    status: 'closed',
    lastUpdated: '1h ago',
  },
  { 
    id: 'valorant', 
    name: 'Valorant', 
    status: 'closed', 
    lastUpdated: '2h ago' 
  },
  { 
    id: 'pubg', 
    name: 'PUBG', 
    status: 'closed', 
    lastUpdated: '10m ago' 
  },
];

const statusConfig = {
  undetected: {
    icon: Shield,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    glowColor: 'shadow-green-500/20',
    label: 'Undetected',
    gradient: 'from-green-500 to-emerald-500',
  },
  detected: {
    icon: AlertTriangle,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    glowColor: 'shadow-red-500/20',
    label: 'Detected',
    gradient: 'from-red-500 to-orange-500',
  },
  testing: {
    icon: Loader2,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    glowColor: 'shadow-blue-500/20',
    label: 'Testing',
    gradient: 'from-blue-500 to-cyan-500',
  },
  updating: {
    icon: RefreshCcw,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
    glowColor: 'shadow-yellow-500/20',
    label: 'Updating',
    gradient: 'from-yellow-500 to-amber-500',
  },
  closed: {
    icon: Lock,
    color: 'text-gray-500',
    bgColor: 'bg-gray-500/10',
    borderColor: 'border-gray-500/20',
    glowColor: 'shadow-gray-500/20',
    label: 'Closed',
    gradient: 'from-gray-500 to-slate-500',
  },
};

const iconAnimation = {
  undetected: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  detected: {
    rotate: [0, 15, -15, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  testing: {
    rotate: 360,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear"
    }
  },
  updating: {
    rotate: 360,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear"
    }
  },
  closed: {
    scale: [1, 0.9, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function StatusPage() {
  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-dark">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
            System Status
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6"></div>
          <div className="flex items-center justify-center space-x-8">
            {Object.entries(statusConfig).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <value.icon className={`w-4 h-4 ${value.color}`} />
                <span className="text-gray-400 text-sm">{value.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {statuses.map((item, index) => {
            const config = statusConfig[item.status];
            const Icon = config.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group relative"
              >
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-5 rounded-xl blur-xl 
                             group-hover:opacity-10 transition-all duration-500`} />

                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden
                             group-hover:border-white/20 transition-all duration-500">
                  {/* Header */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <motion.div 
                          animate={iconAnimation[item.status]}
                          className={`p-3 rounded-xl bg-gradient-to-r ${config.gradient}
                                  group-hover:scale-110 transition-transform duration-500`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </motion.div>
                        <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                          {item.name}
                        </h3>
                      </div>
                      <motion.div 
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className={`px-3 py-1 rounded-full text-sm ${config.color} ${config.bgColor} border ${config.borderColor}`}
                      >
                        {config.label}
                      </motion.div>
                    </div>

                    <div className="space-y-4">
                      {/* Last Update */}
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>Last updated: {item.lastUpdated}</span>
                      </div>

                      {/* Active Users */}
                      {item.activeUsers && (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-gray-400">
                            <Users className="w-4 h-4" />
                            <span>{item.activeUsers.toLocaleString()} active users</span>
                          </div>
                          {item.lastCountUpdate && (
                            <div className="flex items-center space-x-2 text-gray-500 text-xs">
                              <Activity className="w-3 h-3" />
                              <span>Count updated {item.lastCountUpdate}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  {item.status !== 'closed' && (
                    <div className="p-6 bg-black/20 border-t border-white/5">
                      <Link
                        to={`/product/${item.id}`}
                        className="block text-center py-2 px-4 rounded-lg bg-purple-600/20 text-purple-400 
                                 hover:bg-purple-600 hover:text-white transition-all duration-300 
                                 group-hover:shadow-lg group-hover:shadow-purple-500/20"
                      >
                        View Details
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}