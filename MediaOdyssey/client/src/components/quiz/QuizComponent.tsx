import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Clock, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProgressStore } from '@/store/progressStore';
import type { Quiz } from '@shared/levels';

interface QuizComponentProps {
    quiz: Quiz;
    onComplete: (score: number, answers: (number | null)[]) => void;
    onExit: () => void;
}

export default function QuizComponent({ quiz, onComplete, onExit }: QuizComponentProps) {
    const {
        currentQuestionIndex,
        userAnswers,
        timeRemaining,
        submitAnswer,
        nextQuestion,
        updateTimeRemaining
    } = useProgressStore();

    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(
        userAnswers[currentQuestionIndex] || null
    );

    const currentQuestion = useMemo(() => quiz.questions[currentQuestionIndex], [quiz.questions, currentQuestionIndex]);
    const isLastQuestion = useMemo(() => currentQuestionIndex === quiz.questions.length - 1, [currentQuestionIndex, quiz.questions.length]);
    const canProceed = useMemo(() => selectedAnswer !== null, [selectedAnswer]);
    const progress = useMemo(() => ((currentQuestionIndex + 1) / quiz.questions.length) * 100, [currentQuestionIndex, quiz.questions.length]);

    useEffect(() => {
        if (!quiz.timeLimit || timeRemaining === null) return;

        const timer = setInterval(() => {
            updateTimeRemaining(Math.max(0, timeRemaining - 1));

            if (timeRemaining <= 1) {
                handleQuizComplete();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [timeRemaining, quiz.timeLimit, updateTimeRemaining]);

    useEffect(() => {
        setSelectedAnswer(userAnswers[currentQuestionIndex] || null);
    }, [currentQuestionIndex, userAnswers]);

    const handleAnswerSelect = useCallback((answerIndex: number) => {
        setSelectedAnswer(answerIndex);
        submitAnswer(currentQuestionIndex, answerIndex);
    }, [currentQuestionIndex, submitAnswer]);

    const handleQuizComplete = useCallback(() => {
        let correctAnswers = 0;
        userAnswers.forEach((answer, index) => {
            if (answer === quiz.questions[index].correctAnswer) {
                correctAnswers++;
            }
        });

        const score = Math.round((correctAnswers / quiz.questions.length) * 100);
        onComplete(score, userAnswers);
    }, [userAnswers, quiz.questions, onComplete]);

    const handleNext = useCallback(() => {
        if (isLastQuestion) {
            handleQuizComplete();
        } else {
            nextQuestion();
            setSelectedAnswer(userAnswers[currentQuestionIndex + 1] || null);
        }
    }, [isLastQuestion, nextQuestion, userAnswers, currentQuestionIndex, handleQuizComplete]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return 'text-emerald-400';
            case 'medium': return 'text-yellow-400';
            case 'hard': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };

    return (
        <div className="min-h-screen bg-primary-gradient p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl border-2 border-bright-cyan/50 p-6 md:p-8 shadow-2xl">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-display font-bold text-glow-gold">
                                {quiz.title}
                            </h2>
                            <span className={`text-sm font-semibold ${getDifficultyColor(currentQuestion.difficulty)}`}>
                                {currentQuestion.difficulty.toUpperCase()}
                            </span>
                        </div>
                        {timeRemaining !== null && (
                            <div className="flex items-center gap-2 text-bright-cyan">
                                <Clock className="w-5 h-5" />
                                <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
                            </div>
                        )}
                    </div>

                    <div className="mb-6">
                        <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                            <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
                            <span>{Math.round(progress)}% Complete</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-bright-cyan to-warm-gold"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </div>

                    <motion.div
                        key={currentQuestionIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div>
                            <h3 className="text-xl md:text-2xl font-semibold text-white mb-6">
                                {currentQuestion.question}
                            </h3>

                            <div className="space-y-3">
                                {currentQuestion.options.map((option, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => handleAnswerSelect(index)}
                                        className={`
                      w-full p-4 rounded-lg text-left transition-all border-2
                      ${selectedAnswer === index
                                                ? 'bg-bright-cyan/20 border-bright-cyan text-white'
                                                : 'bg-slate-800/50 border-slate-700 text-gray-300 hover:border-bright-cyan/50 hover:bg-slate-800'
                                            }
                    `}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center
                        ${selectedAnswer === index ? 'border-bright-cyan bg-bright-cyan' : 'border-gray-500'}
                      `}>
                                                {selectedAnswer === index && <CheckCircle className="w-4 h-4 text-white" />}
                                            </div>
                                            <span className="flex-1">{option}</span>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {currentQuestion.arinQuote && (
                            <div className="p-4 bg-warm-gold/10 border-l-4 border-warm-gold rounded-r-lg">
                                <p className="text-sm text-gray-300 italic">
                                    💭 Arin's thought: "{currentQuestion.arinQuote}"
                                </p>
                            </div>
                        )}
                    </motion.div>

                    <div className="flex gap-4 mt-8 pt-6 border-t border-slate-700">
                        <Button
                            onClick={onExit}
                            className="btn-secondary flex-1"
                        >
                            Exit Quiz
                        </Button>
                        <Button
                            onClick={handleNext}
                            disabled={!canProceed}
                            className={`btn-primary flex-1 flex items-center justify-center gap-2 ${!canProceed ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <span>{isLastQuestion ? 'Complete Quiz' : 'Next Question'}</span>
                            {!isLastQuestion && <ChevronRight className="w-4 h-4" />}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
