# Documentation

This document provides an overview of the codebase, including functions, components, and screens used in the Spriiint application.

## Screens

### `WorkoutScreen`
**Path:** `app/workout.tsx`

The primary screen of the application. It has evolved from a simple tracker to a guided workout companion. It acts as a state machine that renders different views based on the user's progress through the workout.

- **States & UI:**
  - **Loading:** Shown while workout data is being fetched.
  - **Rest Day:** Displays a rest message and a swipe-to-complete action if the current day is a rest day.
  - **Active Set:** Displays the current exercise name, set number (e.g., "Set 1 of 5"), and rep target.
  - **Rest Timer:** Displays a countdown timer between sets. Includes a "Skip Rest" button.
  - **Completed:** Displays a success message once all sets and exercises are finished.

- **Interactions:**
  - **Swipe Slider:** Used to confirm completion of a set or a rest day. Triggers `completeSet()`.
  - **Skip Rest:** A button to bypass the remaining rest time.

- **Animation:**
  - Uses `react-native-reanimated` for the swipe slider and transition effects.
  - Uses a local `setInterval` for the countdown timer logic.

### `IndexScreen`
**Path:** `app/index.tsx`

Currently acts as a redirection logic.
- **Behavior:** Automatically redirects the user to `/workout` on mount.

## State Management

### `useStore`
**Path:** `store/user.store.ts`

Global state management using `zustand`. It handles the complex business logic of tracking a user's position within a specific workout (Exercise -> Set).

- **State Properties:**
  - `dayIndex`: (number) The current day of the program (1-90+).
  - `currentWorkout`: (WorkoutDay) The full data object for today's plan.
  - `todayCompleted`: (boolean) Whether the entire workout is done.
  - **Progress Tracking:**
    - `currentExerciseIndex`: (number) Index of the exercise currently being performed.
    - `currentSetIndex`: (number) Index of the set currently being performed.
    - `isResting`: (boolean) Toggles the UI between Active Set and Rest Timer modes.

- **Actions:**
  - `loadTodayStatus()`: Determines the current day based on DB history. Resets local progress pointers (`currentExerciseIndex`, etc.) to 0.
  - `completeSet()`: The core logic engine.
    - Checks if the current set is the last one of the exercise.
    - Checks if the current exercise is the last one of the workout.
    - Transitions state to `isResting = true` OR calls `completeToday()` if finished.
  - `skipRest()`: Advances the pointers (`currentSetIndex` or `currentExerciseIndex`) and sets `isResting = false`.
  - `completeToday()`: Persists the completion to the SQLite database and updates the UI to the "Completed" state.

## Workout Engine

### `workouts.ts`
**Path:** `constants/workouts.ts`

A programmatic generator that creates a periodized 90-day workout plan.

- **Key Types:**
  - `ExerciseStructure`: `{ sets, reps_per_set, rest_seconds }`.
  - `WorkoutDay`: `{ status, phase, exercises[], note }`.

- **Logic (`generateWorkoutForDay`):**
  - **Phases:**
    - Days 1-30: Foundation.
    - Days 31-60: Strength.
    - Days 61-90: Performance.
  - **Weekly Cycle:**
    - Rotates intensity: Moderate -> Hard -> Recovery -> Moderate -> Peak -> Rest -> Rest.
  - **Infinite Scale:** Can generate a workout for any day number > 0.
  - **Safety:** Returns a specific "Onboarding" workout for Day < 1.

## Database

### Schema
**Path:** `db/schema.ts`

Defines the SQLite database structure using Drizzle ORM.

- **Table: `completions`**
  - `id`: Primary Key.
  - `date`: Text (YYYY-MM-DD), unique.
  - `pushups`: Integer (Stores total volume or representative reps).
  - `variation`: Text (Name of the primary exercise or "Rest Day").
  - `completedAt`: Text (ISO Timestamp).

### Client
**Path:** `db/client.ts`
- Initializes the Expo SQLite connection and wraps it with Drizzle.

## Navigation & Layout

### `RootLayout`
**Path:** `app/_layout.tsx`
- Wraps the application in `SQLiteProvider` and `GestureHandlerRootView`.
- Handles database migrations on startup.

## Hooks

### `useThemeColor` & `useColorScheme`
**Path:** `hooks/`
- Utilities for handling Light/Dark mode (currently used partially, with some hardcoded styles in `workout.tsx` for a specific dark aesthetic).