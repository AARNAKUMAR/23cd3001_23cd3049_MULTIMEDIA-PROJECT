import { useProgressStore } from '@/store/progressStore';
import { levelsData } from '@shared/levels';
import { Link } from 'wouter';
import { ArrowLeft, User, Calendar, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Profile() {
    const {
        completedLevels,
        earnedBadges,
        completedQuizzes,
        quizScores,
    } = useProgressStore();

    const completionPercentage = Math.round((completedLevels.length / levelsData.length) * 100);
    const averageScore = completedQuizzes.length > 0
        ? Math.round(completedQuizzes.reduce((sum, day) => sum + (quizScores[day] || 0), 0) / completedQuizzes.length)
        : 0;

    return (
        <div className="bg-primary-gradient relative overflow-hidden min-h-screen pl-20">
            <div className="absolute inset-0 border-4 border-yellow-600/30 pointer-events-none" />

            <div className="relative z-10 p-4 md:p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl md:text-5xl font-display font-bold text-glow-gold">
                            Profile
                        </h1>
                        <Link href="/map">
                            <Button className="btn-secondary flex items-center gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Map
                            </Button>
                        </Link>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border-2 border-bright-cyan/50 p-8 mb-8"
                    >
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-warm-gold to-golden-amber flex items-center justify-center text-5xl border-4 border-white shadow-lg">
                                👤
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-2">Time Explorer: Arin</h2>
                                <p className="text-gray-400">Journeying through media history</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-4 bg-bright-cyan/10 rounded-lg border border-bright-cyan/30">
                                    <Calendar className="w-6 h-6 text-bright-cyan" />
                                    <div>
                                        <p className="text-sm text-gray-400">Current Day</p>
                                        <p className="text-xl font-bold text-white">
                                            Day {completedLevels.length > 0 ? Math.max(...completedLevels) : 1}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-warm-gold/10 rounded-lg border border-warm-gold/30">
                                    <TrendingUp className="w-6 h-6 text-warm-gold" />
                                    <div>
                                        <p className="text-sm text-gray-400">Journey Progress</p>
                                        <p className="text-xl font-bold text-white">{completionPercentage}%</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-4 bg-vibrant-emerald/10 rounded-lg border border-vibrant-emerald/30">
                                    <Award className="w-6 h-6 text-vibrant-emerald" />
                                    <div>
                                        <p className="text-sm text-gray-400">Badges Earned</p>
                                        <p className="text-xl font-bold text-white">{earnedBadges.length}/14</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                                    <User className="w-6 h-6 text-purple-400" />
                                    <div>
                                        <p className="text-sm text-gray-400">Average Quiz Score</p>
                                        <p className="text-xl font-bold text-white">{averageScore}%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border-2 border-bright-cyan/50 p-8"
                    >
                        <h3 className="text-2xl font-display font-bold text-glow-gold mb-6">
                            Journey Milestones
                        </h3>
                        <div className="space-y-4">
                            {levelsData.slice(0, 5).map((level) => {
                                const isCompleted = completedLevels.includes(level.day);
                                return (
                                    <div
                                        key={level.day}
                                        className={`p-4 rounded-lg border-2 transition-all ${isCompleted
                                                ? 'bg-vibrant-emerald/10 border-vibrant-emerald/50'
                                                : 'bg-slate-800/50 border-slate-700'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-3xl">{level.icon}</span>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-white">
                                                    Day {level.day}: {level.label}
                                                </h4>
                                                <p className="text-sm text-gray-400">{level.description}</p>
                                            </div>
                                            {isCompleted && (
                                                <div className="text-vibrant-emerald font-bold">✓</div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
