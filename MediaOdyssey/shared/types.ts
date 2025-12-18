// Shared types for MediaOdyssey

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    difficulty: 'easy' | 'medium' | 'hard';
    sceneReference?: string;
    arinQuote?: string;
}

export interface Quiz {
    day: number;
    title: string;
    description: string;
    questions: QuizQuestion[];
    passingScore: number;
    timeLimit?: number;
    thematicBadge: Badge;
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    imagePath: string;
    unlocked: boolean;
}

export interface Level {
    day: number;
    label: string;
    icon: string;
    description: string;
    videoUrl?: string;
    funFacts?: string[];
    quiz?: QuizQuestion[];
    comprehensiveQuiz?: Quiz;
}
