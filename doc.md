# Documentation

This document provides an overview of the codebase, including functions, components, and screens used in the Spriiint application.

## Screens

### `HomeScreen`
**Path:** `app/index.tsx`

The primary screen of the application. It displays the daily goal and handles user interaction for completing workouts.

- **UI Components:**
  - Displays current day number (which equals the push-up count).
  - Displays the specific push-up variation.
  - **Swipe Slider:** A custom gesture-controlled slider built with `react-native-gesture-handler` and `react-native-reanimated`. Users swipe right to confirm completion.
  - **Completion View:** Replaces the slider once the workout is marked as done.

- **Key Functions:**
  - `logWorkout()`: *Async*. Prepares workout data (calories, dates). Currently logs to console but intended to wrap Apple HealthKit logic.
  - `handleComplete()`: *Async*. A composite function that calls `completeToday` from the store, attempts to log the workout, and refreshes the daily status.
  - `panGesture`: Defines the swipe interaction logic, updating `translateX` shared value and triggering completion when the threshold is met.

## State Management

### `useStore`
**Path:** `store/user.store.ts`

Global state management using `zustand`. It handles business logic for determining the current workout plan and persisting results.

- **State:**
  - `currentDay`: (number) The current day index, determining the number of push-ups.
  - `todayCompleted`: (boolean) Whether the daily goal has been met.
  - `currentVariation`: (string) The type of push-up assigned for today.

- **Actions:**
  - `loadTodayStatus()`: *Async*. Queries the `completions` table.
    - If a record exists for `today`, sets state to completed.
    - If not, calculates the next day (total records + 1) and determines the variation based on a rotational array.
  - `completeToday(pushups, variation)`: *Async*. Inserts a new record into the `completions` table and updates the UI state.

- **Constants:**
  - `VARIATIONS`: An array of push-up types (`Standard`, `Wide`, `Diamond`, etc.) cycled through based on the day count.

## Database

### Schema
**Path:** `db/schema.ts`

Defines the SQLite database structure using Drizzle ORM.

- **Tables:**
  - `completions`:
    - `id`: Primary Key (Auto-increment Integer).
    - `date`: Text (YYYY-MM-DD), unique constraint to ensure one entry per day.
    - `pushups`: Integer, number of reps performed.
    - `variation`: Text, type of push-up.
    - `completedAt`: Text, ISO timestamp of completion.
  - `workouts`: Basic table definition (currently unused/minimal).

### Client
**Path:** `db/client.ts`

Initializes the database connection.

- **Exports:**
  - `db`: The Drizzle ORM instance.
  - `expo_sqlite`: The raw Expo SQLite connection.
  - `DATABASE_NAME`: "spriiint.db".

## Navigation & Layout

### `RootLayout`
**Path:** `app/_layout.tsx`

The entry point wrapper for the Expo Router application.

- **Responsibilities:**
  - **Database Migrations:** Runs `useMigrations` to ensure DB schema is up to date on app start.
  - **Providers:** Wraps the app in `SQLiteProvider` and `GestureHandlerRootView`.
  - **Suspense:** Shows a loading indicator while the database initializes.
  - **Navigation:** Renders a `Stack` navigator.

## Hooks

### `useThemeColor`
**Path:** `hooks/use-theme-color.ts`

A utility hook to retrieve color values based on the current system theme (light vs dark).

- **Parameters:**
  - `props`: Object containing specific `light` or `dark` overrides.
  - `colorName`: Key of the defined colors in `constants/theme.ts`.

### `useColorScheme`
**Path:** `hooks/use-color-scheme.ts`

Re-exports `useColorScheme` from `react-native` (or a web-compatible version). Used to detect system theme preferences.

## Constants

### `Theme`
**Path:** `constants/theme.ts`

- **`Colors`**: Defines the color palette for `light` and `dark` modes (text, background, tint, etc.).
- **`Fonts`**: Defines font families for different platforms (iOS, Android, Web).