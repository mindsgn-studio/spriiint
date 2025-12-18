# 🚀 Developer Onboarding

Welcome to the team! This guide is designed to get you set up and coding as quickly as possible. If you encounter any issues that aren't covered here, please ask for help or update this document!

## 🛠 Prerequisites

Before you start, make sure you have the following installed on your machine:

1.  **Node.js**: We recommend the Long Term Support (LTS) version.
    *   [Download Node.js](https://nodejs.org/)
2.  **Git**: For version control.
    *   [Download Git](https://git-scm.com/)
3.  **Code Editor**: We recommend **VS Code**.
    *   [Download VS Code](https://code.visualstudio.com/)
    *   *Recommended Extensions*: ESLint, Prettier, Expo Tools.

### Mobile Development Tools
Since this is a React Native app, you'll need tools to run it on a simulator or your phone.

*   **iOS (Mac only)**: Install Xcode from the App Store. Open it once to install the necessary components.
*   **Android**: Install Android Studio. [Guide here](https://docs.expo.dev/workflow/android-studio-emulator/).
*   **Physical Device**: Download the "Expo Go" app from the App Store or Play Store.

## 🏁 Getting Started

### 1. Clone the Repository
Open your terminal and run:
```bash
git clone <repository-url>
cd spriiint/app
```

### 2. Install Dependencies
This project uses `npm` to manage libraries. Run:
```bash
npm install
```

### 3. Environment Setup
Currently, we use a local SQLite database, so you don't need to set up complex API keys for the backend yet.

However, if you are working on features that require specific environment variables (like Apple HealthKit permissions), check `app.json` or ask a senior engineer.

## 📂 Project Tour

Here's a quick map of where things live:

*   **`app/`**: This is where the screens live. We use [Expo Router](https://docs.expo.dev/router/introduction), so the file structure here matches the navigation structure of the app.
    *   `_layout.tsx`: Acts like a wrapper for all screens (holds the database provider and navigation stack).
    *   `index.tsx`: The main Home Screen.
*   **`components/`**: Reusable UI pieces (Buttons, Cards, specific views).
*   **`store/`**: Global state management using [Zustand](https://github.com/pmndrs/zustand). This handles data like "Is today's workout done?".
*   **`db/`**: Database logic.
    *   `schema.ts`: Defines what our data looks like (tables, columns).
    *   `client.ts`: Sets up the connection to the database.
*   **`constants/`**: shared values like Colors and Fonts.

## 🏃‍♂️ Running the App

To start the development server:

```bash
npm start
```

This will output a QR code and a menu in your terminal:
*   Press `i` to run on iOS Simulator.
*   Press `a` to run on Android Emulator.
*   Scan the QR code with your phone camera (iOS) or Expo Go app (Android) to run on your physical device.

## 🗄️ Database (Drizzle ORM)

We use **Drizzle ORM** with SQLite. If you modify `db/schema.ts`, you need to generate migrations so the database updates.

1.  **Modify Schema**: Edit `db/schema.ts`.
2.  **Generate Migration**: Run `npx drizzle-kit generate`.
3.  **Run Migration**: The app automatically attempts to migrate on startup in `_layout.tsx`, or you can run specific migration scripts if configured.

## 🐛 Troubleshooting

*   **"Metro Bundler" errors**: Try closing the terminal, running `npm start -- --reset-cache`.
*   **Styles look wrong**: Check if you are in Dark Mode or Light Mode on your simulator. We support both!

## 🎓 Where to Start?

Check out `tasks.md` in the `app` folder. It contains a list of current tasks.
*   Look for tasks marked "Priority: Low" or "Refactor" to get familiar with the codebase.
*   Read `doc.md` to understand the existing functions.
*   Read `CODE_STANDARDS.md` to keep your code clean!

Happy coding!