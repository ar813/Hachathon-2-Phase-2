// app/(components)/TodoItem.tsx
"use client";

import { useState } from 'react';
import { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (updatedTodo: Todo) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggleCompletion = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/todos/${todo.id}/toggle`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to toggle todo completion.');
      }

      const updatedTodo: Todo = await response.json();
      onUpdate(updatedTodo);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/todos/${todo.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete todo.');
      }

      onDelete(todo.id);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!editedTitle.trim()) {
        setError('Title cannot be empty.');
        setLoading(false);
        return;
      }

      const response = await fetch(`/api/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: editedTitle, description: editedDescription }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update todo.');
      }

      const updatedTodo: Todo = await response.json();
      onUpdate(updatedTodo);
      setIsEditing(false); // Exit edit mode
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <li className="bg-white/5 border border-white/10 p-5 rounded-xl shadow-lg hover:shadow-xl hover:bg-white/10 transition-all duration-300 flex flex-col gap-3 group backdrop-blur-sm">
      {error && <p className="text-red-400 text-sm mb-2 bg-red-500/10 p-2 rounded border border-red-500/20">{error}</p>}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full text-lg font-semibold text-white bg-transparent border-b-2 border-indigo-500 focus:outline-none px-1 py-0.5"
              disabled={loading}
              autoFocus
            />
          ) : (
            <h3 className={`text-lg font-semibold text-white break-words ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.title}
            </h3>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0 opacity-80 hover:opacity-100 transition-opacity">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="p-2 text-green-400 hover:text-green-300 hover:bg-green-500/10 rounded-lg transition-colors"
                title="Save"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditedTitle(todo.title);
                  setEditedDescription(todo.description || '');
                  setError(null);
                }}
                disabled={loading}
                className="p-2 text-gray-400 hover:text-gray-200 hover:bg-white/10 rounded-lg transition-colors"
                title="Cancel"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleToggleCompletion}
                disabled={loading}
                className={`p-2 rounded-lg transition-colors ${todo.completed ? 'text-green-400 bg-green-500/10 hover:bg-green-500/20' : 'text-gray-500 hover:text-green-400 hover:bg-green-500/10'}`}
                title={todo.completed ? "Mark as incomplete" : "Mark as complete"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={() => setIsEditing(true)}
                disabled={loading}
                className="p-2 text-gray-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors"
                title="Edit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                title="Delete"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          rows={3}
          className="w-full text-sm text-gray-300 bg-black/20 rounded-lg border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none p-2 resize-none"
          disabled={loading}
          placeholder="Add a description..."
        ></textarea>
      ) : (
        todo.description && (
          <div className={`text-sm text-gray-400 break-words ${todo.completed ? 'opacity-50' : ''}`}>
            {todo.description}
          </div>
        )
      )}

      <div className="text-xs text-gray-600 mt-1 flex justify-end">
        {new Date(todo.created_at).toLocaleDateString()}
      </div>
    </li>
  );
}