# Phase One – Todo App Constitution

This document outlines the fundamental rules and principles for the **"Phase One – Todo App"** project. Adherence to this constitution is mandatory for all development activities.

<!--
Sync Impact Report:
Version change: 0.0.0 -> 1.0.0
List of modified principles: All principles are new.
Added sections: Core Principles, Governance.
Removed sections: None (as it's a new constitution).
Templates requiring updates:
- .specify/templates/plan-template.md: ⚠ pending
- .specify/templates/spec-template.md: ⚠ pending
- .specify/templates/tasks-template.md: ⚠ pending
- .gemini/commands/sp.adr.toml: ⚠ pending
- .gemini/commands/sp.analyze.toml: ⚠ pending
- .gemini/commands/sp.checklist.toml: ⚠ pending
- .gemini/commands/sp.clarify.toml: ⚠ pending
- .gemini/commands/sp.constitution.toml: ⚠ pending
- .gemini/commands/sp.git.commit_pr.toml: ⚠ pending
- .gemini/commands/sp.implement.toml: ⚠ pending
- .gemini/commands/sp.phr.toml: ⚠ pending
- .gemini/commands/sp.plan.toml: ⚠ pending
- .gemini/commands/sp.reverse-engineer.toml: ⚠ pending
- .gemini/commands/sp.specify.toml: ⚠ pending
- .gemini/commands/sp.tasks.toml: ⚠ pending
- .gemini/commands/sp.taskstoissues.toml: ⚠ pending
Follow-up TODOs: None
-->

## Core Principles

### 1. Scope & Platform Rules

1.  The Todo app must be a **web-based application** built using **Next.js, Typescript and Tailwind CSS**.
2.  The project must include both **frontend and backend** logic.
3.  Tasks (todos) must be stored persistently in a **Neon Serverless PostgreSQL database**.
4.  The application must **not be terminal / console based**.
5.  Data must **persist across page refreshes and server restarts**.

### 2. Architecture Rules

6.  **Next.js** will be used for the frontend UI and backend API routes.
7.  Backend logic must be implemented using **Next.js API routes**.
8.  Direct database access from the frontend is **not allowed**.
9.  All database operations must go through a **dedicated backend layer**.

### 3. Mandatory Features Rules

10. The project will **not be considered complete** without all of the following 5 features:

    *   Add Task (title + description)
    *   View Task List (with status)
    *   Update Task
    *   Delete Task
    *   Mark Task as Complete / Incomplete
    *   **User Authentication (Signup, Login, Logout)**

### 4. Code Quality Rules

11. Code must be **clean, readable, and well-structured**.
12. Business logic and UI logic must be **properly separated**.
13. Writing everything in a **single file is not allowed**.
14. A proper folder structure must be followed (`/app`, `/lib`, `/db`, etc.).
15. Functions must be **small and focused**.
16. Variable and function names must be **meaningful and clear**.

### 5. Repository Structure Rules

17. The GitHub repository must include the following items:

    *   Constitution file
    *   `specs/` history folder (containing all saved specifications)
    *   `/app` folder (Next.js source code)
    *   `/db` or `/lib` folder (database logic)
    *   `README.md` (setup and run instructions)
18. The `README.md` must be **beginner-friendly**.

### 6. Tooling & Dependency Rules

19. Only **this agent and Spec-Kit Plus** may be used.
20. No **extra libraries** may be added without a clear and valid reason.
21. Database access must use a **PostgreSQL-compatible client** suitable for Neon.

### 7. Execution & Testing Rules

22. The application must run successfully in a **browser environment**.
23. All features must be **manually tested via the UI**.
24. If any required feature is missing, the AI must **explicitly state** that the project is incomplete.

### 8. Strict Don’ts

25. **No terminal-based UI**.
26. **No in-memory-only storage**.
27. **No over-engineering**.
28. **No extra features** beyond the specification.
29. **Do not build anything outside the spec**.
30. **Do not make assumptions** without clearly documenting them.

## Governance

Adherence to this constitution is mandatory for all development activities. Amendments to this document require a formal review process and consensus among stakeholders. Any changes must be documented with a version bump and rationale.

**Version**: 1.0.0 | **Ratified**: 2025-12-28 | **Last Amended**: 2025-12-28