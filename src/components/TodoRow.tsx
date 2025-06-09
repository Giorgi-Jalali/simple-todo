import React from 'react';
import type {TodoRowProps} from '../types';
import { FaTrash } from 'react-icons/fa';

const tdStyle: React.CSSProperties = {
    borderBottom: '1px solid #eee',
    padding: '8px',
};

const TodoRow= ({ todo, onDelete } : TodoRowProps) => {
    return (
        <tr>
            <td style={tdStyle}>{todo.title}</td>
            <td style={tdStyle}>{todo.completed ? '✅' : '❌'}</td>
            <td style={tdStyle}>
                <FaTrash color="red" onClick={() => onDelete(todo.id)} style={{ cursor: 'pointer' }} />
            </td>
        </tr>
    );
};

export default React.memo(TodoRow);
