# Implementation Plan

- [x] 1. Implement core visual design system


  - Update Tailwind configuration with exact color palette from design guidelines
  - Add custom CSS classes for gradients, glows, and typography
  - Import and configure Orbitron and Inter fonts
  - Create reusable glow effect utility classes
  - _Requirements: 1.1, 1.2, 1.3_






- [ ] 2. Enhance level node visual design
  - [ ] 2.1 Update LevelNode.tsx with glowing orb design
    - Replace basic styling with cyan border and glow effects
    - Implement golden ring for current level state

    - Add emerald glow for completed levels
    - Ensure proper sizing (w-20 h-20 mobile, w-24 h-24 desktop)
    - _Requirements: 1.4, 2.4_

  - [ ] 2.2 Add hover and interaction animations
    - Implement scale 1.1 transform on hover
    - Add glow intensity increase with 20px blur spread
    - Create smooth transitions with 200ms duration
    - _Requirements: 1.5, 2.3_

- [x] 3. Implement enhanced SVG path system



  - [x] 3.1 Update connecting paths in LevelMap.tsx


    - Replace basic paths with golden gradient SVG paths
    - Add glow effect with 8px blur drop-shadow
    - Implement proper stroke width (3-4px)
    - _Requirements: 1.4, 2.1_

  - [x] 3.2 Add GSAP draw-on animations


    - Install and configure GSAP with drawSVG plugin
    - Implement 1s duration path drawing animation
    - Add power2.out easing for smooth progression
    - Coordinate with level unlock sequence
    - _Requirements: 2.1, 2.2_

- [x] 4. Enhance modal design and interactions


  - [x] 4.1 Update LevelModal.tsx with frosted glass design


    - Apply backdrop-blur-md with dark overlay
    - Add rounded-2xl container with cyan border glow
    - Implement proper two-column layout (7/5 split desktop)
    - Style video area with 16:9 aspect ratio
    - _Requirements: 3.1, 3.2_

  - [x] 4.2 Implement modal animation transitions


    - Add Framer Motion scale animations (0.9 to 1.0 entry)
    - Implement 300ms duration with ease-out easing
    - Add backdrop fade effects
    - Create smooth exit animations (scale to 0.95)
    - _Requirements: 3.1, 3.4_

  - [x] 4.3 Style action buttons with design guidelines

    - Create primary button with golden gradient background
    - Add hover scale transform effects
    - Implement secondary button with cyan outline
    - Ensure rounded-full styling with proper padding
    - _Requirements: 3.2, 3.4_

- [x] 5. Enhance progress and achievement system



  - [x] 5.1 Update ProgressBar.tsx with gradient design

    - Implement teal-to-golden gradient fill
    - Add smooth transition-all duration-500 animations
    - Style container with dark background and backdrop-blur
    - Format percentage text with cyan color and mono font
    - _Requirements: 4.1, 4.4_

  - [x] 5.2 Enhance BadgeCard.tsx with glow effects


    - Add golden glow for earned badges (shadow-lg shadow-yellow-500/50)
    - Implement grayscale filter with opacity-30 for locked badges
    - Ensure proper aspect-square rounded-xl styling
    - Size badge icons correctly (w-16 h-16)
    - _Requirements: 4.2, 4.3_

- [x] 6. Implement Arin avatar enhancements



  - [x] 6.1 Enhance avatar visual design in LevelMap.tsx


    - Apply cyan-to-teal gradient background
    - Add 4px cyan border with glow effect
    - Ensure proper 48px sizing (w-12 h-12)
    - Maintain Sparkles icon implementation
    - _Requirements: 2.2, 2.3_

  - [x] 6.2 Add floating and movement animations

    - Implement subtle floating animation (±8px vertical, 2s duration)
    - Enhance travel animations with smooth GSAP movement
    - Add rotation effects during movement
    - Coordinate with level unlock sequences
    - _Requirements: 2.1, 2.2_

- [x] 7. Implement responsive design system


  - [x] 7.1 Add mobile layout adaptations


    - Implement vertical linear path for mobile devices
    - Adjust node spacing for smaller screens (p-4 instead of p-8)
    - Ensure single-column modal layout on mobile
    - Reduce typography scale appropriately
    - _Requirements: 5.1, 5.2_

  - [x] 7.2 Optimize desktop branching layout

    - Implement full zigzag branching pattern for desktop
    - Ensure proper node spacing (16-20 units vertical, 24-32 horizontal)
    - Add three-column badge grid for desktop
    - Optimize modal two-column layout
    - _Requirements: 5.3, 5.4_

