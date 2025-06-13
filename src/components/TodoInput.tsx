import {useState} from 'react';
import {Button, InputContainer} from '../styles';
import {useAppDispatch} from '../store/hooks';
import {addTodo} from '../store/todos/todosSlice';

export const TodoInput = () => {
    const [text, setText] = useState('');
    const dispatch = useAppDispatch();

    const handleAdd = () => {
        const trimmed = text.trim();
        if (!trimmed) return;
        dispatch(addTodo(trimmed));
        setText('');
    };

    return (
        <InputContainer>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add new todo"
            />
            <Button onClick={handleAdd} disabled={!text.trim()}>
                Add
            </Button>
        </InputContainer>
    );
};
