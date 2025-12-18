import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlayCircle, Trophy, Lock, Lightbulb, Award } from 'lucide-react';
import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { Level } from '@shared/levels';
import { useProgressStore } from '@/store/progressStore';
import { quizzesData } from '@shared/quizzes';
import QuizComponent from './quiz/QuizComponent';
import QuizResults from './quiz/QuizResults';

interface LevelModalProps {
    level: Level | null;
    isOpen: boolean;
    onClose: () => void;
    onComplete: () => void;
}

export default function LevelModal({ level, isOpen, onClose, onComplete }: LevelModalProps) {
    const [activeTab, setActiveTab] = useState<'overview' | 'facts' | 'quiz'>('overview');
    const [showQuiz, setShowQuiz] = useState(false);
    const [quizScore, setQuizScore] = useState<number | null>(null);
    const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([]);
    const { completedLevels, completeQuiz, startQuiz } = useProgressStore();

    const handleComplete = useCallback(() => {
        onComplete();
        setActiveTab('overview');
        setShowQuiz(false);
        setQuizScore(null);
        onClose();
    }, [onComplete, onClose]);

    const isLevelCompleted = useMemo(() => {
        return level ? completedLevels.includes(level.day) : false;
    }, [level, completedLevels]);

    const quiz = useMemo(() => {
        return level ? quizzesData.find(q => q.day === level.day) : null;
    }, [level]);

    const handleStartQuiz = useCallback(() => {
        if (quiz) {
            startQuiz(quiz.day, quiz.questions.length, quiz.timeLimit);
            setShowQuiz(true);
            setQuizScore(null);
        }
    }, [quiz, startQuiz]);

    const handleQuizComplete = useCallback((score: number, answers: (number | null)[]) => {
        if (quiz) {
            completeQuiz(quiz.day, score);
            setQuizScore(score);
            setQuizAnswers(answers);
            setShowQuiz(false);
        }
    }, [quiz, completeQuiz]);

    const handleQuizExit = useCallback(() => {
        setShowQuiz(false);
        setActiveTab('quiz');
    }, []);

    const handleTryAgain = useCallback(() => {
        setQuizScore(null);
        setQuizAnswers([]);
        handleStartQuiz();
    }, [handleStartQuiz]);

    if (!level) return null;

    const funFacts = level.funFacts || [
        `Day ${level.day} represents a pivotal moment in communication history.`,
        `The ${level.label} era transformed how humans share information.`,
        `This period laid the foundation for modern communication methods.`,
    ];

    // If quiz is active, show full-screen quiz
    if (showQuiz && quiz) {
        return <QuizComponent quiz={quiz} onComplete={handleQuizComplete} onExit={handleQuizExit} />;
    }

    // If quiz results are showing
    if (quizScore !== null && quiz) {
        return <QuizResults quiz={quiz} score={quizScore} answers={quizAnswers} onTryAgain={handleTryAgain} onClose={() => { setQuizScore(null); setActiveTab('overview'); }} />;
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl w-[95vw] max-h-[90vh] overflow-y-auto bg-black border-2 border-cyan-500/50 rounded-lg backdrop-blur-xl shadow-2xl shadow-cyan-500/20">
                <DialogTitle className="sr-only">Day {level.day}: {level.label}</DialogTitle>

                <motion.div
                    className="space-y-4 p-4 md:p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header */}
                    <div className="flex items-center gap-4 pb-4 border-b border-cyan-500/30">
                        <motion.div
                            className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-3xl border-2 border-cyan-400"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                        >
                            {level.icon}
                        </motion.div>
                        <div className="flex-1">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-400 mb-1">
                                Day {level.day}: {level.label}
                            </h2>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                                <span className="text-cyan-400 text-xs font-mono uppercase tracking-wider">
                                    MEDIA EVOLUTION TIMELINE
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 border-b border-cyan-500/20">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`px-6 py-3 font-semibold transition-all ${activeTab === 'overview'
                                ? 'text-cyan-400 bg-cyan-500/10 rounded-t-lg'
                                : 'text-gray-400 hover:text-cyan-400'
                                }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('facts')}
                            className={`px-6 py-3 font-semibold transition-all flex items-center gap-2 ${activeTab === 'facts'
                                ? 'text-yellow-400 bg-yellow-500/10 rounded-t-lg'
                                : 'text-gray-400 hover:text-yellow-400'
                                }`}
                        >
                            <Lightbulb className="w-4 h-4" />
                            Fun Facts
                        </button>
                        <button
                            onClick={() => setActiveTab('quiz')}
                            className={`px-6 py-3 font-semibold transition-all flex items-center gap-2 ${activeTab === 'quiz'
                                ? 'text-emerald-400 bg-emerald-500/10 rounded-t-lg'
                                : 'text-gray-400 hover:text-emerald-400'
                                }`}
                        >
                            <Award className="w-4 h-4" />
                            Quiz Challenge
                        </button>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'overview' && (
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Left Column - Documentation */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                                    <h3 className="text-lg font-bold text-cyan-400 uppercase tracking-wide">Era Overview</h3>
                                </div>
                                <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4">
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        {level.description}
                                    </p>
                                </div>

                                {/* Timeline Position */}
                                <div className="mt-6">
                                    <h3 className="text-cyan-400 text-sm font-bold mb-3 uppercase tracking-wide">Timeline Position</h3>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold border-2 border-cyan-400">
                                            {level.day}
                                        </div>
                                        <div className="flex-1 h-1 bg-gradient-to-r from-cyan-500 to-cyan-500/20 rounded-full relative">
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                                                14 Eras
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Video */}
                            {level.videoUrl && (
                                <div className="space-y-3">
                                    <div className="aspect-video bg-black rounded-lg overflow-hidden border-2 border-cyan-500/30 shadow-lg shadow-cyan-500/20">
                                        <video
                                            controls
                                            className="w-full h-full"
                                            src={level.videoUrl}
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'facts' && (
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 mb-4">
                                <Lightbulb className="w-5 h-5 text-yellow-400" />
                                <h3 className="text-lg font-bold text-yellow-400 uppercase tracking-wide">Fascinating Facts</h3>
                            </div>
                            <div className="space-y-3">
                                {funFacts.map((fact, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="p-4 bg-yellow-500/5 rounded-lg border-l-4 border-yellow-400 flex items-start gap-3"
                                    >
                                        <span className="text-yellow-400 font-bold text-lg">●</span>
                                        <p className="text-gray-300 text-sm flex-1">{fact}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'quiz' && quiz && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <Award className="w-5 h-5 text-emerald-400" />
                                <h3 className="text-lg font-bold text-emerald-400 uppercase tracking-wide">{quiz.title}</h3>
                            </div>
                            <p className="text-gray-300 text-sm mb-6">{quiz.description}</p>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                                    <p className="text-gray-400 text-xs mb-1">Questions</p>
                                    <p className="text-white text-2xl font-bold">{quiz.questions.length}</p>
                                </div>
                                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                                    <p className="text-gray-400 text-xs mb-1">Passing Score</p>
                                    <p className="text-white text-2xl font-bold">{quiz.passingScore}%</p>
                                </div>
                                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                                    <p className="text-gray-400 text-xs mb-1">Time Limit</p>
                                    <p className="text-white text-2xl font-bold">{Math.floor((quiz.timeLimit || 0) / 60)}m</p>
                                </div>
                                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                                    <p className="text-gray-400 text-xs mb-1">Badge Reward</p>
                                    <p className="text-yellow-400 text-sm font-bold">{quiz.thematicBadge.name}</p>
                                </div>
                            </div>

                            <Button
                                onClick={handleStartQuiz}
                                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-md py-3 mt-6"
                            >
                                Start Quiz Challenge
                            </Button>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4 border-t border-cyan-500/20">
                        <Button
                            onClick={onClose}
                            className="flex-1 border-2 border-cyan-400 text-cyan-400 bg-transparent hover:bg-cyan-400/10 rounded-md py-2"
                        >
                            Close
                        </Button>
                        {!isLevelCompleted && (
                            <Button
                                onClick={handleComplete}
                                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-md py-2 flex items-center justify-center gap-2"
                            >
                                <Trophy className="w-4 h-4" />
                                Complete Level
                            </Button>
                        )}
                    </div>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
}
