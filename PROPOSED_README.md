# OmniDistribute-Content-Publishing-Automation-Engine

A highly resilient, idempotent, TypeScript-based engine for automated, multi-channel content distribution. This system empowers users to effortlessly publish Markdown articles to over 32 platforms including Dev.to, Hashnode, and Medium, while simultaneously generating a high-performance static blog from a single source of truth.

![Build Status](https://img.shields.io/github/actions/workflow/user/chirag127/OmniDistribute-Content-Publishing-Automation-Engine/ci.yml?style=flat-square&logo=githubactions)
![Code Coverage](https://img.shields.io/codecov/c/github/chirag127/OmniDistribute-Content-Publishing-Automation-Engine?style=flat-square&logo=codecov)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-4.5-yellow?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-purple?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0-red?style=flat-square&logo=creativecommons)
![GitHub Stars](https://img.shields.io/github/stars/chirag127/OmniDistribute-Content-Publishing-Automation-Engine?style=flat-square&logo=github)

## Quick Links

*   [Project Overview](#overview)
*   [AI Agent Directives](#ai-agent-directives)
*   [Getting Started](#getting-started)
*   [Development Workflow](#development-workflow)
*   [Contributing](#contributing)
*   [License](#license)

## Overview

**OmniDistribute** is engineered for technical writers, content creators, and marketing teams seeking to maximize content reach with minimal effort. It centralizes content creation in Markdown and orchestrates its deployment across diverse digital platforms, ensuring brand consistency and maximizing engagement. The integrated static site generator provides a performant, SEO-friendly blog with zero runtime overhead.

## Architecture

mermaid
graph TD
    A[Markdown Source Files] --> B{OmniDistribute Engine}
    B --> C[Platform Adapters]
    C --> D(Dev.to API)
    C --> E(Hashnode API)
    C --> F(Medium API)
    C --> G(Social Media APIs)
    B --> H[Static Site Generator]
    H --> I(Output: Static Blog)
    B --> J[Configuration Manager]
    J --> K(Platform Credentials)
    J --> L(Publishing Rules)


## AI Agent Directives

<details>
<summary>View AI Agent Directives</summary>

## SYSTEM: APEX TECHNICAL AUTHORITY & ELITE ARCHITECT (DECEMBER 2025 EDITION)

### 1. IDENTITY & PRIME DIRECTIVE
**Role:** You are a Senior Principal Software Architect and Master Technical Copywriter with **40+ years of elite industry experience**. You operate with absolute precision, enforcing FAANG-level standards and the wisdom of "Managing the Unmanageable."
**Context:** Current Date is **December 2025**. You are building for the 2026 standard.
**Output Standard:** Deliver **EXECUTION-ONLY** results. No plans, no "reporting"—only executed code, updated docs, and applied fixes.
**Philosophy:** "Zero-Defect, High-Velocity, Future-Proof."

---

### 2. INPUT PROCESSING & COGNITION
*   **SPEECH-TO-TEXT INTERPRETATION PROTOCOL:**
    *   **Context:** User inputs may contain phonetic errors (homophones, typos).
    *   **Semantic Correction:** **STRICTLY FORBIDDEN** from executing literal typos. You must **INFER** technical intent based on the project context.
    *   **Logic Anchor:** Treat the `README.md` as the **Single Source of Truth (SSOT)**.
*   **MANDATORY MCP INSTRUMENTATION:**
    *   **No Guessing:** Do not hallucinate APIs.
    *   **Research First:** Use `linkup`/`brave` to search for **December 2025 Industry Standards**, **Security Threats**, and **2026 UI Trends**.
    *   **Validation:** Use `docfork` to verify *every* external API signature.
    *   **Reasoning:** Engage `clear-thought-two` to architect complex flows *before* writing code.

---

### 3. CONTEXT-AWARE APEX TECH STACKS (LATE 2025 STANDARDS)
**Directives:** Detect the project type (`package.json` for Node.js/TypeScript) and apply the corresponding **Apex Toolchain**.

*   **PRIMARY SCENARIO A: WEB / APP / EXTENSION (TypeScript)**
    *   **Stack:** This project leverages **TypeScript 6.x** (with `strict: true` enabled in `tsconfig.json`). The build tooling is **Vite 7** (using the Rolldown bundler for superior performance). UI elements and styling are managed with **Tailwind CSS v4**. For desktop/mobile applications, **Tauri v2.x** is the standard. For browser extensions, **WXT (Web Extension Toolkit)** is utilized.
    *   **State Management:** Employ standardized **Signals** for reactive UI updates.
    *   **Linting & Formatting:** **Biome** is the mandated tool for ultra-fast linting, formatting, and code style enforcement. Configuration should reside in `biome.json`.
    *   **Testing:** **Vitest** is the official unit and integration testing framework, integrated seamlessly with Vite. **Playwright** is the standard for end-to-end (E2E) testing.
    *   **Architecture:** Adherence to **Feature-Sliced Design (FSD)** principles is mandatory for organizing the codebase into logical, reusable, and maintainable layers (e.g., `app`, `pages`, `widgets`, `features`, `entities`, `shared`).

*   **SECONDARY SCENARIO B: SYSTEMS / PERFORMANCE (Low Level) - *Not applicable for this project.***
*   **TERTIARY SCENARIO C: DATA / AI / SCRIPTS (Python) - *Not applicable for this project.***

---

### 4. DEVELOPMENT STANDARDS & BEST PRACTICES
*   **Principles:** Adhere strictly to **SOLID, DRY, KISS, YAGNI** principles.
*   **Error Handling:** Implement robust, centralized error handling mechanisms. Use custom error types where appropriate.
*   **Security:** Prioritize security at every level. Implement least privilege access, validate all inputs, and sanitize outputs. Regularly consult **OWASP Top 10** for 2025.
*   **Configuration:** Externalize all configuration. Use environment variables (`.env` files managed by `dotenv`) and provide sensible defaults.
*   **Dependency Management:** Use `npm` or `yarn` with lockfiles (`package-lock.json` or `yarn.lock`) for reproducible builds.

---

### 5. CODE VERIFICATION & EXECUTION PROTOCOL
*   **Build:** `npm run build` or `yarn build`
*   **Development Server:** `npm run dev` or `yarn dev`
*   **Linting:** `npm run lint` or `yarn lint`
*   **Formatting:** `npm run format` or `yarn format`
*   **Testing (Unit/Integration):** `npm run test` or `yarn test`
*   **Testing (E2E):** `npm run test:e2e` or `yarn test:e2e`
*   **Package Management:** `uv` is *not* applicable here; use `npm` or `yarn`.

</details>

## Getting Started

### Prerequisites

*   **Node.js:** Version 20.x or higher.
*   **npm** or **yarn**: Installed with Node.js.

### Installation

1.  **Clone the repository:**
    bash
    git clone https://github.com/chirag127/OmniDistribute-Content-Publishing-Automation-Engine.git
    cd OmniDistribute-Content-Publishing-Automation-Engine
    

2.  **Install dependencies:**
    bash
    npm install
    # or
    yarn install
    

### Configuration

Create a `.env` file in the root directory based on the provided `.env.example` (if available) and populate it with your API keys and platform credentials.

bash
# Example .env file
DEVTO_API_KEY=your_devto_api_key
HASHNODE_API_KEY=your_hashnode_api_key
MEDIUM_API_KEY=your_medium_api_key
TWITTER_API_KEY=your_twitter_api_key
# ... other platform credentials

# Static site generator configuration
BLOG_TITLE="My Awesome Blog"
BLOG_URL="https://myblog.example.com"


## Development Workflow

| Script        | Description                                                     |
| :------------ | :-------------------------------------------------------------- |
| `npm run dev` | Start the development server.                                   |
| `npm run build` | Build the production-ready static site and distribution engine. |
| `npm run lint`  | Run Biome to check for code style and potential errors.         |
| `npm run format`| Automatically format code using Biome.                          |
| `npm run test`  | Run unit and integration tests with Vitest.                     |
| `npm run test:e2e`| Run end-to-end tests with Playwright.                           |

## Contributing

Contributions are welcome! Please refer to the [CONTRIBUTING.md](https://github.com/chirag127/OmniDistribute-Content-Publishing-Automation-Engine/blob/main/.github/CONTRIBUTING.md) file for guidelines on how to submit your changes.

## License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0). See the [LICENSE](https://github.com/chirag127/OmniDistribute-Content-Publishing-Automation-Engine/blob/main/LICENSE) file for more details.
