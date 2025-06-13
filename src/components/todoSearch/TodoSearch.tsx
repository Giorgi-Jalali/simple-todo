import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { useAppDispatch } from '../../store/hooks';
import { setSearchTerm } from '../../store/todos/todosSlice';
import { TodoSearchContainer } from './styles';

const TodoSearch: React.FC = () => {
    const dispatch = useAppDispatch();
    const [localValue, setLocalValue] = useState('');
    const debouncedValue = useDebounce(localValue, 300);

    useEffect(() => {
        dispatch(setSearchTerm(debouncedValue));
    }, [debouncedValue, dispatch]);

    return (
        <TodoSearchContainer>
            <input
                type="text"
                placeholder="Search todos by title..."
                value={localValue}
                onChange={e => setLocalValue(e.target.value)}
            />
        </TodoSearchContainer>
    );
};

export default TodoSearch;
