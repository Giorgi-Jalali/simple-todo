import React, {useState, useRef, useEffect} from 'react';
import type {TodoRowProps} from '../types';
import {Td, TrashIcon} from '../styles.ts';
import {useTodoStore} from '../store/todoStore';

const TodoRow = ({todo, onDelete}: TodoRowProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(todo.title);
    const inputRef = useRef<HTMLInputElement>(null);
    const updateTodoTitle = useTodoStore(state => state.updateTodoTitle);

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
        }
    }, [isEditing]);

    const handleSave = async () => {
        const trimmed = editValue.trim();
        if (trimmed.length < 3) {
            alert('Title must be at least 3 characters');
            setEditValue(todo.title);
            setIsEditing(false);
            return;
        }

        if (trimmed !== todo.title) {
            await updateTodoTitle(todo.id, trimmed);
        }

        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    };

    return (
        <tr>
            <Td>
                {isEditing ? (
                    <input
                        ref={inputRef}
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={handleKeyDown}
                    />
                ) : (
                    <span onClick={() => setIsEditing(true)}>
                        {todo.title}
                    </span>
                )}
            </Td>
            <Td>{todo.completed ? '✅' : '❌'}</Td>
            <Td>
                <TrashIcon onClick={() => onDelete(todo.id)}/>
            </Td>
        </tr>
    );
};

export default React.memo(TodoRow);
