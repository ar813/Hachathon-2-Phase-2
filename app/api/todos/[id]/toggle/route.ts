// app/api/todos/[id]/toggle/route.ts
import { NextResponse } from 'next/server';
import { toggleTodoCompletion } from '@/lib/db';
import { Todo } from '@/types/todo';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { completed } = await request.json();

    if (typeof completed !== 'boolean') {
      return NextResponse.json({ error: 'Invalid value for completed.' }, { status: 400 });
    }

    const updatedTodo: Todo = await toggleTodoCompletion(id, completed);
    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    if (errorMessage.includes('Todo not found')) {
      return NextResponse.json({ error: errorMessage }, { status: 404 });
    }
    console.error('Failed to toggle todo completion:', error);
    return NextResponse.json({ error: 'Failed to toggle todo completion.' }, { status: 500 });
  }
}
