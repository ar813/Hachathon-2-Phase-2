import { Pool } from 'pg';
import { Todo } from '@/types/todo';

if (!process.env.NEON_CONNECTION_STRING) {
  throw new Error('NEON_CONNECTION_STRING is not defined');
}

export const pool = new Pool({
  connectionString: process.env.NEON_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
});

// Generic query function for executing raw SQL
export async function query(text: string, params?: unknown[]) {
  return pool.query(text, params);
}

export async function dbConnect() {
  try {
    // A simple query to test the connection
    await pool.query('SELECT NOW()');
    console.log('Successfully connected to Neon PostgreSQL database using pg.');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    throw new Error('Database connection failed.');
  }
}

// Function to create a new Todo
export async function createTodo(userId: string, title: string, description?: string): Promise<Todo> {
  try {
    const query = `
      INSERT INTO todos (user_id, title, description)
      VALUES ($1, $2, $3)
      RETURNING id, title, description, completed, created_at, updated_at;
    `;
    const values = [userId, title, description || null];
    const result = await pool.query<Todo>(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating todo:', error);
    throw new Error('Failed to create todo.');
  }
}

// Function to get all Todos for a specific user
export async function getAllTodos(userId: string): Promise<Todo[]> {
  try {
    const query = `
      SELECT id, title, description, completed, created_at, updated_at
      FROM todos
      WHERE user_id = $1
      ORDER BY created_at DESC;
    `;
    const result = await pool.query<Todo>(query, [userId]);
    return result.rows;
  } catch (error) {
    console.error('Error getting all todos:', error);
    throw new Error('Failed to retrieve todos.');
  }
}

// Function to get a Todo by ID
export async function getTodoById(id: string): Promise<Todo | undefined> {
  try {
    const query = `
      SELECT id, title, description, completed, created_at, updated_at
      FROM todos
      WHERE id = $1;
    `;
    const result = await pool.query<Todo>(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error getting todo with ID ${id}:`, error);
    throw new Error(`Failed to retrieve todo with ID ${id}.`);
  }
}

// Function to update a Todo's title and/or description
export async function updateTodo(id: string, title?: string, description?: string): Promise<Todo> {
  try {
    const query = `
      UPDATE todos
      SET
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING id, title, description, completed, created_at, updated_at;
    `;
    const values = [title || null, description || null, id];
    const result = await pool.query<Todo>(query, values);
    if (result.rows.length === 0) {
      throw new Error('Todo not found for update.');
    }
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating todo with ID ${id}:`, error);
    throw new Error(`Failed to update todo with ID ${id}.`);
  }
}

// Function to delete a Todo
export async function deleteTodo(id: string): Promise<void> {
  try {
    const query = `
      DELETE FROM todos
      WHERE id = $1;
    `;
    const result = await pool.query(query, [id]);
    if (result.rowCount === 0) {
      throw new Error('Todo not found for deletion.');
    }
  } catch (error) {
    console.error(`Error deleting todo with ID ${id}:`, error);
    throw new Error(`Failed to delete todo with ID ${id}.`);
  }
}

// Function to toggle a Todo's completion status
export async function toggleTodoCompletion(id: string, completed: boolean): Promise<Todo> {
  try {
    const query = `
      UPDATE todos
      SET
        completed = $1,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING id, title, description, completed, created_at, updated_at;
    `;
    const values = [completed, id];
    const result = await pool.query<Todo>(query, values);
    if (result.rows.length === 0) {
      throw new Error('Todo not found for toggling completion.');
    }
    return result.rows[0];
  } catch (error) {
    console.error(`Error toggling completion for todo with ID ${id}:`, error);
    throw new Error(`Failed to toggle todo completion for ID ${id}.`);
  }
}
