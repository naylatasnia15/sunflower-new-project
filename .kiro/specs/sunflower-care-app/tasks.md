# Implementation Plan: Sunflower Care App

## Overview

This plan implements a single-page interactive web application for caring for a virtual sunflower. The implementation uses vanilla JavaScript, HTML5, CSS3, and Tailwind CSS (via CDN). The app features click interactions, animations, sound effects, and random "zoomies" behavior. All code will be contained in a single HTML file.

## Tasks

- [x] 1. Create base HTML structure and styling
  - Create single HTML file with HTML5 doctype
  - Add Tailwind CSS CDN link in head
  - Add Google Fonts CDN link for Quicksand or Varela Round
  - Implement background gradient (#FFF7AE to #C8FACC)
  - Add glassmorphism utility classes
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.4, 2.5_

- [x] 2. Create SVG sunflower illustration
  - Design SVG structure with petals, center, stem, leaves, and pot
  - Apply colors: petals #FFD84D, center #7A4A21, stem #3FA34D, leaves #56C271, pot #C97A40
  - Center sunflower on page
  - Make sunflower clickable
  - _Requirements: 2.2, 2.3_

- [ ] 3. Implement state management module
  - [x] 3.1 Create state object with careCount and isAnimating properties
    - Initialize careCount to 0
    - Initialize isAnimating to false
    - _Requirements: 6.1, 6.4_
  
  - [x] 3.2 Implement incrementCareCount function
    - Increment careCount by 1
    - Call updateCareCounterDisplay
    - _Requirements: 3.3, 5.5, 6.2_
  
  - [x] 3.3 Implement setAnimating function
    - Update isAnimating flag
    - _Requirements: 3.4 (implicit)_

- [ ] 4. Implement CSS animation system
  - [x] 4.1 Create wiggle animation keyframes
    - Rotate ±15 degrees
    - Duration 0.5 seconds
    - _Requirements: 3.1, 8.1_
  
  - [x] 4.2 Create fast-shake animation keyframes
    - Rotate ±20 degrees rapidly
    - Duration 0.2 seconds, 3 iterations
    - _Requirements: 4.2, 8.2_
  
  - [x] 4.3 Create float animation keyframes
    - Gentle vertical movement ±10px
    - Duration 3 seconds, infinite loop
    - Apply to sunflower by default
    - _Requirements: 8.3_
  
  - [x] 4.4 Create splash and grow animation keyframes
    - Splash: scale pulse 1.0 → 1.1 → 1.0, 0.4s
    - Grow: scale increase 1.0 → 1.05, 0.3s
    - _Requirements: 5.2, 5.3_
  
  - [x] 4.5 Create fade-out animation keyframes
    - Opacity transition 1.0 → 0, 1s
    - _Requirements: 4.6, 8.4_

- [ ] 5. Implement animation controller module
  - [x] 5.1 Implement triggerHappyAnimation function
    - Add wiggle class to element
    - Remove class after 500ms
    - _Requirements: 3.1_
  
  - [-] 5.2 Implement triggerWaterAnimation function
    - Add splash and grow classes to element
    - Remove classes after animation completes
    - _Requirements: 5.2, 5.3_
  
  - [~] 5.3 Implement triggerZoomiesAnimation function
    - Add fast-shake class to element
    - Move element to random position
    - Call spawnSpeedLineEmoji
    - Remove class after animation completes
    - _Requirements: 4.2, 4.3, 4.4_

- [ ] 6. Implement audio controller module
  - [~] 6.1 Create pop sound as base64 data URL
    - Embed soft pop sound (200-300ms)
    - Use WAV or MP3 format
    - _Requirements: 3.2, 5.4, 7.1, 7.2_
  
  - [~] 6.2 Create zoom sound as base64 data URL
    - Embed boing/zoom sound (300-500ms)
    - Use WAV or MP3 format
    - _Requirements: 4.5, 7.1, 7.3_
  
  - [~] 6.3 Implement playPopSound function
    - Create new Audio() instance with pop data URL
    - Set volume to 0.4
    - Play sound with error handling
    - _Requirements: 3.2, 5.4, 7.2, 7.4_
  
  - [~] 6.4 Implement playZoomSound function
    - Create new Audio() instance with zoom data URL
    - Set volume to 0.4
    - Play sound with error handling
    - _Requirements: 4.5, 7.3, 7.4_

- [ ] 7. Implement zoomies controller module
  - [~] 7.1 Implement shouldTriggerZoomies function
    - Return true with 10% probability (Math.random() < 0.1)
    - _Requirements: 4.1_
  
  - [~] 7.2 Implement getRandomPosition function
    - Calculate x between 20% and 80% of viewport width
    - Calculate y between 20% and 80% of viewport height
    - Return {x, y} object
    - Add bounds clamping for safety
    - _Requirements: 4.3_
  
  - [~] 7.3 Implement executeZoomies function
    - Call triggerZoomiesAnimation
    - Move sunflower to random position
    - Call playZoomSound
    - _Requirements: 4.2, 4.3, 4.4, 4.5_

- [ ] 8. Implement UI renderer module
  - [x] 8.1 Create care counter display element
    - Add div with id "care-counter"
    - Style with glassmorphism
    - Display "Total Care: 0" initially
    - _Requirements: 6.1_
  
  - [x] 8.2 Implement updateCareCounterDisplay function
    - Update care counter text to show current careCount
    - _Requirements: 6.2, 6.3_
  
  - [~] 8.3 Implement spawnSpeedLineEmoji function
    - Create emoji element (💨) at given position
    - Add fade-out animation
    - Remove from DOM after 1 second
    - _Requirements: 4.4, 4.6_

- [ ] 9. Implement event handler module
  - [~] 9.1 Implement handleSunflowerClick function
    - Check if isAnimating, return early if true
    - Set isAnimating to true
    - Increment care counter
    - Check if zoomies should trigger
    - If zoomies: call executeZoomies
    - If not: call triggerHappyAnimation and playPopSound
    - Reset isAnimating after 1 second
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 4.1_
  
  - [~] 9.2 Implement handleWaterClick function
    - Check if isAnimating, return early if true
    - Set isAnimating to true
    - Increment care counter
    - Call triggerWaterAnimation
    - Call playPopSound
    - Reset isAnimating after 1 second
    - _Requirements: 5.2, 5.3, 5.4, 5.5_
  
  - [~] 9.3 Add event listeners
    - Attach click listener to sunflower element
    - Attach click listener to water button
    - Add null checks for elements
    - _Requirements: 3.1, 5.1_

- [~] 10. Create water button UI
  - Add button element with id "water-btn"
  - Set label to "Water Plant 💧"
  - Style with glassmorphism
  - Add hover effects
  - _Requirements: 5.1, 9.2_

- [ ]* 11. Write property-based tests
  - [ ]* 11.1 Write property test for sunflower click reaction
    - **Property 1: Sunflower Click Triggers Complete Reaction**
    - **Validates: Requirements 3.1, 3.2, 3.3**
    - Test that click adds wiggle class, plays pop sound, increments counter by 1
    - Use arbitrary initial careCount (0-1000)
    - Mock Math.random to return > 0.1
  
  - [ ]* 11.2 Write property test for water button action
    - **Property 2: Water Button Triggers Complete Water Action**
    - **Validates: Requirements 5.2, 5.3, 5.4, 5.5**
    - Test that water click adds splash/grow classes, plays pop sound, increments counter by 1
    - Use arbitrary initial careCount (0-1000)
  
  - [ ]* 11.3 Write property test for zoomies probability
    - **Property 3: Zoomies Probability Threshold**
    - **Validates: Requirements 4.1**
    - Test that Math.random() < 0.1 triggers zoomies, >= 0.1 triggers normal reaction
    - Use arbitrary random values (0.0-1.0)
  
  - [ ]* 11.4 Write property test for zoomies behavior
    - **Property 4: Zoomies Triggers Complete Behavior**
    - **Validates: Requirements 4.2, 4.3, 4.4, 4.5, 4.6**
    - Test that zoomies adds fast-shake class, moves position, spawns emojis, plays zoom sound
    - Use arbitrary viewport dimensions (320-3840 width, 568-2160 height)
  
  - [ ]* 11.5 Write property test for care counter display sync
    - **Property 5: Care Counter Display Synchronization**
    - **Validates: Requirements 6.3**
    - Test that DOM text matches state.careCount after each interaction
    - Use arbitrary sequence of interactions
  
  - [ ]* 11.6 Write property test for care counter accumulation
    - **Property 6: Care Counter Accumulation**
    - **Validates: Requirements 6.4, 6.2**
    - Test that careCount equals total number of interactions
    - Use arbitrary array of interactions (length 1-100)
  
  - [ ]* 11.7 Write property test for random position bounds
    - **Property 7: Random Position Bounds**
    - **Validates: Requirements 4.3**
    - Test that x in [vw*0.2, vw*0.8] and y in [vh*0.2, vh*0.8]
    - Use arbitrary viewport dimensions (320-3840 width, 568-2160 height)
  
  - [ ]* 11.8 Write property test for animation state locking
    - **Property 8: Animation State Prevents Concurrent Interactions**
    - **Validates: Requirements 3.1, 5.2 (implicit)**
    - Test that interactions are ignored when isAnimating is true
    - Use arbitrary initial careCount with isAnimating = true

- [ ]* 12. Write unit tests
  - [ ]* 12.1 Write DOM structure tests
    - Test single-file structure with embedded code
    - Test Tailwind CSS CDN link present
    - Test font CDN link present
    - Test no external script/style files
    - Test background gradient colors
    - Test SVG element colors
    - Test water button exists with correct label
    - Test care counter displays "Total Care: 0" on load
    - Test glassmorphism classes present
    - Test animation keyframes defined
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 5.1, 6.1, 8.1, 8.2, 8.3_
  
  - [ ]* 12.2 Write state management tests
    - Test initial state (careCount = 0, isAnimating = false)
    - Test incrementCareCount increases by 1
    - Test setAnimating updates flag
    - Test state persists across interactions
    - _Requirements: 6.1, 6.2, 6.4_
  
  - [ ]* 12.3 Write event handler tests
    - Test sunflower click calls handleSunflowerClick
    - Test water button click calls handleWaterClick
    - Test interactions blocked when isAnimating is true
    - Test event handlers update state correctly
    - _Requirements: 3.1, 5.1, 9.1, 9.2_
  
  - [ ]* 12.4 Write edge case tests
    - Test rapid clicking (multiple clicks within 100ms)
    - Test clicking during zoomies animation
    - Test audio playback failure (mock Audio API error)
    - Test missing DOM elements (getElementById returns null)
    - Test viewport at minimum size (320x568)
    - Test viewport at maximum size (3840x2160)
    - _Requirements: 9.1, 9.2, 10.1, 10.2, 10.3, 10.4_

- [~] 13. Add responsive interaction feedback
  - Add hover states to interactive elements
  - Ensure visual feedback within 50ms
  - Test responsiveness across screen sizes
  - _Requirements: 9.1, 9.2, 9.3_

- [~] 14. Final integration and polish
  - Verify all components work together
  - Test in Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
  - Verify animations run at 60fps
  - Verify audio latency < 100ms
  - Test on mobile (320x568) and desktop (1920x1080) viewports
  - Ensure accessibility (keyboard navigation, ARIA labels)
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [~] 15. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- The checkpoint ensures all functionality is validated before completion
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- All code is contained in a single HTML file for easy deployment
- Use vanilla JavaScript (ES6+) - no frameworks or build tools required
