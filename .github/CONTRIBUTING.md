# Contributing to OmniDistribute-Content-Publishing-Automation-Engine

We welcome contributions to `OmniDistribute-Content-Publishing-Automation-Engine`! This project adheres to the **Apex Technical Authority** standards, emphasizing Zero-Defect, High-Velocity, and Future-Proof development.

## 1. Our Guiding Principles

*   **Zero-Defect:** Strive for impeccable code quality and robustness. All contributions must pass automated checks and rigorous reviews.
*   **High-Velocity:** Aim for efficient development cycles. Well-defined processes and clear communication are key.
*   **Future-Proof:** Design for scalability, maintainability, and adaptability to future technology trends. Adopt modern best practices.
*   **Professionalism:** Maintain a high standard of technical documentation, code clarity, and adherence to architectural patterns.

## 2. How to Contribute

### 2.1. Reporting Issues

*   Before reporting, please check if the issue already exists.
*   Use the provided **bug report template** (`.github/ISSUE_TEMPLATE/bug_report.md`) to provide comprehensive details.
*   Include steps to reproduce, expected behavior, actual behavior, relevant environment details (OS, Node.js version, browser, etc.), and screenshots/logs if applicable.

### 2.2. Feature Requests

*   Propose new features by opening an issue.
*   Clearly describe the proposed feature, its benefits, and potential use cases.
*   We encourage discussions on new features to ensure alignment with the project's vision and architectural goals.

### 2.3. Submitting Code Changes

#### 2.3.1. Development Environment Setup

1.  **Fork the repository:** `https://github.com/chirag127/OmniDistribute-Content-Publishing-Automation-Engine/fork`
2.  **Clone your fork:** `git clone https://github.com/chirag127/OmniDistribute-Content-Publishing-Automation-Engine.git`
3.  **Navigate to the project directory:** `cd OmniDistribute-Content-Publishing-Automation-Engine`
4.  **Install dependencies:**
    bash
    uv venv .venv
    source .venv/bin/activate
    uv pip install --upgrade uv
    uv pip install -r requirements.txt
    uv pip install -r requirements-dev.txt
    
    *Note: This project uses `uv` for package management and `pip` for dependency installation, adhering to Python 3.10+ standards.* 

#### 2.3.2. Branching Strategy

*   Create a new branch for each feature or bug fix. Use descriptive names (e.g., `feat/add-devto-integration`, `fix/resolve-medium-api-error`).
*   Base your branches off the `main` branch.

#### 2.3.3. Code Standards

*   **Language:** TypeScript 6.x (Strict Mode)
*   **Bundler/Build:** Vite 7 (Rolldown)
*   **UI Framework:** TailwindCSS v4
*   **Native Integration (if applicable):** Tauri v2.x
*   **Linting & Formatting:** Biome (ultra-fast, comprehensive static analysis)
*   **Testing:** Vitest (unit), Playwright (E2E)
*   **Architecture:** Feature-Sliced Design (FSD)

*   **Linting & Formatting:** Ensure your code adheres to the project's linting and formatting rules enforced by Biome. Run `npx @biomejs/biome format --write .` and `npx @biomejs/biome lint --apply .` before committing.
*   **Testing:** All new code must be accompanied by comprehensive unit tests using Vitest. Ensure all tests pass (`npm test`). Consider adding end-to-end tests with Playwright for critical user flows.
*   **Type Safety:** Leverage TypeScript's strict type checking. Avoid `any` unless absolutely necessary and well-justified.
*   **SOLID Principles:** Adhere to SOLID principles for maintainable and scalable code.
*   **DRY (Don't Repeat Yourself):** Avoid code duplication.
*   **YAGNI (You Ain't Gonna Need It):** Implement only what is necessary for current requirements.

#### 2.3.4. Committing Changes

*   Write clear, concise commit messages following the Conventional Commits specification.
    *   Example: `feat: implement dev.to publishing integration`
    *   Example: `fix: correct API endpoint for medium.com`
    *   Example: `chore: update dependencies and linting rules`
*   Ensure all tests are passing before committing.

#### 2.3.5. Pull Requests (PRs)

*   Open a Pull Request from your feature branch to the `main` branch of the `chirag127/OmniDistribute-Content-Publishing-Automation-Engine` repository.
*   Provide a clear and descriptive title and summary for your PR.
*   Reference any related issues.
*   Ensure your PR includes all necessary changes, tests, and documentation updates.
*   The PR template (`.github/PULL_REQUEST_TEMPLATE.md`) will guide you.
*   All CI checks must pass before your PR can be merged.

## 3. Code of Conduct

This project is governed by the Contributor Covenant, version 4.0. For more details, see the **`CODE_OF_CONDUCT.md`** file (or follow the link if it were generated).

## 4. Security

If you discover any security vulnerabilities, please follow our security policy as outlined in **`.github/SECURITY.md`**.

## 5. Project Standards & Directives

This project follows the **AI Agent Directives** detailed in `AGENTS.md`. Contributions should align with these directives, ensuring the project remains maintainable and evolvable by automated systems and human contributors alike. Key aspects include:

*   **Tech Stack Definition:** Adherence to the TypeScript, Vite, TailwindCSS, Tauri (if applicable), Biome, Vitest, Playwright stack.
*   **Architectural Patterns:** Strict adherence to Feature-Sliced Design (FSD) and SOLID principles.
*   **Verification Commands:** Ensure all `npm run test`, `npx @biomejs/biome lint --apply .`, and `npx @biomejs/biome format --write .` commands pass successfully.

---