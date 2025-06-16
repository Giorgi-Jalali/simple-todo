import React, {useState, useRef, useEffect} from 'react';
import type {Todo} from '../types';
import {Td, TrashIcon} from '../styles';
import {useAppDispatch} from '../store/hooks';
import {updateTodoTitle, removeTodo} from '../store/todos/todosSlice';

function TodoRow({todo}: { todo: Todo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(todo.title);
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();

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
        } else if (trimmed !== todo.title) {
            dispatch(updateTodoTitle({id: todo.id, newTitle: trimmed}));
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
                        onChange={e => setEditValue(e.target.value)}
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
                <TrashIcon onClick={() => dispatch(removeTodo(todo.id))}/>
            </Td>
        </tr>
    );
}

export default React.memo(TodoRow);
