# Code Standards

## 1. General Principles
- **Simplicity**: Keep code simple and readable. Prefer clarity over cleverness.
- **DRY (Don't Repeat Yourself)**: Extract reusable logic into hooks or utility functions.
- **Consistency**: Follow the patterns established in existing files.

## 2. Tech Stack
- **Framework**: React Native (Expo).
- **Language**: TypeScript.
- **Database**: SQLite with Drizzle ORM.
- **State Management**: Zustand.
- **Routing**: Expo Router (File-based routing).
- **Animations**: React Native Reanimated.
- **Gestures**: React Native Gesture Handler.

## 3. Naming Conventions

### Files & Directories
- **Directories**: Use `kebab-case` (e.g., `app/components`, `app/hooks`).
- **Files**: Use `kebab-case` (e.g., `user-profile.tsx`, `schema.ts`).
  - *Exception*: Special Expo Router files (e.g., `_layout.tsx`, `index.tsx`).

### Code Symbols
- **Components**: `PascalCase` (e.g., `HomeScreen`).
- **Functions & Variables**: `camelCase` (e.g., `logWorkout`, `translateX`).
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `SWIPE_THRESHOLD`, `DATABASE_NAME`).
- **Types/Interfaces**: `PascalCase` (e.g., `StoreState`, `Completions`).

## 4. React & React Native

### Components
- Use **Functional Components** with hooks.
- Prefer named exports for components (except for Screens in `app/` which often default export).
- Co-locate styles using `StyleSheet.create` at the bottom of the file or in a separate file if large.

### Hooks
- Prefix custom hooks with `use`.
- Place logic in hooks to keep components clean (View/Logic separation).

### Styling
- Avoid inline styles where possible; use `StyleSheet`.
- Use `Dimensions` API sparingly; prefer flexbox layout.
- Use theme constants from `@/constants/theme`.

## 5. State Management (Zustand)
- Stores should define a clear Interface for State and Actions.
- Actions should be async if they perform side effects (DB calls).
- Keep store logic pure where possible, delegating side effects to service layers if complex.

## 6. Database (Drizzle ORM)
- Define schemas in `db/schema.ts`.
- Use async/await for all DB operations.
- Handle migrations via `drizzle-kit` or the Expo migration hook in `_layout.tsx`.
- Use Drizzle types (e.g., `$inferSelect`) for type safety.

## 7. TypeScript
- **No `any`**: Explicitly define types.
- Use `interface` for object definitions and `type` for unions/aliases.
- Export types that are used across multiple files.

## 8. Path Aliases
- Use absolute imports with `@/` prefix.
  - `@/components/*`
  - `@/hooks/*`
  - `@/db/*`
  - `@/store/*`
  - `@/constants/*`

## 9. Error Handling
- Wrap async operations (especially DB and API calls) in `try/catch`.
- Log errors meaningfully for debugging.

## 10. Comments & Documentation
- Document complex logic with inline comments.
- JSDoc format for utility functions explaining parameters and return values.