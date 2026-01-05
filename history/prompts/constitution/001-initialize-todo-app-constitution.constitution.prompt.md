---
id: 001
title: Initialize Todo App Constitution
stage: constitution
date: 2025-12-28
surface: agent
model: gemini
feature: none
branch: main
user: User
command: /sp.constitution
labels: ["constitution","initialization"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
null
---

## Prompt

```text
This is the Gemini CLI. We are setting up the context for our chat.
Today's date is Sunday, December 28, 2025 (formatted according to the user's locale).
My operating system is: win32
The project's temporary directory is: C:\Users\ARSALAN KHAN\.gemini\tmp\a128e5a554de28b28c2ffeff58fe299465758bce88c7944b1fc23c547843e75d
I'm currently working in the directory: F:\Arsalan Khan\HACKATHONS\hackathon2\phaseii
Here is the folder structure of the current working directories:

Showing up to 200 items (files + folders). Folders or files indicated with ... contain more items not shown, were ignored, or the display limit (200 items) was reached.

F:\Arsalan Khan\HACKATHONS\hackathon2\phaseii\
├───.eslintrc.json
├───.gitignore
├───GEMINI.md
├───next.config.mjs
├───package-lock.json
├───package.json
├───postcss.config.mjs
├───README.md
├───tailwind.config.ts
├───tsconfig.json
├───.gemini\
│   └───commands\
│       ├───sp.adr.toml
│       ├───sp.analyze.toml
│       ├───sp.checklist.toml
│       ├───sp.clarify.toml
│       ├───sp.constitution.toml
│       ├───sp.git.commit_pr.toml
│       ├───sp.implement.toml
│       ├───sp.phr.toml
│       ├───sp.plan.toml
│       ├───sp.reverse-engineer.toml
│       ├───sp.specify.toml
│       ├───sp.tasks.toml
│       └───sp.taskstoissues.toml
├───.git\...
├───.specify\
│   ├───memory\
│   │   └───constitution.md
│   ├───scripts\
│   │   └───powershell\
│   │       ├───check-prerequisites.ps1
│   │       ├───common.ps1
│   │       ├───create-new-feature.ps1
│   │       ├───setup-plan.ps1
│   │       └───update-agent-context.ps1
│   └───templates\
│       ├───adr-template.md
│       ├───agent-file-template.md
│       ├───checklist-template.md
│       ├───phr-template.prompt.md
│       ├───plan-template.md
│       ├───spec-template.md
│       └───tasks-template.md
├───app\
│   ├───favicon.ico
│   ├───globals.css
│   ├───layout.tsx
│   ├───page.tsx
│   └───fonts\
│       ├───GeistMonoVF.woff
│       └───GeistVF.woff
└───node_modules\...

Reminder: Do not return an empty response when a tool call is required.

My setup is complete. I will provide my first command in the next turn. ---
description: Create or update the project constitution from interactive or provided principle inputs, ensuring all dependent templates stay in sync.
handoffs:
  - label: Build Specification
    agent: sp.specify
    prompt: Implement the feature specification based on the updated constitution. I want to build...
---

## User Input

```text
/sp.constitution # Phase One – Todo App Constitution

This document outlines the fundamental rules and principles for the **"Phase One – Todo App"** project. Adherence to this constitution is mandatory for all development activities.

---

## Core Principles

### 1. Scope & Platform Rules

1. The Todo app must be a **web-based application** built using **Next.js, Typescript and Tailwind CSS**.
2. The project must include both **frontend and backend** logic.
3. Tasks (todos) must be stored persistently in a **Neon Serverless PostgreSQL database**.
4. The application must **not be terminal / console based**.
5. Data must **persist across page refreshes and server restarts**.

---

### 2. Architecture Rules

6. **Next.js** will be used for the frontend UI and backend API routes.
7. Backend logic must be implemented using **Next.js API routes**.
8. Direct database access from the frontend is **not allowed**.
9. All database operations must go through a **dedicated backend layer**.

---

### 3. Mandatory Features Rules

10. The project will **not be considered complete** without all of the following 5 features:

* Add Task (title + description)
* View Task List (with status)
* Update Task
* Delete Task
* Mark Task as Complete / Incomplete

---

### 4. Code Quality Rules

11. Code must be **clean, readable, and well-structured**.
12. Business logic and UI logic must be **properly separated**.
13. Writing everything in a **single file is not allowed**.
14. A proper folder structure must be followed (`/app`, `/lib`, `/db`, etc.).
15. Functions must be **small and focused**.
16. Variable and function names must be **meaningful and clear**.

---

### 5. Repository Structure Rules

17. The GitHub repository must include the following items:

    * Constitution file
    * `specs/` history folder (containing all saved specifications)
    * `/app` folder (Next.js source code)
    * `/db` or `/lib` folder (database logic)
    * `README.md` (setup and run instructions)
18. The `README.md` must be **beginner-friendly**.

---

### 6. Tooling & Dependency Rules

19. Only **this agent and Spec-Kit Plus** may be used.
20. No **extra libraries** may be added without a clear and valid reason.
21. Database access must use a **PostgreSQL-compatible client** suitable for Neon.

---

### 7. Execution & Testing Rules

22. The application must run successfully in a **browser environment**.
23. All features must be **manually tested via the UI**.
24. If any required feature is missing, the AI must **explicitly state** that the project is incomplete.

---

### 8. Strict Don’ts

25. **No terminal-based UI**.
26. **No in-memory-only storage**.
27. **No over-engineering**.
28. **No extra features** beyond the specification.
29. **Do not build anything outside the spec**.
30. **Do not make assumptions** without clearly documenting them.
```

## Response snapshot

New version: 1.0.0 (initial version of the constitution).
Files flagged for manual follow-up (pending review for alignment):
- .specify/templates/plan-template.md
- .specify/templates/spec-template.md
- .specify/templates/tasks-template.md
- All files in .gemini/commands/

Suggested commit message: `docs: initialize constitution v1.0.0 with Todo App principles`

## Outcome

- ✅ Impact: Constitution initialized for "Phase One – Todo App" project.
- 🧪 Tests: N/A
- 📁 Files: `constitution.md` updated.
- 🔁 Next prompts: User will proceed with further development based on constitution.
- 🧠 Reflection: Initial constitution for the project successfully created. Templates and commands need review for alignment.

## Evaluation notes (flywheel)

- Failure modes observed: N/A
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A

```