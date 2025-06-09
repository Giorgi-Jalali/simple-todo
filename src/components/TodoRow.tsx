import React from 'react';
import type { TodoRowProps } from '../types';
import {Td, TrashIcon} from "../styles.ts";

const TodoRow = ({ todo, onDelete }: TodoRowProps) => {
    return (
        <tr>
            <Td>{todo.title}</Td>
            <Td>{todo.completed ? '✅' : '❌'}</Td>
            <Td>
                <TrashIcon onClick={() => onDelete(todo.id)} />
            </Td>
        </tr>
    );
};

export default React.memo(TodoRow);
