import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Home() {
    return (
        <div className="bg-black min-h-screen pl-20 flex items-center justify-center relative overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-yellow-600/30 pointer-events-none" />

            {/* Starfield effect */}
            <div className="absolute inset-0 opacity-30">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`,
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-4xl px-8 relative z-10"
            >
                <h1 className="text-5xl md:text-7xl font-display font-bold mb-4 tracking-wider" style={{
                    color: '#fbbf24',
                    textShadow: '0 0 20px rgba(251, 191, 36, 0.5), 0 0 40px rgba(251, 191, 36, 0.3)',
                }}>
                    ECHOES FROM TOMORROW
                </h1>
                <h2 className="text-xl md:text-2xl text-gray-300 mb-12 tracking-widest uppercase">
                    A Media Odyssey
                </h2>

                <Link href="/map">
                    <Button className="border-2 border-cyan-400 text-cyan-400 bg-transparent hover:bg-cyan-400/10 rounded-full px-12 py-4 text-lg font-semibold mb-8 transition-all">
                        START JOURNEY
                    </Button>
                </Link>

                <div className="flex gap-6 justify-center items-center mt-8">
                    <Link href="/progress">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center cursor-pointer shadow-lg"
                            title="View Profile & Progress"
                        >
                            <span className="text-2xl">🎨</span>
                        </motion.div>
                    </Link>
                    <Link href="/map">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center cursor-pointer shadow-lg"
                            title="Start Journey"
                        >
                            <span className="text-2xl">📜</span>
                        </motion.div>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
