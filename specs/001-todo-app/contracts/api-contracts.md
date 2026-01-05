# API Contracts: Phase One – Todo App

This document outlines the API endpoints for managing Todo items. All endpoints are implemented using Next.js API Routes.

## Base URL

`/api/todos`

## Endpoints

---

### 1. Create Todo

-   **Description**: Creates a new Todo item.
-   **Endpoint**: `/api/todos`
-   **Method**: `POST`
-   **Request Body**: `application/json`
    ```json
    {
        "title": "string",
        "description": "string (optional)"
    }
    ```
-   **Response (201 Created)**: `application/json`
    ```json
    {
        "id": "uuid",
        "title": "string",
        "description": "string",
        "completed": false,
        "created_at": "timestamp",
        "updated_at": "timestamp"
    }
    ```
-   **Error Responses**:
    -   `400 Bad Request`: If `title` is missing or invalid.
    -   `500 Internal Server Error`: For unexpected server-side issues.

---

### 2. Get All Todos

-   **Description**: Retrieves a list of all Todo items.
-   **Endpoint**: `/api/todos`
-   **Method**: `GET`
-   **Request Body**: None
-   **Response (200 OK)**: `application/json`
    ```json
    [
        {
            "id": "uuid",
            "title": "string",
            "description": "string",
            "completed": false,
            "created_at": "timestamp",
            "updated_at": "timestamp"
        },
        // ... more todo items
    ]
    ```
-   **Error Responses**:
    -   `500 Internal Server Error`: For unexpected server-side issues.

---

### 3. Update Todo

-   **Description**: Updates an existing Todo item's title or description.
-   **Endpoint**: `/api/todos/{id}`
-   **Method**: `PUT`
-   **Path Parameters**:
    -   `id`: UUID of the Todo item to update.
-   **Request Body**: `application/json`
    ```json
    {
        "title": "string (optional)",
        "description": "string (optional)"
    }
    ```
    -   At least one of `title` or `description` must be provided.
-   **Response (200 OK)**: `application/json`
    ```json
    {
        "id": "uuid",
        "title": "string",
        "description": "string",
        "completed": false,
        "created_at": "timestamp",
        "updated_at": "timestamp"
    }
    ```
-   **Error Responses**:
    -   `400 Bad Request`: If no valid fields for update are provided or `id` is invalid.
    -   `404 Not Found`: If the Todo item with the given `id` does not exist.
    -   `500 Internal Server Error`: For unexpected server-side issues.

---

### 4. Delete Todo

-   **Description**: Deletes a Todo item.
-   **Endpoint**: `/api/todos/{id}`
-   **Method**: `DELETE`
-   **Path Parameters**:
    -   `id`: UUID of the Todo item to delete.
-   **Request Body**: None
-   **Response (204 No Content)**: Empty response body on successful deletion.
-   **Error Responses**:
    -   `400 Bad Request`: If `id` is invalid.
    -   `404 Not Found`: If the Todo item with the given `id` does not exist.
    -   `500 Internal Server Error`: For unexpected server-side issues.

---

### 5. Toggle Todo Completion

-   **Description**: Toggles the `completed` status of a Todo item.
-   **Endpoint**: `/api/todos/{id}/toggle`
-   **Method**: `PATCH`
-   **Path Parameters**:
    -   `id`: UUID of the Todo item to toggle.
-   **Request Body**: `application/json`
    ```json
    {
        "completed": "boolean"
    }
    ```
-   **Response (200 OK)**: `application/json`
    ```json
    {
        "id": "uuid",
        "title": "string",
        "description": "string",
        "completed": true, // or false
        "created_at": "timestamp",
        "updated_at": "timestamp"
    }
    ```
-   **Error Responses**:
    -   `400 Bad Request`: If `id` is invalid or `completed` field is missing/invalid.
    -   `404 Not Found`: If the Todo item with the given `id` does not exist.
    -   `500 Internal Server Error`: For unexpected server-side issues.
