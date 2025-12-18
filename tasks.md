# Project Feedback & Next Tasks

## Feedback

### Strengths
1.  **Architecture**: The use of **Zustand** for state management combined with **Drizzle ORM** for persistence is a robust and scalable choice for this scale of app.
2.  **UX**: The swipe-to-complete interaction using `react-native-reanimated` and `react-native-gesture-handler` provides a polished, tactile feel suitable for a fitness tracker.
3.  **Simplicity**: The code focuses well on the "minimal" aim.

### Areas for Improvement
1.  **Theming Consistency**:
    - `app/index.tsx` currently uses hardcoded hex values (e.g., `#000`, `#666`).
    - The project has a robust theming system in `constants/theme.ts` and `hooks/use-theme-color.ts` that is currently being ignored in the main screen. This will make Dark/Light mode support inconsistent.

2.  **Apple HealthKit Integration**:
    - The integration is currently commented out and mocked with `console.log`.
    - Real implementation requires package installation (`react-native-health`), permission handling, and Info.plist configuration.

3.  **Component Structure**:
    - `HomeScreen` is becoming a "God component". The Swipe Slider logic and styles should be extracted into a dedicated component to improve readability and maintainability.

## Next Tasks

### 0. Fix Syntax Error
**Priority: Critical**
Remove the stray `ß` character in `app/index.tsx` which is causing a syntax error.

### 1. Refactor Theming
**Priority: High**
Update `app/index.tsx` to use the `useThemeColor` hook or `Colors` constants instead of hardcoded strings.

- [ ] Import `useThemeColor`.
- [ ] Replace `backgroundColor: "#000"` with theme background.
- [ ] Replace text colors with theme text/icon colors.

### 2. Implement Apple HealthKit
**Priority: High**
Complete the "syncs to Apple Fitness" requirement.

- [ ] Install `react-native-health` (or `expo-health-kit` if available/preferred).
- [ ] Add `NSHealthShareUsageDescription` and `NSHealthUpdateUsageDescription` to `app.json` (or `Info.plist`).
- [ ] Create a `hooks/useHealthKit.ts` to manage permissions and saving workouts.
- [ ] Replace the mocked `logWorkout` function in `index.tsx` with the real hook.

### 3. Component Extraction
**Priority: Medium**
Refactor `HomeScreen` to separate concerns.

- [ ] Create `components/SwipeButton.tsx`.
- [ ] Move gesture logic (`panGesture`, `useSharedValue`, `useAnimatedStyle`) into this new component.
- [ ] Pass `onComplete` as a prop.

### 4. Data Refinement
**Priority: Low**
- [ ] **Variations Logic**: Currently, variations cycle strictly based on the day count (`(day - 1) % LENGTH`). Consider storing the variation in the `workouts` or `completions` table *before* completion if you want users to be able to see "tomorrow's workout" consistently or if you want to support skipping/changing variations.
- [ ] **Date Handling**: Verify that `format(new Date(), "yyyy-MM-dd")` handles late-night workouts correctly according to the user's expected "day" (e.g., does a 1 AM workout count for the previous day?).