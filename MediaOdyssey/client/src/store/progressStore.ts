import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Quiz } from '@shared/levels';

interface QuizSessionState {
    currentQuiz: Quiz | null;
    currentQuestionIndex: number;
    userAnswers: (number | null)[];
    quizStartTime: number;
    timeRemaining: number | null;
}

interface ProgressState extends QuizSessionState {
    // Level progress
    unlockedLevels: number[];
    completedLevels: number[];
    currentLevel: number;

    // Badge system
    earnedBadges: string[];
    badgeUnlockAnimations: string[];

    // Quiz progress
    completedQuizzes: number[];
    quizScores: { [day: number]: number };
    quizAttempts: { [day: number]: number };

    // Actions
    unlockLevel: (day: number) => void;
    completeLevel: (day: number) => void;
    resetProgress: () => void;

    // Quiz actions
    startQuiz: (day: number, questionCount: number, timeLimit?: number) => void;
    submitAnswer: (questionIndex: number, answer: number) => void;
    nextQuestion: () => void;
    previousQuestion: () => void;
    completeQuiz: (day: number, score: number) => void;
    resetQuiz: () => void;
    updateTimeRemaining: (time: number) => void;

    // Badge actions
    queueBadgeUnlock: (badgeId: string) => void;
    clearBadgeAnimation: (badgeId: string) => void;

    // Quiz helpers
    isQuizCompleted: (day: number) => boolean;
    hasPassedQuiz: (day: number) => boolean;
    getQuizScore: (day: number) => number | null;
    getQuizAttempts: (day: number) => number;
}

export const useProgressStore = create<ProgressState>()(
    persist(
        (set, get) => ({
            // Initial state
            unlockedLevels: [1],
            completedLevels: [],
            currentLevel: 1,
            earnedBadges: [],
            badgeUnlockAnimations: [],
            completedQuizzes: [],
            quizScores: {},
            quizAttempts: {},

            // Quiz session state (not persisted)
            currentQuiz: null,
            currentQuestionIndex: 0,
            userAnswers: [],
            quizStartTime: 0,
            timeRemaining: null,

            unlockLevel: (day) =>
                set((state) => ({
                    unlockedLevels: Array.from(new Set([...state.unlockedLevels, day])),
                })),

            completeLevel: (day) =>
                set((state) => {
                    const newCompletedLevels = Array.from(new Set([...state.completedLevels, day]));
                    const badgeName = `badge-${day}`;
                    const newEarnedBadges = Array.from(new Set([...state.earnedBadges, badgeName]));
                    const newBadgeUnlocks = [...state.badgeUnlockAnimations];

                    if (!state.earnedBadges.includes(badgeName)) {
                        newBadgeUnlocks.push(badgeName);
                    }

                    return {
                        completedLevels: newCompletedLevels,
                        earnedBadges: newEarnedBadges,
                        badgeUnlockAnimations: newBadgeUnlocks,
                    };
                }),

            resetProgress: () =>
                set({
                    unlockedLevels: [1],
                    completedLevels: [],
                    currentLevel: 1,
                    earnedBadges: [],
                    badgeUnlockAnimations: [],
                    completedQuizzes: [],
                    quizScores: {},
                    quizAttempts: {},
                    currentQuiz: null,
                    currentQuestionIndex: 0,
                    userAnswers: [],
                    quizStartTime: 0,
                    timeRemaining: null,
                }),

            startQuiz: (day, questionCount, timeLimit) =>
                set({
                    currentQuestionIndex: 0,
                    userAnswers: new Array(questionCount).fill(null),
                    quizStartTime: Date.now(),
                    timeRemaining: timeLimit || null,
                }),

            submitAnswer: (questionIndex, answer) =>
                set((state) => {
                    const newAnswers = [...state.userAnswers];
                    newAnswers[questionIndex] = answer;
                    return { userAnswers: newAnswers };
                }),

            nextQuestion: () =>
                set((state) => ({
                    currentQuestionIndex: Math.min(
                        state.currentQuestionIndex + 1,
                        (state.currentQuiz?.questions.length || 1) - 1
                    ),
                })),

            previousQuestion: () =>
                set((state) => ({
                    currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
                })),

            completeQuiz: (day, score) =>
                set((state) => {
                    const currentAttempts = state.quizAttempts[day] || 0;
                    const currentBestScore = state.quizScores[day] || 0;
                    const isPassing = score >= 70;
                    const isFirstPass = isPassing && !state.completedQuizzes.includes(day);

                    const badgeName = `badge-${day}`;
                    const newBadgeUnlocks = [...state.badgeUnlockAnimations];

                    if (isFirstPass) {
                        newBadgeUnlocks.push(badgeName);
                    }

                    return {
                        quizScores: {
                            ...state.quizScores,
                            [day]: Math.max(score, currentBestScore),
                        },
                        quizAttempts: {
                            ...state.quizAttempts,
                            [day]: currentAttempts + 1,
                        },
                        completedQuizzes: isPassing && !state.completedQuizzes.includes(day)
                            ? Array.from(new Set([...state.completedQuizzes, day]))
                            : state.completedQuizzes,
                        earnedBadges: isFirstPass
                            ? Array.from(new Set([...state.earnedBadges, badgeName]))
                            : state.earnedBadges,
                        badgeUnlockAnimations: newBadgeUnlocks,
                    };
                }),

            resetQuiz: () =>
                set({
                    currentQuiz: null,
                    currentQuestionIndex: 0,
                    userAnswers: [],
                    quizStartTime: 0,
                    timeRemaining: null,
                }),

            updateTimeRemaining: (time) =>
                set({ timeRemaining: time }),

            queueBadgeUnlock: (badgeId) =>
                set((state) => ({
                    badgeUnlockAnimations: [...state.badgeUnlockAnimations, badgeId],
                })),

            clearBadgeAnimation: (badgeId) =>
                set((state) => ({
                    badgeUnlockAnimations: state.badgeUnlockAnimations.filter((id) => id !== badgeId),
                })),

            isQuizCompleted: (day) => {
                const state = get();
                return state.completedQuizzes.includes(day);
            },

            hasPassedQuiz: (day) => {
                const state = get();
                const score = state.quizScores[day];
                return score !== undefined && score >= 70;
            },

            getQuizScore: (day) => {
                const state = get();
                return state.quizScores[day] || null;
            },

            getQuizAttempts: (day) => {
                const state = get();
                return state.quizAttempts[day] || 0;
            },
        }),
        {
            name: 'mediaodyssey-progress',
            partialize: (state) => ({
                unlockedLevels: state.unlockedLevels,
                completedLevels: state.completedLevels,
                currentLevel: state.currentLevel,
                earnedBadges: state.earnedBadges,
                completedQuizzes: state.completedQuizzes,
                quizScores: state.quizScores,
                quizAttempts: state.quizAttempts,
            }),
        }
    )
);
