import {useState} from 'react';
import {useTodoStore} from '../store/todoStore';
import {Button, InputContainer} from "../styles.ts";

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
        <InputContainer>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add new todo"
            />
            <Button onClick={handleAdd} disabled={text.length < 1}>Add</Button>
        </InputContainer>
    );
};