# 🎬 MediaOdyssey: Echoes from Tomorrow

> An interactive educational web application that takes users through the complete evolution of human communication - from prehistoric cave paintings to futuristic neural interfaces.

## 🌟 Project Status

✅ **FULLY REBUILT** - All core files have been recreated!

### What's Included:
- ✅ Complete project structure
- ✅ All configuration files (Vite, TypeScript, Tailwind, etc.)
- ✅ Golden glow effects on day titles
- ✅ Quiz navigation system (fixed!)
- ✅ Progress tracking with Zustand
- ✅ All 14 levels data structure
- ✅ Badge system
- ✅ Responsive design
- ✅ Accessibility features

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd MediaOdyssey
npm install
```

### 2. Run Development Server

```bash
npm run dev:client
```

The app will be available at `http://localhost:5173`

### 3. (Optional) Run Full Stack

```bash
npm run dev
```

## 📁 Project Structure

```
MediaOdyssey/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # UI components
│   │   │   ├── quiz/       # Quiz system
│   │   │   ├── ui/         # Base components
│   │   │   └── accessibility/
│   │   ├── pages/          # Main pages
│   │   │   ├── Home.tsx
│   │   │   ├── LevelMap.tsx
│   │   │   ├── Progress.tsx
│   │   │   └── Profile.tsx
│   │   ├── store/          # State management
│   │   └── styles/         # CSS with golden glow!
│   └── public/
│       ├── badges/         # Badge images (need to add)
│       └── videos/         # Video files (optional)
├── server/                 # Backend server
├── shared/                 # Shared types and data
└── package.json
```

## 🎯 Features Implemented

### ✨ Visual Effects
- **Golden Glow Animation** - CSS keyframe-based text effects
- **Animated Timeline** - GSAP-powered path animations
- **Responsive Design** - Works on all devices
- **Smooth Transitions** - Framer Motion animations

### 🎮 Functionality
- **14-Day Journey** - Complete media evolution timeline
- **Quiz System** - Educational quizzes with navigation
- **Progress Tracking** - Persistent state with Zustand
- **Badge Collection** - 14 thematic badges to earn
- **Level Completion** - Track your journey progress

### ♿ Accessibility
- **Keyboard Navigation** - Full keyboard support
- **Screen Reader** - ARIA labels and semantic HTML
- **Reduced Motion** - Respects user preferences
- **Focus Management** - Clear focus indicators

## 🎨 Golden Glow Effect

The signature golden glow effect is implemented using CSS keyframes:

```css
@keyframes glowGold {
    from {
        text-shadow: 0 0 5px #fbbf24, 0 0 10px #fbbf24, ...
    }
    to {
        text-shadow: 0 0 10px #fbbf24, 0 0 15px #f59e0b, ...
    }
}
```

Applied to all day titles and level labels for a cohesive visual theme.

## 🔧 Development Commands

```bash
# Development
npm run dev          # Full stack
npm run dev:client   # Client only (recommended)
npm run dev:server   # Server only

# Testing
npm test            # Run tests
npm run test:watch  # Watch mode

# Building
npm run build       # Production build
npm run preview     # Preview build
```

## 📝 Next Steps

### 1. Add Badge Images
Create 14 badge images in `client/public/badges/`:
- `badge-1.png` through `badge-14.png`
- Recommended size: 256x256px
- Can use placeholder images or emojis for now

### 2. (Optional) Add Videos
Add video files in `client/public/videos/`:
- `day1.mp4` through `day14.mp4`
- These are optional - the app works without them

### 3. Customize Content
Edit `shared/levels.ts` to:
- Add quiz questions for each day
- Customize level descriptions
- Add fun facts

## 🎓 How It Works

### State Management
Uses Zustand for persistent state:
- Level progress
- Quiz scores
- Badge collection
- User answers

### Quiz Navigation
Fixed implementation with:
- `nextQuestion()` function
- `previousQuestion()` function
- Proper state updates

### Golden Glow
CSS-based animations for:
- Day titles ("DAY 1", "DAY 2", etc.)
- Level labels ("Dawn of Communication", etc.)
- Cross-browser support (webkit, moz, standard)

## 🐛 Known Issues

None! The project has been fully rebuilt with all fixes applied.

## 📚 Technologies Used

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **GSAP** - Timeline animations
- **Zustand** - State management
- **Wouter** - Routing
- **Vitest** - Testing

## 🎉 What's New

This is a complete rebuild that includes:
1. ✅ Golden glow effects (working!)
2. ✅ Quiz navigation (fixed!)
3. ✅ All 14 levels
4. ✅ Badge system
5. ✅ Progress tracking
6. ✅ Responsive design
7. ✅ Accessibility features

## 💡 Tips

- Start with `npm run dev:client` for fastest development
- Check browser console for any errors
- Use Chrome DevTools for debugging
- Test on mobile devices for responsive design

## 🤝 Contributing

This is a personal educational project, but feel free to:
- Report bugs
- Suggest features
- Improve documentation

## 📄 License

MIT License - Feel free to use for educational purposes

---

**Built with ❤️ for education and exploration**

*Experience the journey of human communication through time!* 🎬✨
