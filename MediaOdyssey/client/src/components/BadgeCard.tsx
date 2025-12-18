import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import type { Badge } from '@shared/levels';

interface BadgeCardProps {
    badge: Badge;
}

export default function BadgeCard({ badge }: BadgeCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={badge.unlocked ? { scale: 1.05 } : {}}
            className={`
        relative p-4 rounded-xl border-2 transition-all
        ${badge.unlocked
                    ? 'bg-gradient-to-br from-bright-cyan/10 to-purple-500/10 border-bright-cyan shadow-lg shadow-bright-cyan/20'
                    : 'bg-slate-800/50 border-slate-700 opacity-50 grayscale'
                }
      `}
        >
            <div className="aspect-square flex items-center justify-center mb-3 relative">
                {badge.unlocked ? (
                    <img
                        src={badge.imagePath}
                        alt={badge.name}
                        className="w-full h-full object-contain"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full">
                        <Lock className="w-12 h-12 text-gray-500" />
                    </div>
                )}
            </div>

            <div className="text-center">
                <h3 className={`font-bold mb-1 ${badge.unlocked ? 'text-white' : 'text-gray-500'}`}>
                    {badge.name}
                </h3>
                <p className={`text-xs ${badge.unlocked ? 'text-gray-300' : 'text-gray-600'}`}>
                    {badge.description}
                </p>
            </div>

            {badge.unlocked && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-vibrant-emerald rounded-full border-2 border-white flex items-center justify-center shadow-lg"
                >
                    <span className="text-white text-sm font-bold">✓</span>
                </motion.div>
            )}
        </motion.div>
    );
}
