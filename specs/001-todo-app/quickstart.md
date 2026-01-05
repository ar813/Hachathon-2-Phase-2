# Quickstart: Phase One – Todo App

This guide provides instructions to set up and run the Phase One – Todo App locally.

## 1. Prerequisites

Before you begin, ensure you have the following installed:

-   Node.js (LTS version recommended)
-   npm or Yarn (npm is used in examples)
-   Git
-   A Neon PostgreSQL account and a new database.

## 2. Setup Database Connection String

1.  Create a new `.env.local` file in the root directory of the project.
2.  Add your Neon PostgreSQL connection string to this file:

    ```
    NEON_CONNECTION_STRING="your_neon_connection_string_here"
    ```
    Replace `"your_neon_connection_string_here"` with the actual connection string obtained from your Neon account.

## 3. Install Dependencies

Navigate to the project's root directory in your terminal and install the required dependencies:

```bash
npm install
# or
yarn install
```

## 4. Database Setup

The project includes a SQL file to create the `todos` table.

1.  Connect to your Neon PostgreSQL database using a client (e.g., `psql`, DBeaver, TablePlus).
2.  Execute the SQL commands found in `db/schema.sql` to create the `todos` table.

## 5. Run the Application

Once dependencies are installed and the database is set up, you can run the development server:

```bash
npm run dev
# or
yarn dev
```

The application will typically be accessible at `http://localhost:3000`.

## 6. Access the Application

Open your web browser and navigate to `http://localhost:3000` to interact with the Todo App.

## 7. Manual Testing

-   Manually test all the features: Add Task, View Task List, Update Task, Delete Task, and Mark Task as Complete/Incomplete.
-   Verify data persistence by refreshing the page or restarting the server.
-   Check for appropriate error messages when invalid data is provided.
