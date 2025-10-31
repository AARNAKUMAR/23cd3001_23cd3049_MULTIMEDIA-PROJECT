# Design Document

## Overview

The Quiz System Integration design creates a comprehensive educational quiz experience that seamlessly integrates with the existing MediaOdyssey timeline interface. The system leverages the rich scene content from WEEK 2.txt to create immersive quizzes that test users' understanding of Arin's journey through media evolution, while rewarding successful completion with custom badge images (badge-1.png through badge-14.png) that reflect each era's thematic identity.

The design maintains the established futuristic aesthetic with dark themes, cyan borders, golden accents, and smooth animations while adding new quiz-specific components that feel native to the existing experience. The quiz system integrates with the current Zustand store for state management and follows the established component architecture patterns.

## Architecture

### Quiz System Components Structure

The quiz system extends the existing component architecture with new quiz-specific components:

```
src/components/
├── quiz/
│   ├── QuizComponent.tsx           # Main quiz interface component
│   ├── QuizQuestion.tsx            # Individual question display
│   ├── QuizResults.tsx             # Results and review screen
│   ├── QuizTimer.tsx               # Countdown timer component
│   └── QuizProgress.tsx            # Progress indicator
├── badges/
│   ├── BadgeUnlock.tsx             # Badge unlock animation
│   └── BadgeCollection.tsx         # Badge gallery display
└── enhanced/ (existing components with quiz integration)
    ├── LevelModal.tsx              # Enhanced with quiz tab
    └── BadgeCard.tsx               # Updated for custom images
```

### Data Architecture

**Quiz Data Structure:**
```typescript
interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  sceneReference?: string; // Reference to specific scene from WEEK 2.txt
  arinQuote?: string;      // Arin's dialogue or thoughts from the scene
}

interface Quiz {
  day: number;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number;
  thematicBadge: {
    name: string;
    imagePath: string;
    description: string;
  };
}
```

### State Management Integration

**Zustand Store Extensions:**
```typescript
interface QuizState {
  // Quiz completion tracking
  completedQuizzes: number[];
  quizScores: { [day: number]: number };
  quizAttempts: { [day: number]: number };
  
  // Badge system
  earnedBadges: string[];
  badgeUnlockAnimations: string[];
  
  // Current quiz session
  currentQuiz: Quiz | null;
  currentQuestionIndex: number;
  userAnswers: (number | null)[];
  quizStartTime: number;
  
  // Actions
  startQuiz: (day: number) => void;
  submitAnswer: (questionIndex: number, answer: number) => void;
  completeQuiz: (score: number) => void;
  earnBadge: (badgeId: string) => void;
  resetQuiz: () => void;
}
```

## Components and Interfaces

### Enhanced LevelModal with Quiz Integration

**Design Specifications:**
The existing LevelModal.tsx will be enhanced with a new "Quiz Challenge" tab that appears after level completion. The tab system will expand to include:

1. **Overview Tab** (existing)
2. **Fun Facts Tab** (existing) 
3. **Quiz Challenge Tab** (new)

**Quiz Tab Visual Design:**
- **Container:** Same frosted glass design (bg-slate-900/95, border-cyan-500/30, backdrop-blur-md)
- **Quiz Preview:** Shows quiz statistics (question count, passing score, time limit, badge reward)
- **Access Control:** Disabled state with "Complete Level" message if level not finished
- **Start Button:** Golden gradient button matching existing design system

### QuizComponent Main Interface

**Visual Specifications:**
```css
.quiz-container {
  @apply bg-slate-900/95 border border-cyan-500/30 rounded-2xl p-6 md:p-8 backdrop-blur-md;
  max-width: 800px;
  margin: 0 auto;
}

.quiz-header {
  @apply mb-6 border-b border-cyan-500/20 pb-4;
}

.quiz-progress-bar {
  @apply w-full bg-slate-800 rounded-full h-2 mb-4;
}

.quiz-progress-fill {
  @apply bg-gradient-to-r from-cyan-400 to-emerald-400 h-2 rounded-full transition-all duration-500;
}
```

**Question Display Design:**
- **Question Text:** Large, readable typography (text-lg font-semibold text-white)
- **Options:** Interactive buttons with hover states and selection feedback
- **Selected State:** Cyan border and background (bg-cyan-500/20 border-cyan-400)
- **Unselected State:** Subtle border (border-slate-600) with hover effects

### Quiz Question Content Based on WEEK 2.txt

**Day 1 - Dawn of Communication Quiz Questions:**

