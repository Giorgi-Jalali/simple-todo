import { useState } from 'react';
import { useTodoStore } from '../store/todoStore';

export const TodoInput = () => {
    const [text, setText] = useState('');
    const addTodo = useTodoStore((s) => s.addTodo);

    const handleAdd = () => {
        if (text.trim()) {
            addTodo(text.trim());
            setText('');
        }
    };

    return (
        <div>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add new todo"
            />
            <button onClick={handleAdd}>Add</button>
        </div>
    );
};