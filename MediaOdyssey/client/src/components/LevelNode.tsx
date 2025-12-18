import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { memo } from 'react';

interface LevelNodeProps {
    day: number;
    label: string;
    icon: string;
    isLocked: boolean;
    isCompleted: boolean;
    isCurrent: boolean;
    onClick: () => void;
}

const LevelNode = memo(function LevelNode({
    day,
    label,
    icon,
    isLocked,
    isCompleted,
    isCurrent,
    onClick,
}: LevelNodeProps) {
    return (
        <motion.button
            onClick={!isLocked ? onClick : undefined}
            className={`
        relative flex flex-col items-center gap-3 group focus-cyan
        ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}
      `}
            whileHover={!isLocked ? { scale: 1.05 } : {}}
            whileTap={!isLocked ? { scale: 0.95 } : {}}
            data-testid={`node-level-${day}`}
        >
            <div className="relative">
                {/* Outer glow ring */}
                {!isLocked && (
                    <motion.div
                        className={`
              absolute inset-0 rounded-full
              ${isCompleted
                                ? 'ring-4 ring-vibrant-emerald/60'
                                : isCurrent
                                    ? 'ring-4 ring-warm-gold/80'
                                    : 'ring-4 ring-bright-cyan/50'
                            }
            `}
                        style={{ transform: 'scale(1.3)' }}
                        animate={{
                            opacity: [0.4, 0.8, 0.4],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                )}

                {/* Main circular node */}
                <div
                    className={`
            relative w-20 h-20 md:w-24 md:h-24 rounded-full 
            flex items-center justify-center border-4 
            transition-all duration-300 overflow-hidden
            ${isLocked
                            ? 'bg-gray-800/50 border-gray-600/50 opacity-40 grayscale'
                            : isCompleted
                                ? 'bg-gradient-to-br from-vibrant-emerald/20 to-vibrant-emerald/10 border-vibrant-emerald shadow-lg shadow-vibrant-emerald/30'
                                : isCurrent
                                    ? 'bg-gradient-to-br from-warm-gold/30 to-golden-amber/20 border-warm-gold shadow-lg shadow-warm-gold/40'
                                    : 'bg-gradient-to-br from-bright-cyan/20 to-deep-teal/10 border-bright-cyan shadow-lg shadow-bright-cyan/30'
                        }
          `}
                >
                    {/* Icon or lock */}
                    {isLocked ? (
                        <Lock className="w-8 h-8 md:w-10 md:h-10 text-gray-500 relative z-10" />
                    ) : (
                        <span className="text-3xl md:text-4xl relative z-10" aria-label={label}>
                            {icon}
                        </span>
                    )}
                </div>

                {/* Completion checkmark */}
                {isCompleted && !isLocked && (
                    <motion.div
                        className="absolute -bottom-2 -right-2 w-8 h-8 bg-vibrant-emerald rounded-full border-3 border-space-navy flex items-center justify-center shadow-lg shadow-vibrant-emerald/50"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                        <span className="text-sm text-white font-bold">✓</span>
                    </motion.div>
                )}

                {/* Current level star */}
                {isCurrent && !isLocked && !isCompleted && (
                    <motion.div
                        className="absolute -top-3 -right-3 w-7 h-7 bg-warm-gold rounded-full border-2 border-space-navy flex items-center justify-center shadow-lg shadow-warm-gold/50"
                        animate={{
                            scale: [1, 1.3, 1],
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <span className="text-xs">⭐</span>
                    </motion.div>
                )}
            </div>

            {/* Day title with golden glow */}
            <div className="text-center">
                <motion.p
                    className={`
            font-mono tracking-wider
            ${isLocked ? 'glow-gold-text-locked grayscale' : 'glow-gold-text'}
          `}
                    animate={{
                        opacity: isLocked ? 0.4 : [0.8, 1, 0.8],
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    DAY {day}
                </motion.p>
            </div>
        </motion.button>
    );
});

export default LevelNode;
