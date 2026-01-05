# Feature Specification: Phase One – Todo App

**Feature Branch**: `001-todo-app`  
**Created**: 2025-12-28  
**Status**: Draft  
**Input**: User description: "Build a production-ready Todo web application using Next.js, TypeScript, and Tailwind CSS, where tasks are persistently stored in a Neon Serverless PostgreSQL database and accessed through Next.js API routes."

## 1. Project Objective

Build a **production-ready Todo web application** using **Next.js, TypeScript, and Tailwind CSS**, where tasks are **persistently stored** in a **Neon Serverless PostgreSQL database** and accessed through **Next.js API routes**.

## 2. Environment Configuration

### 2.1 Environment Variables

The project **must include** a `.env.local` file at the root level. Required variable:
* `NEON_CONNECTION_STRING`
This variable will be used **exclusively** to establish a connection with the Neon PostgreSQL database.
❗ Hardcoding database credentials is **strictly prohibited**.

## 3. Database Specification

### 3.1 Database Setup File

* A **dedicated SQL file** must be included in the repository (e.g. `/db/schema.sql`).
* This file must contain the **SQL query to create the `todos` table**.
* The query must be executable directly on Neon PostgreSQL.
* The purpose of this file is **schema clarity and reproducibility**.

### 3.2 Database Type

* Neon **Serverless PostgreSQL**

### 3.3 Todos Table Schema

The database must include a `todos` table with the following fields:
* `id` (UUID, Primary Key)
* `title` (Text, Required)
* `description` (Text, Optional)
* `completed` (Boolean, Default: false)
* `created_at` (Timestamp, Auto-generated)
* `updated_at` (Timestamp, Auto-generated)

### 3.4 Authentication Tables Schema (Better-Auth)

The database uses **better-auth** library for authentication, which requires the following tables:

**User Table** (`user`):
* `id` (TEXT, Primary Key)
* `name` (TEXT, Required)
* `email` (TEXT, Required, Unique)
* `emailVerified` (BOOLEAN, Default: false)
* `image` (TEXT, Optional - for OAuth avatars)
* `createdAt` (Timestamp, Auto-generated)
* `updatedAt` (Timestamp, Auto-generated)

**Session Table** (`session`):
* `id` (TEXT, Primary Key)
* `expiresAt` (Timestamp, Required)
* `token` (TEXT, Required, Unique)
* `userId` (TEXT, Foreign Key to user)
* `ipAddress` (TEXT, Optional)
* `userAgent` (TEXT, Optional)
* `createdAt` (Timestamp, Auto-generated)
* `updatedAt` (Timestamp, Auto-generated)

**Account Table** (`account` - for OAuth providers):
* `id` (TEXT, Primary Key)
* `accountId` (TEXT, Required)
* `providerId` (TEXT, Required - e.g., "github")
* `userId` (TEXT, Foreign Key to user)
* `accessToken` (TEXT, Optional)
* `refreshToken` (TEXT, Optional)
* `password` (TEXT, Optional - for email/password auth)
* `createdAt` (Timestamp, Auto-generated)
* `updatedAt` (Timestamp, Auto-generated)

**Verification Table** (`verification`):
* `id` (TEXT, Primary Key)
* `identifier` (TEXT, Required)
* `value` (TEXT, Required)
* `expiresAt` (Timestamp, Required)
* `createdAt` (Timestamp, Auto-generated)
* `updatedAt` (Timestamp, Auto-generated)

**Note**: Better-auth handles password hashing, session management, and OAuth flows automatically.

## User Scenarios & Testing (mandatory)

### User Story 1 - Add a New Task (Priority: P1)

A user wants to add a new task to their to-do list.

**Why this priority**: Core functionality, allows users to begin interacting with the application.

**Independent Test**: Can be fully tested by entering task details and submitting, then verifying the task appears in the list.

**Acceptance Scenarios**:

1.  **Given** the user is on the main Todo page, **When** they fill in the 'title' and 'description' fields and click 'Add Task', **Then** the new task appears in the list with a default 'incomplete' status.
2.  **Given** the user fills in only the 'title' field, **When** they click 'Add Task', **Then** the new task appears in the list with an empty description and default 'incomplete' status.

---

