import { useState, useEffect, useMemo } from 'react';
import { useTodoStore } from '../../store/todoStore.ts';
import { TodoSearchContainer } from "./styles.ts";
import debounce from 'lodash.debounce';

const TodoSearch = () => {
    const setSearchTerm = useTodoStore(state => state.setSearchTerm);
    const [localValue, setLocalValue] = useState('');

    const debouncedSetSearchTerm = useMemo(() =>
            debounce(setSearchTerm, 400)
        , [setSearchTerm]);

    useEffect(() => {
        debouncedSetSearchTerm(localValue);
    }, [localValue, debouncedSetSearchTerm]);

    useEffect(() => {
        return () => {
            debouncedSetSearchTerm.cancel();
        };
    }, [debouncedSetSearchTerm]);

    // Using setTimeout
    /*
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchTerm(localValue);
        }, 400);

        return () => clearTimeout(timer);
    }, [localValue, setSearchTerm]);
    */

    return (
        <TodoSearchContainer>
            <input
                type="text"
                placeholder="Search todos by title..."
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
            />
        </TodoSearchContainer>
    );
};

export default TodoSearch;
