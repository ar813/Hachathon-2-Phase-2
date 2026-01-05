---
id: 001
title: Create Todo App Specification
stage: spec
date: 2025-12-28
surface: agent
model: gemini
feature: 001-todo-app
branch: main
user: User
command: /sp.specify
labels: ["spec","feature"]
links:
  spec: specs/001-todo-app/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-todo-app/spec.md
  - specs/001-todo-app/checklists/requirements.md
tests:
null
---

## Prompt

```text
# Phase One – Todo App Specification This specification defines the **step-by-step, task-wise implementation plan** for the **Phase One – Todo App**, strictly aligned with the approved Constitution. --- ## 1. Project Objective Build a **production-ready Todo web application** using **Next.js, TypeScript, and Tailwind CSS**, where tasks are **persistently stored** in a **Neon Serverless PostgreSQL database** and accessed through **Next.js API routes**. --- ## 2. Environment Configuration ### 2.1 Environment Variables The project **must include** a `.env.local` file at the root level. Required variable: * `NEON_CONNECTION_STRING` This variable will be used **exclusively** to establish a connection with the Neon PostgreSQL database. ❗ Hardcoding database credentials is **strictly prohibited**. --- ## 3. Database Specification ### 3.1 Database Setup File * A **dedicated SQL file** must be included in the repository (e.g. `/db/schema.sql`). * This file must contain the **SQL query to create the `todos` table**. * The query must be executable directly on Neon PostgreSQL. * The purpose of this file is **schema clarity and reproducibility**. --- ### 3.2 Database Type ### 3.1 Database Type * Neon **Serverless PostgreSQL** ### 3.3 Todos Table Schema The database must include a `todos` table with the following fields: * `id` (UUID, Primary Key) * `title` (Text, Required) * `description` (Text, Optional) * `completed` (Boolean, Default: false) * `created_at` (Timestamp, Auto-generated) * `updated_at` (Timestamp, Auto-generated) --- ## 4. Backend (API Routes) Specification All backend logic must be implemented using **Next.js API routes**. ### 4.1 Task Breakdown – Backend **Task 1: Database Connection Layer** * Create a reusable database client module. * Read `NEON_CONNECTION_STRING` from `.env.local`. * Ensure safe and reusable connection handling. **Task 2: Create Todo (POST)** * Endpoint to create a new task. * Accepts `title` and `description`. * Stores data in the database. **Task 3: Read Todos (GET)** * Endpoint to fetch all tasks. * Returns task list with completion status. **Task 4: Update Todo (PUT)** * Endpoint to update task title or description. * Task must be identified by `id`. **Task 5: Delete Todo (DELETE)** * Endpoint to delete a task by `id`. **Task 6: Toggle Completion (PATCH)** * Endpoint to mark a task as complete or incomplete. --- ## 5. Frontend (UI) Specification ### 5.1 Page Rules * The application must use **a single-page architecture**. * Only **one page** is allowed for Phase One. * Multi-page routing is **strictly prohibited**. * All UI interactions (add, update, delete, toggle) must occur on the same page without navigation. --- ### 5.2 Pages & Components ### 5.3 Components * Main Todo page * Add Todo form * Todo list * Todo item ### 5.2 Task Breakdown – Frontend **Task 7: UI Layout** * Responsive layout using Tailwind CSS. * Clean and minimal design. **Task 8: Add Todo UI** * Input fields for title and description. * Submit button triggers API call. **Task 9: Display Todo List** * Fetch todos from backend. * Show completion status visually. **Task 10: Update Todo UI** * Edit title and description. **Task 11: Delete Todo UI** * Delete button for each task. **Task 12: Toggle Completion UI** * Checkbox or toggle button. --- ## 6. Data Flow Rules 1. UI triggers an API request. 2. API route validates input. 3. API route interacts with Neon database. 4. Response is returned to the frontend. 5. UI updates state based on response. Direct database access from the UI is **not allowed**. --- ## 7. Error Handling Rules * API must return meaningful error messages. * Frontend must handle loading and error states. * Silent failures are **not allowed**. --- ## 8. Testing & Validation * Each API endpoint must be manually tested. * UI must be tested for all user flows. * Missing any mandatory feature marks the project **incomplete**. --- ## 9. Completion Criteria The project is considered complete only when: * All 5 mandatory features work correctly. * Data persists in Neon PostgreSQL. * `.env.local` uses `NEON_CONNECTION_STRING` correctly. * Constitution and specification are fully respected. --- ## 10. Out of Scope (Phase One) * Multi-page routing * Authentication * User accounts * Filters or search * Animations or advanced UI * Real-time updates
```

## Response snapshot

The specification for "Phase One – Todo App" has been successfully created.
**Feature Name:** `001-todo-app`
**Specification File:** `specs/001-todo-app/spec.md`
**Checklist File:** `specs/001-todo-app/checklists/requirements.md`
**Validation:** All quality checklist items passed. The specification is complete and ready for planning.
**Next Step:** You can now proceed to `/sp.plan` to create a technical plan based on this specification.
**Manual Action Required:** Due to PowerShell execution policy restrictions, the git branch `001-todo-app` was not automatically created. Please create it manually if you wish to work on this feature in a dedicated branch (`git checkout -b 001-todo-app`).

## Outcome

- ✅ Impact: Feature specification for "Phase One – Todo App" created and validated.
- 🧪 Tests: N/A
- 📁 Files: `specs/001-todo-app/spec.md`, `specs/001-todo-app/checklists/requirements.md` created.
- 🔁 Next prompts: User to run `/sp.plan`
- 🧠 Reflection: Successfully generated feature specification and checklist. Manual git branch creation due to PowerShell policy.

## Evaluation notes (flywheel)

- Failure modes observed: PowerShell script execution blocked by security policy.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
