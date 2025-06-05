import React from 'react';
import type {Todo} from '../types';

interface Props {
    todo: Todo;
    onDelete: (id: number) => void;
}

export const TodoItem = React.memo(({ todo, onDelete }: Props) => {
    return (
        <li>
      <span>
        {todo.title} {todo.completed ? '✅' : '❌'}
      </span>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
        </li>
    );
});