*Easy Question Example:*
```typescript
{
  id: "day1_cave_painting",
  question: "What did Arin notice about the cave paintings that made them seem alive?",
  options: [
    "They were painted in bright colors",
    "They looked like they were moving",
    "They made sounds when touched", 
    "They changed colors in the firelight"
  ],
  correctAnswer: 1,
  explanation: "Arin observed that the animals in the cave paintings 'look like they're moving,' showing how ancient artists captured motion and life in their work.",
  difficulty: "easy",
  sceneReference: "Scene 1: Cave Painting",
  arinQuote: "These animals… they look like they're moving. Were kids like me drawing their world here?"
}
```

*Medium Question Example:*
```typescript
{
  id: "day1_oral_tradition",
  question: "According to the Elder in the Oral Tradition scene, why did children sing to the sun god?",
  options: [
    "To make him happy",
    "To keep him strong in his battle against darkness",
    "To help him rise each morning",
    "To thank him for the harvest"
  ],
  correctAnswer: 1,
  explanation: "The Elder explained that 'we, the children of light, sang to keep him strong' in his battle against the night, showing how oral traditions served both storytelling and cultural preservation purposes.",
  difficulty: "medium",
  sceneReference: "Scene 2: Oral Tradition"
}
```

*Hard Question Example:*
```typescript
{
  id: "day1_progression_analysis",
  question: "What progression does Arin's journey through Day 1 represent in the evolution of human communication?",
  options: [
    "From individual to group communication",
    "From temporary to permanent record-keeping", 
    "From visual to auditory to written to symbolic communication",
    "From simple to complex storytelling methods"
  ],
  correctAnswer: 2,
  explanation: "Arin's journey shows the evolution from visual cave paintings, to auditory oral traditions, to written cuneiform tablets, to symbolic hieroglyphs - representing humanity's progression through different communication modalities.",
  difficulty: "hard"
}
```

### Custom Badge Integration System

**Badge Image Implementation:**
```typescript
// Badge data with custom images
const badgeData = [
  {
    day: 1,
    name: "Firelight Chronicler",
    imagePath: "/badges/badge-1.png",
    description: "Master of cave paintings and oral traditions",
    unlockCondition: "Complete Day 1 quiz with 70% or higher"
  },
  {
    day: 2, 
    name: "Scroll Scholar",
    imagePath: "/badges/badge-2.png",
    description: "Expert in ancient scripts and alphabets",
    unlockCondition: "Complete Day 2 quiz with 70% or higher"
  }
  // ... continuing for all 14 days
];
```

**BadgeCard Enhancement:**
```css
.badge-card-earned {
  @apply aspect-square rounded-xl border-2 border-warm-gold p-4;
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(34, 211, 238, 0.1));
  box-shadow: 0 8px 32px rgba(251, 191, 36, 0.3);
}

.badge-image {
  @apply w-16 h-16 rounded-full mx-auto mb-3;
  filter: drop-shadow(0 4px 8px rgba(251, 191, 36, 0.4));
}

.badge-locked {
  @apply grayscale opacity-50;
  filter: grayscale(100%) opacity(0.5);
}
```

### Quiz Results and Review System

**Results Screen Design:**
- **Score Display:** Large percentage with color coding (green ≥70%, red <70%)
- **Badge Unlock Animation:** Golden glow effect with scale animation for earned badges
- **Question Review:** Expandable list showing correct/incorrect answers with explanations
- **Retry Option:** Available for failed attempts with no penalty

**Results Visual Specifications:**
```css
.results-container {
  @apply text-center p-8;
}

.score-display {
  @apply text-6xl font-bold mb-4;
}

.score-passed {
  @apply text-emerald-400;
}

.score-failed {
  @apply text-red-400;
}

.badge-unlock-animation {
  animation: badgeUnlock 2s ease-out;
}

@keyframes badgeUnlock {
  0% { transform: scale(0) rotate(-180deg); opacity: 0; }
  50% { transform: scale(1.2) rotate(0deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}
```

## Data Models

### Quiz Content Generation Strategy

**Scene-Based Question Categories:**

1. **Scene Recall Questions (Easy):**
   - Direct quotes from Arin's dialogue
   - Visual descriptions from scene sketches
   - Character interactions and reactions

2. **Transition Understanding (Medium):**
   - How scenes connect and flow
   - Technological progression between media types
   - Arin's learning journey and realizations

3. **Historical Analysis (Hard):**
   - Deeper implications of media evolution
   - Cultural and societal impacts
   - Connections between different eras

**Content Extraction from WEEK 2.txt:**
- Parse scene dialogue for direct quotes
- Extract Arin's observations and reactions
- Identify key technological transitions
- Map historical context and cultural significance

### Badge Thematic Design

