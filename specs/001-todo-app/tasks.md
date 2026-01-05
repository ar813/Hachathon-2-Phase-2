---

description: "Task list for Phase One – Todo App implementation"
---

# Tasks: Phase One – Todo App

**Input**: Design documents from `/specs/001-todo-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create Next.js project with TypeScript and Tailwind CSS: run `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
- [x] T002 Configure `tsconfig.json` for strict checks and path aliases.
- [x] T003 [P] Create `.env.local` file in the root directory.
- [x] T004 Create `types/todo.ts` to define the `Todo` interface.
- [x] T005 Create `db/schema.sql` with the DDL for the `todos` table.

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Install PostgreSQL client dependency (e.g., `npm install pg` or `npm install @vercel/postgres` if using Vercel's wrapper). (Manual execution needed due to system restrictions)
- [x] T007 Implement database connection and query utility in `lib/db.ts`.
- [x] T008 Implement `createTodo` database operation in `lib/db.ts`.
- [x] T009 Implement `getAllTodos` database operation in `lib/db.ts`.
- [x] T010 Implement `getTodoById` database operation in `lib/db.ts`.
- [x] T011 Implement `updateTodo` database operation in `lib/db.ts`.
- [x] T012 Implement `deleteTodo` database operation in `lib/db.ts`.
- [x] T013 Implement `toggleTodoCompletion` database operation in `lib/db.ts`.
- [x] T014 Create root `app/layout.tsx` with basic HTML structure and Tailwind CSS imports.
- [x] T015 Create base `app/page.tsx` for the main application entry point.

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

## Phase 2.5: Authentication with Better-Auth (Priority: P0) 🔐

**Goal**: Secure the application with user accounts and session management using **better-auth** library.

**Independent Test**: Register a new user, log in (email/password or GitHub), view protected resources, and log out.

### Implementation for Authentication (Better-Auth)

- [x] T015-A Install better-auth library: `npm install better-auth`
- [x] T015-B Create `lib/auth.ts` for server-side better-auth configuration (email/password + GitHub OAuth)
- [x] T015-C Create `lib/auth-client.ts` for client-side React hooks (`useSession`, `signIn`, `signUp`, `signOut`)
- [x] T015-D Create `app/api/auth/[...all]/route.ts` unified authentication endpoint
- [x] T015-E Create database migration `db/schema.sql` with better-auth tables (user, session, account, verification)
- [x] T015-F Update `app/signup/page.tsx` to use better-auth `signUp.email()` and add GitHub OAuth button
- [x] T015-G Update `app/login/page.tsx` to use better-auth `signIn.email()` and add GitHub OAuth button
- [x] T015-H Update `app/(components)/Navbar.tsx` to use `useSession()` hook for auth state
- [x] T015-I Update `app/layout.tsx` to wrap with ToastProvider (removed server-side auth checks)
- [x] T015-J Update `middleware.ts` to check better-auth session cookies instead of JWT
- [x] T015-K Update `lib/db.ts` to change user ID type from number to string (TEXT)
- [x] T015-L Update `app/api/todos/route.ts` to use better-auth `auth.api.getSession()` for user ID
- [x] T015-M Delete old authentication routes: `/api/signup`, `/api/login`, `/api/logout`
- [x] T015-N Add environment variables: BETTER_AUTH_SECRET, BETTER_AUTH_URL, NEXT_PUBLIC_BETTER_AUTH_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET

**Features Added**:
- Email/password authentication (automatic password hashing)
- GitHub OAuth login
- User avatar support (from OAuth)
- Session management with secure cookies
- CSRF protection (built-in)
- useSession() React hook for auth state

**Checkpoint**: Authentication system fully functional with better-auth.

## Phase 3: User Story 1 - Add a New Task (Priority: P1) 🎯 MVP

**Goal**: Allow users to add new tasks via a form, persisting them to the database.

**Independent Test**: Fill in the Add Task form, submit, and verify the new task appears in the list and is persistent across page refreshes.

### Implementation for User Story 1

- [x] T016 [P] [US1] Create `app/api/todos/route.ts` for handling POST requests to create a Todo.
- [x] T017 [US1] Implement POST API route logic for `createTodo` in `app/api/todos/route.ts`.
- [x] T018 [P] [US1] Create `app/(components)/AddTodoForm.tsx` UI component with input fields for title and description, and a submit button.
- [x] T019 [US1] Integrate `AddTodoForm` into `app/page.tsx`.
- [x] T020 [US1] Implement client-side logic in `AddTodoForm.tsx` to call the POST `/api/todos` endpoint on form submission.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

## Phase 4: User Story 2 - View Task List (Priority: P1)

**Goal**: Display all existing tasks from the database on the main page.

**Independent Test**: Navigate to the main page and observe that all tasks (including newly added ones) are displayed correctly with their status.

### Implementation for User Story 2

- [x] T021 [P] [US2] Update `app/api/todos/route.ts` to handle GET requests to retrieve all Todos.
- [x] T022 [US2] Implement GET API route logic for `getAllTodos` in `app/api/todos/route.ts`.
- [x] T023 [P] [US2] Create `app/(components)/TodoList.tsx` UI component to render a list of `TodoItem`s.
- [x] T024 [P] [US2] Create `app/(components)/TodoItem.tsx` UI component to display a single Todo's title, description, and completion status.
- [x] T025 [US2] Integrate `TodoList` into `app/page.tsx`, passing fetched Todos as props.
- [x] T026 [US2] Implement client-side logic in `app/page.tsx` or `TodoList.tsx` to fetch todos from GET `/api/todos` and display them.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

## Phase 5: User Story 3 - Mark Task as Complete/Incomplete (Priority: P1)

**Goal**: Allow users to toggle the completion status of a task via the UI.

**Independent Test**: Click the toggle for a task, observe visual change and persistence across page refreshes.

### Implementation for User Story 3

- [x] T027 [P] [US3] Create `app/api/todos/[id]/toggle/route.ts` for handling PATCH requests to toggle Todo completion.
- [x] T028 [US3] Implement PATCH API route logic for `toggleTodoCompletion` in `app/api/todos/[id]/toggle/route.ts`.
- [x] T029 [US3] Add a toggle UI element (e.g., checkbox) to `app/(components)/TodoItem.tsx`.
- [x] T030 [US3] Implement client-side logic in `TodoItem.tsx` to call the PATCH `/api/todos/{id}/toggle` endpoint on toggle interaction.

**Checkpoint**: All user stories up to US3 should now be independently functional

## Phase 6: User Story 4 - Update Existing Task (Priority: P2)

**Goal**: Enable users to modify the title or description of an existing task.

**Independent Test**: Edit a task's details via the UI, save, and verify the changes are reflected and persistent.

### Implementation for User Story 4

- [x] T031 [P] [US4] Update `app/api/todos/[id]/route.ts` to handle PUT requests for updating a Todo.
- [x] T032 [US4] Implement PUT API route logic for `updateTodo` in `app/api/todos/[id]/route.ts`.
- [x] T033 [US4] Add an edit mode or button to `app/(components)/TodoItem.tsx` to enable editing.
- [x] T034 [US4] Implement client-side logic in `TodoItem.tsx` to call the PUT `/api/todos/{id}` endpoint with updated data.

**Checkpoint**: All user stories up to US4 should now be independently functional

## Phase 7: User Story 5 - Delete a Task (Priority: P2)

**Goal**: Provide functionality for users to remove tasks from their list.

**Independent Test**: Click the delete button for a task and verify its removal from the UI and database.

### Implementation for User Story 5

- [x] T035 [P] [US5] Update `app/api/todos/[id]/route.ts` to handle DELETE requests for deleting a Todo.
- [x] T036 [US5] Implement DELETE API route logic for `deleteTodo` in `app/api/todos/[id]/route.ts`.
- [x] T037 [US5] Add a delete button to `app/(components)/TodoItem.tsx`.
- [x] T038 [US5] Implement client-side logic in `TodoItem.tsx` to call the DELETE `/api/todos/{id}` endpoint on button click.

**Checkpoint**: All user stories should now be independently functional

## Final Phase: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and overall application quality

- [x] T039 Implement global error handling and display for API calls in the frontend (e.g., toast notifications).
- [x] T040 Implement loading states and visual feedback for asynchronous operations in the frontend.
- [x] T041 Refine Tailwind CSS styling and responsiveness for all UI components.
- [x] T042 Update `README.md` with comprehensive setup instructions, development commands, and usage guide from `quickstart.md`.
- [x] T043 Review all code for adherence to code quality rules, readability, and maintainability.
- [x] T044 Perform thorough manual end-to-end testing of all features and edge cases via the UI. (Requires user action)

## Dependencies & Execution Order

### Phase Dependencies

-   **Setup (Phase 1)**: No dependencies - can start immediately
-   **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
-   **User Stories (Phase 3-7)**: All depend on Foundational phase completion
    -   User stories can then proceed in parallel (if staffed)
    -   Or sequentially in priority order (P1 → P2 → P3)
-   **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

-   **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
-   **User Story 2 (P1)**: Can start after Foundational (Phase 2) - No direct dependencies on US1, but often implemented after or in conjunction with View.
-   **User Story 3 (P1)**: Can start after Foundational (Phase 2) - Depends on US2 for UI context.
-   **User Story 4 (P2)**: Can start after Foundational (Phase 2) - Depends on US2 for UI context.
-   **User Story 5 (P2)**: Can start after Foundational (Phase 2) - Depends on US2 for UI context.

### Within Each User Story

-   Backend API route tasks before frontend UI component tasks.
-   UI component creation before integration tasks.
-   Client-side logic depends on API routes being available.

### Parallel Opportunities

-   All Setup tasks marked [P] can run in parallel (T003, T004, T005).
-   Within Foundational, some database operations can be implemented in parallel (T008-T013).
-   Once Foundational phase completes, different user stories can be implemented in parallel by different team members, especially for backend API routes and initial UI components for a story. For example, US1 backend API (T016, T017) can be done in parallel with US2 backend API (T021, T022).
-   Within User Story phases, UI component creation (e.g., `AddTodoForm.tsx`) and initial API route file creation can be parallelized.

## Implementation Strategy

### MVP First (User Story 1 & 2 First)

1.  Complete Phase 1: Setup
2.  Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3.  Complete Phase 3: User Story 1 (Add Task)
4.  Complete Phase 4: User Story 2 (View Task List)
5.  **STOP and VALIDATE**: Test User Stories 1 & 2 independently, verifying task creation and display.
6.  Deploy/demo if ready

### Incremental Delivery

1.  Complete Setup + Foundational → Foundation ready
2.  Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3.  Add User Story 2 → Test independently → Deploy/Demo
4.  Add User Story 3 → Test independently → Deploy/Demo
5.  Add User Story 4 → Test independently → Deploy/Demo
6.  Add User Story 5 → Test independently → Deploy/Demo
7.  Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1.  Team completes Setup + Foundational together.
2.  Once Foundational is done:
    -   Developer A: User Story 1
    -   Developer B: User Story 2
    -   Developer C: User Story 3
    -   Developer D: User Story 4
    -   Developer E: User Story 5
3.  Stories complete and integrate independently.

## Notes

-   [P] tasks = different files, minimal dependencies within the same phase or story.
-   [Story] label maps task to specific user story for traceability.
-   Each user story should be independently completable and testable where possible.
-   Commit after each task or logical group.
-   Stop at any checkpoint to validate story independently.
-   Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence.
