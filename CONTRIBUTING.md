# Contributing to Spriiint

First off, thank you for considering contributing to Spriiint! 🎉

We want this project to be a welcoming place for developers of all skill levels. Whether you're fixing a typo, adding a feature, or refactoring code, your help is appreciated.

This document contains guidelines to help you contribute effectively.

## 🚀 Getting Started

1.  **Find a Task**: Check out `app/tasks.md` for a list of recommended next steps. You can also look at the "Issues" tab on GitHub.
    - If you are a beginner, look for tasks labeled `Priority: Low` or `good first issue`.
2.  **Fork & Clone**: Fork the repository to your GitHub account and clone it locally.
    ```bash
    git clone https://github.com/YOUR_USERNAME/spriiint.git
    cd spriiint
    ```
3.  **Install Dependencies**: Follow the instructions in `ONBOARDING.md` to get your environment set up.

## 🌿 Branching Strategy

We use a feature-branch workflow. This means you should never push directly to the `main` branch.

1.  **Sync with Main**: Make sure your local `main` is up to date.
    ```bash
    git checkout main
    git pull origin main
    ```
2.  **Create a Branch**: Create a new branch for your specific task.
    - Format: `type/short-description`
    - Examples:
        - `feat/add-healthkit`
        - `fix/swipe-gesture`
        - `docs/update-readme`
        - `chore/upgrade-deps`

    ```bash
    git checkout -b feat/my-cool-feature
    ```

## 🛠️ Development Workflow

1.  **Follow Standards**: Please read `app/CODE_STANDARDS.md` before writing code. It explains our naming conventions and tech stack choices.
2.  **Keep it Small**: Try to keep your changes focused on a single task. Small Pull Requests (PRs) are easier to review and merge.
3.  **Test Your Work**:
    - Run the app on a simulator or device to ensure it works as expected.
    - If you add logic, consider adding tests (if applicable).

## 💾 Commit Messages

We encourage the use of [Conventional Commits](https://www.conventionalcommits.org/). This makes our history easy to read.

**Format**: `type: description`

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `chore`: Changes to the build process or auxiliary tools

**Examples**:
- `feat: add swipe to complete animation`
- `fix: correct typo in daily goal calculation`
- `docs: update onboarding guide`

## 📝 Submitting a Pull Request (PR)

1.  **Push your branch**: `git push origin feat/my-cool-feature`
2.  **Open a PR**: Go to the repository on GitHub and click "Compare & pull request".
3.  **Fill out the Template**: We have a PR template. Please fill out the "Summary", "Type of Change", and "Test Plan" sections.
4.  **Request Review**: Request a review from a maintainer.
5.  **Address Feedback**: If changes are requested, make them on your local branch and push again. The PR will update automatically.

## 🤝 Community Guidelines

- **Be Respectful**: Treat everyone with respect and kindness.
- **Ask Questions**: There are no stupid questions. If you are stuck, ask for help in the PR or an issue.
- **Be Patient**: We will review your PR as soon as possible.

Happy Coding! 🏃💨