- [x] 8. Add accessibility and performance features



  - [x] 8.1 Implement accessibility requirements

    - Add clear focus states with ring-2 ring-cyan-400
    - Ensure WCAG AA contrast ratios for all text
    - Add proper ARIA labels for progress and achievements
    - Implement keyboard navigation support
    - _Requirements: 5.3, 5.4, 5.5_

  - [x] 8.2 Add reduced motion support

    - Implement prefers-reduced-motion media query handling
    - Provide CSS-only fallbacks for GSAP animations
    - Ensure core functionality works without animations
    - Add performance optimizations for smooth animations
    - _Requirements: 6.1, 6.2, 6.3_

- [x] 9. Implement page transition system


  - [x] 9.1 Add route transition animations


    - Implement smooth fade crossfade between routes (400ms duration)
    - Add GSAP or Framer Motion page transitions
    - Ensure state preservation during navigation
    - Coordinate with existing React Router setup
    - _Requirements: 7.1, 7.2, 7.3_

  - [x] 9.2 Optimize navigation and state management

    - Ensure progress persistence through Zustand
    - Add soft resume animations for page reloads
    - Implement proper browser back/forward handling
    - Optimize touch interactions for mobile
    - _Requirements: 7.3, 7.4, 7.5_

- [x] 10. Final polish and optimization



  - [x] 10.1 Performance optimization


    - Implement lazy loading for media assets
    - Optimize GSAP timelines and memoized states
    - Add animation coordination to prevent performance issues
    - Test and optimize for smooth 60fps animations
    - _Requirements: 6.1, 6.2, 6.5_

  - [x] 10.2 Cross-browser testing and refinement



    - Test visual consistency across modern browsers
    - Verify mobile responsiveness on various devices
    - Ensure animation performance on lower-end devices
    - Add final visual polish and bug fixes
    - _Requirements: 5.1, 5.2, 6.4_
- [ ] 1
1. Timeline spacing and animation improvements
  - [ ] 11.1 Increase node spacing in timeline view
    - Update LevelMap.tsx to add more spacious layout between nodes
    - Increase vertical spacing from current 16-20 units to 24-32 units
    - Adjust horizontal spacing for better visual breathing room
    - Ensure responsive spacing scales appropriately on mobile
    - _Requirements: 2.1, 5.1, 5.2_

  - [ ] 11.2 Fix path animation direction for level completion
    - Update path drawing animation to go from current completed node to next unlocked node
    - Ensure GSAP drawSVG animation starts from the correct node position
    - Coordinate path animation with Arin avatar movement
    - Add visual feedback when level completion triggers next level unlock
    - _Requirements: 2.1, 2.2_

- [ ] 12. Progress page redesign to match UI mockups
  - [ ] 12.1 Redesign Progress page layout to match badges&progress.png
    - Update Progress.tsx to match the exact layout from badges&progress.png mockup
    - Implement proper badge grid layout with dark theme styling
    - Add glowing borders and proper spacing between badge sections
    - Ensure responsive design works across all screen sizes
    - _Requirements: 4.2, 4.3, 5.1, 5.2_

  - [ ] 12.2 Enhance badge visual design and interactions
    - Apply proper golden glow effects for earned badges
    - Implement grayscale with reduced opacity for locked badges
    - Add hover effects and smooth transitions for badge interactions
    - Ensure badge icons and text match the mockup styling
    - _Requirements: 4.2, 4.3_- [
 ] 13. Enhanced dynamic path animations with energy beams
  - [ ] 13.1 Implement glowing energy beam animations
    - Create dynamic curved energy lines that flow from current node to next node
    - Add flowing light particles along the path with smooth trail effects
    - Implement warm golden glow for early nodes transitioning to cool neon blue for futuristic ones
    - Add depth-of-field perspective and continuous forward motion effects
    - _Requirements: 2.1, 2.2_

  - [ ] 13.2 Add particle system and lighting effects
    - Create glowing particles that travel along the energy beam path
    - Implement soft trail effects that fade out after the line is drawn
    - Add node lighting up animation as the path reaches each node
    - Ensure smooth transitions with proper timing and easing
    - _Requirements: 2.1, 2.2, 6.1_