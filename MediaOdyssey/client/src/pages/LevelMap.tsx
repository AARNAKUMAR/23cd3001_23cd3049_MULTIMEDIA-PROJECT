import { useState, useRef, useEffect } from 'react';
import { useProgressStore } from '@/store/progressStore';
import { levelsData } from '@shared/levels';
import LevelNode from '@/components/LevelNode';
import LevelModal from '@/components/LevelModal';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const getNodePosition = (index: number) => {
    const isLeft = index % 2 === 0;
    const x = isLeft ? 15 : 85;
    const y = 4 + index * 16;
    return { x, y, isLeft };
};

export default function LevelMap() {
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
    const initialPos = getNodePosition(0);
    const [arinPosition, setArinPosition] = useState({ x: initialPos.x, y: initialPos.y + 8 });
    const [isArinTraveling, setIsArinTraveling] = useState(false);
    const { unlockedLevels, completedLevels, unlockLevel, completeLevel } = useProgressStore();
    const pathRefs = useRef<{ [key: number]: SVGPathElement | null }>({});
    const containerRef = useRef<HTMLDivElement>(null);
    const arinRef = useRef<HTMLDivElement>(null);

    const handleLevelClick = (day: number) => {
        if (unlockedLevels.includes(day)) {
            setSelectedLevel(day);
        }
    };

    const handleCompleteLevel = () => {
        if (selectedLevel) {
            completeLevel(selectedLevel);
            if (selectedLevel < levelsData.length) {
                const pathKey = selectedLevel;
                const pathElement = pathRefs.current[pathKey];

                if (pathElement && arinRef.current) {
                    setIsArinTraveling(true);
                    const length = pathElement.getTotalLength();
                    pathElement.style.strokeDasharray = `${length}`;
                    pathElement.style.strokeDashoffset = `${length}`;

                    const tl = gsap.timeline();
                    const fromPos = getNodePosition(selectedLevel - 1);
                    const toPos = getNodePosition(selectedLevel);

                    tl.fromTo(pathElement,
                        { strokeDashoffset: length, opacity: 0.2, strokeWidth: 4 },
                        {
                            strokeDashoffset: 0,
                            opacity: 1,
                            strokeWidth: 8,
                            duration: 1.8,
                            ease: 'power2.out',
                        }
                    );

                    tl.to(arinPosition, {
                        x: toPos.x,
                        y: toPos.y + 8,
                        duration: 1.5,
                        ease: 'power1.inOut',
                        onUpdate: function () {
                            setArinPosition({ ...this.targets()[0] });
                        },
                    }, '-=1.3');

                    tl.to(pathElement, {
                        strokeWidth: 6,
                        duration: 0.4,
                        onComplete: () => {
                            unlockLevel(selectedLevel + 1);
                            setIsArinTraveling(false);
                        },
                    });
                } else {
                    unlockLevel(selectedLevel + 1);
                }
            }
        }
    };

    useEffect(() => {
        Object.entries(pathRefs.current).forEach(([key, path]) => {
            if (path) {
                const level = parseInt(key);
                const length = path.getTotalLength();
                path.style.strokeDasharray = `${length}`;

                if (unlockedLevels.includes(level + 1)) {
                    gsap.fromTo(path,
                        { strokeDashoffset: length, opacity: 0.2 },
                        {
                            strokeDashoffset: 0,
                            opacity: 1,
                            duration: 1,
                            ease: 'power2.out',
                            delay: level * 0.1
                        }
                    );
                } else {
                    gsap.set(path, { strokeDashoffset: length, opacity: 0.2 });
                }
            }
        });
    }, [unlockedLevels]);

    useEffect(() => {
        if (!isArinTraveling) {
            if (completedLevels.length > 0) {
                const lastCompleted = Math.max(...completedLevels);
                const lastIndex = lastCompleted - 1;
                const pos = getNodePosition(lastIndex);
                setArinPosition({ x: pos.x, y: pos.y + 8 });
            } else {
                const pos = getNodePosition(0);
                setArinPosition({ x: pos.x, y: pos.y + 8 });
            }
        }
    }, [completedLevels, isArinTraveling]);

    const currentLevel = levelsData.find((l) => l.day === selectedLevel);

    return (
        <div className="bg-primary-gradient relative overflow-x-hidden min-h-screen pl-20">
            <div className="absolute inset-0 border-4 border-yellow-600/30 pointer-events-none" />

            <div className="relative z-10 p-4 md:p-8 pb-32">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8 border-b border-yellow-600/30 pb-6">
                        <h1 className="text-2xl md:text-4xl font-display font-bold mb-2 text-yellow-400 tracking-wider">
                            ECHOES FROM TOMORROW: A MEDIA ODYSSEY
                        </h1>
                    </div>

                    <div ref={containerRef} className="relative min-h-[2000px] md:min-h-[2600px] lg:min-h-[3200px] mb-8">
                        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 1000 3500" preserveAspectRatio="xMidYMin meet">
                            <defs>
                                <linearGradient id="goldenPathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="hsl(45, 90%, 55%)" />
                                    <stop offset="50%" stopColor="hsl(45, 95%, 60%)" />
                                    <stop offset="100%" stopColor="hsl(45, 90%, 65%)" />
                                </linearGradient>
                                <filter id="goldenGlow" x="-100%" y="-100%" width="300%" height="300%">
                                    <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                                    <feGaussianBlur stdDeviation="12" result="bigBlur" />
                                    <feMerge>
                                        <feMergeNode in="bigBlur" />
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            {levelsData.map((level, index) => {
                                if (index === levelsData.length - 1) return null;
                                const from = getNodePosition(index);
                                const to = getNodePosition(index + 1);

                                // Line glows golden when level i is completed (connecting level i to level i+1)
                                const isLevelCompleted = completedLevels.includes(level.day);

                                const fromX = (from.x / 100) * 1000;
                                const fromY = (from.y / 100) * 3500;
                                const toX = (to.x / 100) * 1000;
                                const toY = (to.y / 100) * 3500;

                                // Straight line path
                                const pathData = `M ${fromX} ${fromY} L ${toX} ${toY}`;

                                return (
                                    <g key={`energy-path-${level.day}`}>
                                        {/* Background glow layer */}
                                        <path
                                            d={pathData}
                                            fill="none"
                                            stroke={isLevelCompleted ? "url(#goldenPathGradient)" : "#4b5563"}
                                            strokeWidth="20"
                                            strokeLinecap="round"
                                            opacity={isLevelCompleted ? "0.4" : "0.3"}
                                            filter={isLevelCompleted ? "url(#goldenGlow)" : "none"}
                                        />
                                        {/* Main line layer */}
                                        <path
                                            ref={(el) => (pathRefs.current[level.day] = el)}
                                            d={pathData}
                                            fill="none"
                                            stroke={isLevelCompleted ? "url(#goldenPathGradient)" : "#6b7280"}
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            opacity="1"
                                            style={{
                                                filter: isLevelCompleted ? 'drop-shadow(0 0 20px rgba(251, 191, 36, 1))' : 'none',
                                                transition: 'all 0.8s ease-out'
                                            }}
                                        />
                                    </g>
                                );
                            })}
                        </svg>

                        {levelsData.map((level, index) => {
                            const pos = getNodePosition(index);
                            const isUnlocked = unlockedLevels.includes(level.day);
                            const isCompleted = completedLevels.includes(level.day);
                            const isCurrent = !isCompleted && isUnlocked;

                            return (
                                <div
                                    key={level.day}
                                    className="absolute flex items-center"
                                    style={{
                                        left: `${pos.x}%`,
                                        top: `${pos.y}%`,
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                    data-level={level.day}
                                >
                                    {pos.isLeft && (
                                        <div className="text-left mr-2 md:mr-4 min-w-[100px] md:min-w-[140px]">
                                            <p className="text-base md:text-lg lg:text-xl font-bold whitespace-nowrap">
                                                <span className="text-glow-gold glow-gold">Day {level.day}</span> - <span className="text-glow-gold glow-gold">{level.label}</span>
                                            </p>
                                        </div>
                                    )}

                                    <LevelNode
                                        day={level.day}
                                        label={level.label}
                                        icon={level.icon}
                                        isLocked={!isUnlocked}
                                        isCompleted={isCompleted}
                                        isCurrent={isCurrent}
                                        onClick={() => handleLevelClick(level.day)}
                                    />

                                    {!pos.isLeft && (
                                        <div className="text-left ml-2 md:ml-4 min-w-[100px] md:min-w-[140px]">
                                            <p className="text-base md:text-lg lg:text-xl font-bold whitespace-nowrap">
                                                <span className="text-glow-gold glow-gold">Day {level.day}</span> - <span className="text-glow-gold glow-gold">{level.label}</span>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        <motion.div
                            ref={arinRef}
                            className="absolute w-12 h-12 md:w-16 md:h-16 pointer-events-none z-20"
                            style={{
                                left: `${arinPosition.x}%`,
                                top: `${arinPosition.y}%`,
                                transform: 'translate(-50%, -50%)',
                            }}
                            animate={{
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <div className="w-full h-full rounded-full border-4 border-white shadow-lg shadow-warm-gold/50 overflow-hidden">
                                <img
                                    src="/ARIN_ICON.png"
                                    alt="Arin - Time Explorer"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {completedLevels.length === levelsData.length && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center p-8 bg-gradient-to-r from-warm-gold/20 to-vibrant-emerald/20 rounded-2xl border-2 border-warm-gold"
                        >
                            <h2 className="text-3xl font-display font-bold text-warm-gold mb-4">
                                🎉 Journey Complete! 🎉
                            </h2>
                            <p className="text-xl text-gray-300">
                                You've mastered the entire evolution of human communication!
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>

            {currentLevel && (
                <LevelModal
                    level={currentLevel}
                    isOpen={selectedLevel !== null}
                    onClose={() => setSelectedLevel(null)}
                    onComplete={handleCompleteLevel}
                />
            )}
        </div>
    );
}
