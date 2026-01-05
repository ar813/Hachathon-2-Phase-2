"use client";

import { useState } from 'react';
import AddTodoForm from '@/app/(components)/AddTodoForm';
import TodoList from '@/app/(components)/TodoList'; // Import TodoList
import { Todo } from '@/types/todo';
export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0); // State to trigger TodoList refresh

  const handleTodoAdded = (newTodo: Todo) => {
    console.log('New Todo Added:', newTodo);
    // Increment refreshKey to force TodoList to re-fetch
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <main className="flex w-full flex-col items-center p-4 sm:p-8 mt-10">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 animate-gradient-x">
            My Todo App
          </h1>
          <p className="text-gray-400 text-lg">Stay organized and boost your productivity</p>
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/5">
          <div className="flex flex-col gap-10">
            <div className="bg-gray-800/30 rounded-xl p-6 border border-white/5">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-blue-500/20 text-blue-400 p-2 rounded-lg mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </span>
                Add New Task
              </h2>
              <AddTodoForm onTodoAdded={handleTodoAdded} />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <span className="bg-purple-500/20 text-purple-400 p-2 rounded-lg mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                  </svg>
                </span>
                Your Tasks
              </h2>
              <TodoList key={refreshKey} refreshKey={refreshKey} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
