// app/api/todos/[id]/route.ts
import { NextResponse } from 'next/server';
import { updateTodo, deleteTodo } from '@/lib/db';
import { Todo } from '@/types/todo';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { title, description } = await request.json();

    if (!title && !description) {
      return NextResponse.json({ error: 'Title or description is required for update.' }, { status: 400 });
    }

    const updatedTodo: Todo = await updateTodo(id, title, description);
    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    if (errorMessage.includes('Todo not found')) {
      return NextResponse.json({ error: errorMessage }, { status: 404 });
    }
    console.error('Failed to update todo:', error);
    return NextResponse.json({ error: 'Failed to update todo.' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await deleteTodo(id);
    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    if (errorMessage.includes('Todo not found')) {
      return NextResponse.json({ error: errorMessage }, { status: 404 });
    }
    console.error('Failed to delete todo:', error);
    return NextResponse.json({ error: 'Failed to delete todo.' }, { status: 500 });
  }
}