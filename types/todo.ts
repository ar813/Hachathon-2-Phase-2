// types/todo.ts
export interface Todo {
  id: string; // UUID
  title: string;
  description?: string; // Optional
  completed: boolean;
  created_at: string; // ISO 8601 string or Date
  updated_at: string; // ISO 8601 string or Date
}
