import type { Todo } from '../types.ts';

export const patchTodo = async (id: number, updatedTodo: Partial<Todo>) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
    });

    if (!response.ok) {
        throw new Error('Failed to update todo');
    }

    return await response.json();
};
