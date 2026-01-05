// app/(components)/TodoList.tsx
"use client";

import { useState, useEffect } from 'react';
import { Todo } from '@/types/todo';
import TodoItem from '@/app/(components)/TodoItem';

interface TodoListProps {
  refreshKey: number;
}

export default function TodoList({ refreshKey }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/todos');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch todos.');
      }
      const data: Todo[] = await response.json();
      setTodos(data);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred while fetching todos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [refreshKey]);

  const handleUpdateTodo = (updatedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const handleDeleteTodo = (deletedTodoId: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== deletedTodoId));
  };

  if (loading) {
    return <div className="text-center dark:text-gray-300">Loading todos...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (todos.length === 0) {
    return <div className="text-center dark:text-gray-300">No todos yet. Add one above!</div>;
  }

  return (
    <ul className="space-y-4 w-full">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={handleUpdateTodo}
          onDelete={handleDeleteTodo}
        />
      ))}
    </ul>
  );
}