**Badge Naming Convention:**
Each badge reflects the era's essence and Arin's journey:

- Day 1: "Firelight Chronicler" (Cave paintings, fire, early storytelling)
- Day 2: "Scroll Scholar" (Ancient scripts, learning, wisdom)
- Day 3: "Illuminated Scribe" (Medieval manuscripts, artistry, devotion)
- Day 4: "Press Pioneer" (Printing revolution, mass production, accessibility)
- Day 5: "Steam Sage" (Industrial media, speed, efficiency)
- Day 6: "Voice Voyager" (Modern communication, connection, innovation)
- Day 7: "Silver Screen Storyteller" (Early entertainment, visual narrative)
- Day 8: "Golden Age Guardian" (Media influence, cultural impact)
- Day 9: "Color Crusader" (Broadcast expansion, vivid experiences)
- Day 10: "Digital Discoverer" (Early digital age, personal computing)
- Day 11: "Network Navigator" (Internet era, global connection)
- Day 12: "Mobile Maverick" (Smartphone revolution, portability)
- Day 13: "Reality Renderer" (VR/AR, immersive experiences)
- Day 14: "Neural Voyager" (AI/Neural interfaces, future possibilities)

## Error Handling

### Quiz Session Management

**Error Scenarios and Handling:**
1. **Network Interruption:** Auto-save progress locally, resume on reconnection
2. **Time Expiration:** Graceful submission with partial answers
3. **Invalid Answers:** Validation with clear error messaging
4. **Badge Unlock Failures:** Retry mechanism with fallback to manual unlock

### Data Persistence

**Local Storage Strategy:**
```typescript
// Quiz progress persistence
const quizProgress = {
  currentDay: number,
  currentQuestion: number,
  answers: (number | null)[],
  startTime: number,
  timeRemaining: number
};

// Badge unlock queue for offline scenarios
const badgeQueue = {
  pendingUnlocks: string[],
  unlockTimestamps: { [badgeId: string]: number }
};
```

## Testing Strategy

### Quiz Content Validation

**Content Testing Approach:**
1. **Question Accuracy:** Verify all questions align with WEEK 2.txt content
2. **Answer Validation:** Ensure correct answers are properly marked
3. **Explanation Quality:** Review explanations for educational value
4. **Difficulty Balance:** Test question difficulty distribution

### User Experience Testing

**UX Testing Focus Areas:**
1. **Quiz Flow:** Smooth progression through questions
2. **Visual Feedback:** Clear indication of selected answers and progress
3. **Badge Unlock:** Satisfying animation and reward experience
4. **Accessibility:** Keyboard navigation and screen reader compatibility

### Performance Testing

**Performance Considerations:**
1. **Badge Image Loading:** Optimize custom badge images for fast loading
2. **Animation Performance:** Ensure smooth 60fps animations
3. **State Management:** Efficient Zustand store updates
4. **Memory Usage:** Prevent memory leaks during quiz sessions

## Accessibility Implementation

### Keyboard Navigation

**Navigation Requirements:**
- Tab through all quiz options with clear focus indicators
- Enter/Space to select answers
- Arrow keys for option navigation
- Escape to exit quiz (with confirmation)

### Screen Reader Support

**ARIA Implementation:**
```typescript
// Quiz question accessibility
<div role="group" aria-labelledby="question-title">
  <h3 id="question-title">{question.question}</h3>
  <div role="radiogroup" aria-labelledby="question-title">
    {options.map((option, index) => (
      <button
        role="radio"
        aria-checked={selectedAnswer === index}
        aria-describedby={`option-${index}-desc`}
      >
        {option}
      </button>
    ))}
  </div>
</div>
```

### Visual Accessibility

**Color and Contrast:**
- High contrast ratios for all text (WCAG AA compliance)
- Color-blind friendly indicators (icons + colors)
- Reduced motion support for animations
- Scalable text and UI elements

## Integration Points

### Existing Component Integration

**LevelModal Enhancement:**
- Add quiz tab to existing tab system
- Maintain current modal animation patterns
- Integrate with existing level completion logic

**Progress Page Integration:**
- Display quiz completion status alongside level progress
- Show earned badges in existing badge grid
- Maintain current progress tracking patterns

**Badge System Integration:**
- Extend existing BadgeCard component for custom images
- Integrate with current badge unlock animations
- Maintain existing badge state management

### State Management Integration

**Zustand Store Extensions:**
- Extend existing progress store with quiz state
- Maintain current persistence patterns
- Integrate with existing level completion logic

This design ensures the quiz system feels like a natural extension of the existing MediaOdyssey experience while providing rich, educational content based on Arin's journey through media evolution history.