### User Story 2 - View Task List (Priority: P1)

A user wants to see all their existing tasks and their completion status.

**Why this priority**: Essential for understanding existing tasks and overall progress.

**Independent Test**: Can be fully tested by navigating to the main Todo page and observing the displayed tasks.

**Acceptance Scenarios**:

1.  **Given** the user is on the main Todo page with existing tasks, **When** the page loads, **Then** all tasks are displayed with their respective titles, descriptions (if any), and completion status.

---

### User Story 3 - Mark Task as Complete/Incomplete (Priority: P1)

A user wants to change the completion status of a task.

**Why this priority**: Fundamental interaction for managing tasks and tracking progress.

**Independent Test**: Can be fully tested by toggling the status of a task and observing the visual change and persistence.

**Acceptance Scenarios**:

1.  **Given** a task is displayed as incomplete, **When** the user clicks the toggle/checkbox, **Then** the task's status changes to complete, and this change is reflected visually.
2.  **Given** a task is displayed as complete, **When** the user clicks the toggle/checkbox, **Then** the task's status changes to incomplete, and this change is reflected visually.

---

### User Story 4 - Update Existing Task (Priority: P2)

A user wants to modify the title or description of an existing task.

**Why this priority**: Important for correcting errors or refining task details.

**Independent Test**: Can be fully tested by editing a task's details, saving, and verifying the changes.

**Acceptance Scenarios**:

1.  **Given** an existing task is displayed, **When** the user edits its title or description and saves, **Then** the task's details are updated and reflected in the list.

---

### User Story 5 - Delete a Task (Priority: P2)

A user wants to remove a task from their list.

**Why this priority**: Allows users to manage their list by removing irrelevant or completed tasks.

**Independent Test**: Can be fully tested by deleting a task and verifying its removal from the list.

**Acceptance Scenarios**:

1.  **Given** an existing task is displayed, **When** the user clicks the 'Delete' button for that task, **Then** the task is removed from the list.

---

### User Story 6 - User Signup (Priority: P0)

A new user wants to create an account to access the application.

**Why this priority**: Prerequisite for using the application securely.

**Independent Test**: Register with valid details and verify redirection/login.

**Acceptance Scenarios**:
1. **Given** the user is on the Signup page, **When** they enter valid Name, Email, and Password, **Then** a new account is created, and they are redirected to Login.

---

### User Story 7 - User Login (Priority: P0)

A registered user wants to log in to access their todos.

**Why this priority**: Prerequisite for accessing protected features.

**Independent Test**: Log in with valid credentials and verify access to the Todo list.

**Acceptance Scenarios**:
1. **Given** the user is on the Login page, **When** they enter valid credentials, **Then** they are authenticated and redirected to the Home page.

---

### User Story 8 - User Logout (Priority: P1)

A logged-in user wants to end their session.

**Why this priority**: Security best practice.

**Independent Test**: Click Logout and verify redirection to Login page.

**Acceptance Scenarios**:
1. **Given** a logged-in user, **When** they click 'Logout', **Then** their session is cleared, and they are redirected to the Login page.

---

### Edge Cases

- What happens when database connection fails during an API call? (Frontend should display an error message).
- How does the system handle invalid input for task creation/update? (API should return an error, frontend should display validation message).
- **Auth Edge Cases**: Invalid credentials, duplicate email signup, weak passwords.

## Requirements (mandatory)

### Functional Requirements

