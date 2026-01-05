// app/api/todos/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createTodo, getAllTodos } from '@/lib/db';
import { auth } from '@/lib/auth';
import { Todo } from '@/types/todo';

export async function GET(request: NextRequest) {
  try {
    // Get session from better-auth
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch todos for the specific user (using TEXT id from better-auth)
    const todos: Todo[] = await getAllTodos(session.user.id);
    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    console.error('Failed to retrieve todos:', error);
    return NextResponse.json({ error: 'Failed to retrieve todos.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get session from better-auth
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description } = await request.json();

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return NextResponse.json({ error: 'Title is required and must be a non-empty string.' }, { status: 400 });
    }

    // Create todo linked to the user (using TEXT id from better-auth)
    const newTodo: Todo = await createTodo(session.user.id, title.trim(), description?.trim());
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error('Failed to create todo:', error);
    return NextResponse.json({ error: 'Failed to create todo.' }, { status: 500 });
  }
}