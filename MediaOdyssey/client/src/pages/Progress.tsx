import { useProgressStore } from '@/store/progressStore';
import { badgesData, levelsData } from '@shared/levels';
import BadgeCard from '@/components/BadgeCard';
import ProgressBar from '@/components/ProgressBar';
import { Link } from 'wouter';
import { ArrowLeft, Trophy, Star, Target, Award, User, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Progress() {
    const {
        completedLevels,
        earnedBadges,
        completedQuizzes,
        quizScores,
        quizAttempts,
    } = useProgressStore();

    const completionPercentage = Math.round((completedLevels.length / levelsData.length) * 100);
    const totalQuizzes = levelsData.length;
    const completedQuizzesCount = completedQuizzes.length;
    const quizCompletionPercentage = Math.round((completedQuizzesCount / totalQuizzes) * 100);
    const averageQuizScore = completedQuizzes.length > 0
        ? Math.round(completedQuizzes.reduce((sum, day) => sum + (quizScores[day] || 0), 0) / completedQuizzes.length)
        : 0;

    const currentDay = completedLevels.length > 0 ? Math.max(...completedLevels) : 1;

    const updatedBadges = badgesData.map((badge, index) => {
        const dayNumber = index + 1;
        const isUnlocked = earnedBadges.includes(`badge-${dayNumber}`);
        return { ...badge, unlocked: isUnlocked };
    });

    // Calculate level completion circles
    const levelCircles = Array.from({ length: 14 }, (_, i) => ({
        day: i + 1,
        completed: completedLevels.includes(i + 1)
    }));

    return (
        <div className="bg-black relative overflow-hidden min-h-screen pl-20">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-purple-900/20 pointer-events-none" />

            <div className="relative z-10 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-display font-bold mb-2" style={{
                                color: '#fbbf24',
                                textShadow: '0 0 20px rgba(251, 191, 36, 0.5)',
                            }}>
                                EXPLORER PROFILE & PROGRESS
                            </h1>
                            <p className="text-cyan-400 text-sm uppercase tracking-widest">Your Media Odyssey Journey Status</p>
                        </div>
                        <Link href="/map">
                            <Button className="border-2 border-cyan-400 text-cyan-400 bg-transparent hover:bg-cyan-400/10 rounded-md px-6 py-2">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Map
                            </Button>
                        </Link>
                    </div>

                    {/* Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-900/90 backdrop-blur-xl rounded-2xl border-2 border-cyan-500/50 p-6 md:p-8 mb-8"
                    >
                        <div className="flex items-center gap-6 mb-6">
                            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-cyan-400 shadow-lg shadow-cyan-400/50">
                                <img
                                    src="/ARIN_ICON.png"
                                    alt="Arin - Time Explorer"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-3xl font-bold text-white mb-1">Time Explorer: Arin</h2>
                                <p className="text-cyan-400 text-sm uppercase tracking-wide mb-2">Media Odyssey Traveler</p>
                                <div className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-400" />
                                    <span className="text-yellow-400 text-sm font-semibold">
                                        Day {currentDay} Explorer
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-slate-800/50 rounded-xl p-5 border border-cyan-500/30">
                                <div className="flex items-center gap-3 mb-3">
                                    <Target className="w-6 h-6 text-cyan-400" />
                                    <h3 className="font-semibold text-cyan-400 text-sm uppercase tracking-wide">Journey Progress</h3>
                                </div>
                                <div className="text-4xl font-bold text-cyan-400 mb-2">
                                    {completedLevels.length}
                                </div>
                                <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">
                                    Levels Completed
                                </p>
                                <div className="text-sm text-gray-300 mb-2">{completionPercentage}% Complete</div>
                                <div className="relative flex items-center">
                                    {levelCircles.map((level, index) => (
                                        <div key={level.day} className="flex items-center">
                                            <div
                                                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border-2 relative z-10 ${level.completed
                                                    ? 'bg-cyan-500 border-cyan-400 text-white'
                                                    : 'bg-slate-700 border-slate-600 text-gray-500'
                                                    }`}
                                            >
                                                {level.day}
                                            </div>
                                            {index < levelCircles.length - 1 && (
                                                <div className={`w-2 h-1 transition-all duration-500 ${level.completed
                                                    ? 'bg-yellow-400'
                                                    : 'bg-slate-600'
                                                    }`}
                                                    style={{
                                                        boxShadow: level.completed ? '0 0 8px rgba(251, 191, 36, 0.8)' : 'none'
                                                    }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-slate-800/50 rounded-xl p-5 border border-yellow-500/30">
                                <div className="flex items-center gap-3 mb-3">
                                    <Trophy className="w-6 h-6 text-yellow-400" />
                                    <h3 className="font-semibold text-yellow-400 text-sm uppercase tracking-wide">Completion Rate</h3>
                                </div>
                                <div className="text-4xl font-bold text-yellow-400 mb-2">
                                    {completionPercentage}%
                                </div>
                                <p className="text-xs text-gray-400 uppercase tracking-wide">
                                    Journey Complete
                                </p>
                            </div>

                            <div className="bg-slate-800/50 rounded-xl p-5 border border-purple-500/30">
                                <div className="flex items-center gap-3 mb-3">
                                    <BookOpen className="w-6 h-6 text-purple-400" />
                                    <h3 className="font-semibold text-purple-400 text-sm uppercase tracking-wide">Quiz Performance</h3>
                                </div>
                                <div className="text-4xl font-bold text-purple-400 mb-2">
                                    {completedQuizzesCount}
                                </div>
                                <p className="text-xs text-gray-400 uppercase tracking-wide">
                                    Quizzes Completed
                                </p>
                            </div>

                            <div className="bg-slate-800/50 rounded-xl p-5 border border-emerald-500/30">
                                <div className="flex items-center gap-3 mb-3">
                                    <Award className="w-6 h-6 text-emerald-400" />
                                    <h3 className="font-semibold text-emerald-400 text-sm uppercase tracking-wide">Badges Earned</h3>
                                </div>
                                <div className="text-4xl font-bold text-emerald-400 mb-2">
                                    {earnedBadges.length}
                                </div>
                                <p className="text-xs text-gray-400 uppercase tracking-wide">
                                    Of 14 Total
                                </p>
                                <div className="flex gap-2 mt-3">
                                    {updatedBadges.slice(0, 3).map((badge) => (
                                        <div key={badge.id} className="w-8 h-8">
                                            {badge.unlocked ? (
                                                <img src={badge.imagePath} alt={badge.name} className="w-full h-full object-contain" />
                                            ) : (
                                                <div className="w-full h-full rounded-full bg-slate-700 border border-slate-600" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Achievement Badges Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-slate-900/90 backdrop-blur-xl rounded-2xl border-2 border-cyan-500/50 p-6 md:p-8"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                <h2 className="text-2xl font-display font-bold text-yellow-400 uppercase tracking-wide">
                                    Achievement Badges
                                </h2>
                            </div>
                            <div className="text-emerald-400 font-bold text-lg">
                                {earnedBadges.length} / 14 Earned
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {updatedBadges.map((badge) => (
                                <BadgeCard key={badge.id} badge={badge} />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
