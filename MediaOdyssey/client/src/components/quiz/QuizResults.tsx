import { motion } from 'framer-motion';
import { Trophy, RotateCcw, X, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Quiz } from '@shared/levels';
import { useState } from 'react';

interface QuizResultsProps {
    quiz: Quiz;
    score: number;
    answers: (number | null)[];
    onTryAgain: () => void;
    onClose: () => void;
}

export default function QuizResults({ quiz, score, answers, onTryAgain, onClose }: QuizResultsProps) {
    const [showReview, setShowReview] = useState(false);
    const passed = score >= quiz.passingScore;
    const correctCount = answers.filter((answer, index) => answer === quiz.questions[index].correctAnswer).length;

    const difficultyBreakdown = {
        easy: { correct: 0, total: 0 },
        medium: { correct: 0, total: 0 },
        hard: { correct: 0, total: 0 }
    };

    quiz.questions.forEach((q, index) => {
        difficultyBreakdown[q.difficulty].total++;
        if (answers[index] === q.correctAnswer) {
            difficultyBreakdown[q.difficulty].correct++;
        }
    });

    return (
        <div className="min-h-screen bg-black p-4 md:p-8 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-4xl w-full bg-slate-900/90 backdrop-blur-xl rounded-2xl border-2 border-cyan-500/50 p-6 md:p-8 shadow-2xl"
            >
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="inline-block mb-4"
                    >
                        {passed ? (
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mx-auto">
                                <Trophy className="w-12 h-12 text-white" />
                            </div>
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center mx-auto">
                                <RotateCcw className="w-12 h-12 text-white" />
                            </div>
                        )}
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        Quiz Complete!
                    </h2>
                    <p className="text-gray-400">
                        {passed ? "Keep learning! Try again to improve your score." : "Don't give up! Review and try again."}
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-8"
                >
                    <div className={`text-7xl md:text-8xl font-bold mb-4 ${passed ? 'text-emerald-400' : 'text-red-400'}`}>
                        {score}%
                    </div>
                    <p className="text-gray-300 text-lg">
                        {correctCount} out of {quiz.questions.length} correct
                    </p>
                </motion.div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 text-center"
                    >
                        <p className="text-emerald-400 text-xs uppercase tracking-wide mb-1">Easy</p>
                        <p className="text-white text-2xl font-bold">
                            {difficultyBreakdown.easy.correct}/{difficultyBreakdown.easy.total}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-center"
                    >
                        <p className="text-yellow-400 text-xs uppercase tracking-wide mb-1">Medium</p>
                        <p className="text-white text-2xl font-bold">
                            {difficultyBreakdown.medium.correct}/{difficultyBreakdown.medium.total}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center"
                    >
                        <p className="text-red-400 text-xs uppercase tracking-wide mb-1">Hard</p>
                        <p className="text-white text-2xl font-bold">
                            {difficultyBreakdown.hard.correct}/{difficultyBreakdown.hard.total}
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mb-6"
                >
                    <button
                        onClick={() => setShowReview(!showReview)}
                        className="w-full flex items-center justify-between p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 hover:bg-cyan-500/20 transition-all"
                    >
                        <span className="font-semibold">Review Questions & Explanations</span>
                        {showReview ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>

                    {showReview && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-4 space-y-4 max-h-96 overflow-y-auto"
                        >
                            {quiz.questions.map((question, index) => {
                                const userAnswer = answers[index];
                                const isCorrect = userAnswer === question.correctAnswer;

                                return (
                                    <div
                                        key={question.id}
                                        className={`p-4 rounded-lg border-2 ${isCorrect
                                            ? 'bg-emerald-500/5 border-emerald-500/30'
                                            : 'bg-red-500/5 border-red-500/30'
                                            }`}
                                    >
                                        <div className="flex items-start gap-3 mb-2">
                                            {isCorrect ? (
                                                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                                            ) : (
                                                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                                            )}
                                            <div className="flex-1">
                                                <p className="text-white font-semibold mb-2">
                                                    Question {index + 1}: {question.question}
                                                </p>
                                                {userAnswer !== null && (
                                                    <p className={`text-sm mb-1 ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                                                        Your answer: {question.options[userAnswer]}
                                                    </p>
                                                )}
                                                {!isCorrect && (
                                                    <p className="text-sm text-emerald-400 mb-2">
                                                        Correct answer: {question.options[question.correctAnswer]}
                                                    </p>
                                                )}
                                                <p className="text-gray-300 text-sm mt-2 p-3 bg-slate-800/50 rounded border-l-2 border-cyan-400">
                                                    {question.explanation}
                                                </p>
                                                {question.arinQuote && (
                                                    <p className="text-gray-400 text-xs italic mt-2 pl-3 border-l-2 border-yellow-400">
                                                        💭 "{question.arinQuote}"
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    )}
                </motion.div>

                <div className="flex gap-4">
                    <Button
                        onClick={onClose}
                        className="flex-1 border-2 border-cyan-400 text-cyan-400 bg-transparent hover:bg-cyan-400/10 rounded-md py-3"
                    >
                        Close
                    </Button>
                    <Button
                        onClick={onTryAgain}
                        className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-md py-3 flex items-center justify-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Try Again
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
