import React from 'react';
import { useTodoStore } from '../store/todoStore';
import TodoRow from './TodoRow';

const thStyle: React.CSSProperties = {
    borderBottom: '2px solid #ccc',
    padding: '8px',
    textAlign: 'left',
};

const TodoTable = () => {
    const { todos, removeTodo } = useTodoStore();

    return (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
            <tr>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Completed</th>
                <th style={thStyle}>Action</th>
            </tr>
            </thead>
            <tbody>
            {todos.map((todo) => (
                <TodoRow key={todo.id} todo={todo} onDelete={removeTodo} />
            ))}
            </tbody>
        </table>
    );
};

export default TodoTable;