- **FR-001**: The application MUST be a web-based application built using Next.js, TypeScript, and Tailwind CSS.
- **FR-002**: The project MUST include both frontend and backend logic.
- **FR-003**: Tasks MUST be stored persistently in a Neon Serverless PostgreSQL database.
- **FR-004**: The application MUST NOT be terminal/console based.
- **FR-005**: Data MUST persist across page refreshes and server restarts.
- **FR-006**: Backend logic MUST be implemented using Next.js API routes.
- **FR-007**: Direct database access from the frontend is NOT allowed.
- **FR-008**: All database operations MUST go through a dedicated backend layer.
- **FR-009**: The application MUST include the following 5 features: Add Task, View Task List, Update Task, Delete Task, Mark Task as Complete/Incomplete.
- **FR-010**: The project MUST include a `.env.local` file with `NEON_CONNECTION_STRING`.
- **FR-011**: Hardcoding database credentials is STRICTLY PROHIBITED.
- **FR-012**: A dedicated SQL file (`/db/schema.sql`) MUST contain the SQL query to create the `todos` table.
- **FR-013**: The `todos` table MUST have `id` (UUID, PK), `title` (Text, Req), `description` (Text, Opt), `completed` (Boolean, Default: false), `created_at` (Timestamp, Auto), `updated_at` (Timestamp, Auto).
- **FR-014**: The backend MUST have API endpoints for creating, reading all, updating, deleting, and toggling completion of tasks.
- **FR-015**: The frontend MUST use a single-page architecture with no multi-page routing.
- **FR-016**: The frontend MUST include UI for adding tasks, displaying a list of tasks, updating tasks, deleting tasks, and toggling task completion.
- **FR-017**: UI interactions (add, update, delete, toggle) MUST occur on the same page without navigation.
- **FR-018**: The application MUST handle loading and error states gracefully in the frontend.
- **FR-019**: API endpoints MUST return meaningful error messages.
- **FR-020**: Silent failures are NOT allowed.
- **FR-021**: Authentication MUST use **better-auth** library for email/password and OAuth.
- **FR-022**: Support for **GitHub OAuth** authentication MUST be included.
- **FR-023**: Session management MUST be handled by better-auth with secure cookies.
- **FR-024**: User IDs MUST be TEXT format (better-auth default) for OAuth compatibility.

### Key Entities

-   **Todo**: Represents a single task.
    *   `id` (Unique identifier for the task)
    *   `title` (Brief name of the task)
    *   `description` (Optional detailed explanation of the task)
    *   `completed` (Boolean indicating if the task is finished)
    *   `created_at` (Timestamp of when the task was created)
    *   `updated_at` (Timestamp of the last modification)

## Success Criteria (mandatory)

### Measurable Outcomes

-   **SC-001**: All 5 mandatory features (Add, View, Update, Delete, Mark Complete/Incomplete) MUST function correctly as per user stories.
-   **SC-002**: Task data MUST persist in the Neon Serverless PostgreSQL database across application restarts and page refreshes.
-   **SC-003**: The `.env.local` file MUST correctly supply `NEON_CONNECTION_STRING` for database connection.
-   **SC-004**: The application MUST adhere to all rules outlined in the project Constitution and this Specification.
-   **SC-005**: All UI interactions for task management (add, update, delete, toggle completion) MUST occur seamlessly on a single page without redirects or full page reloads.
-   **SC-006**: Error messages from API calls MUST be clear and informative, and the frontend MUST display appropriate feedback for loading and error states.
-   **SC-007**: Authentication features (Signup, Login, Logout) MUST function correctly, securing access to the application.

## 6. Authentication Implementation (Better-Auth)

### 6.1 Authentication Library

The application uses **better-auth** (v1.4.9+) for authentication management.

**Why better-auth?**
- Modern Next.js App Router support
- Built-in TypeScript support
- Simplified OAuth integration
- Secure session management
- Automatic CSRF protection

### 6.2 Authentication Methods

**Email/Password Authentication:**
- Users can sign up with email and password
- Passwords are automatically hashed by better-auth
- No manual bcrypt implementation required
- Email verification can be enabled (currently disabled for simplicity)

**GitHub OAuth:**
- Users can sign in with GitHub account
- Automatic avatar and profile data retrieval
- Seamless account linking

### 6.3 Environment Variables

Required for better-auth:
```
BETTER_AUTH_SECRET=<random-secret-key>
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
GITHUB_CLIENT_ID=<your-github-oauth-app-id>
GITHUB_CLIENT_SECRET=<your-github-oauth-secret>
```

### 6.4 Session Management

- Sessions stored in database `session` table
- Cookie-based session tokens (`better-auth.session_token`)
- Automatic session expiration
- Server-side session validation

### 6.5 Protected Routes

Middleware checks for valid session:
- Public routes: `/login`, `/signup`, `/api/auth/*`
- Protected routes: All other routes require authentication
- API routes validate session before processing requests

## Out of Scope (Phase One)

-   Multi-page routing
-   Filters or search
-   Animations or advanced UI
-   Real-time updates