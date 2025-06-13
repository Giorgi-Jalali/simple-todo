import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { filterFunctions } from '../../utils/filterFunctions';
import { TODOS_PER_PAGE } from '../../constants';

const selectTodosState = (state: RootState) => state.todos;

export const getFilteredTodos = createSelector(
    selectTodosState,
    ({ todos, filter, searchTerm }) => {
        const fn = filterFunctions[filter as keyof typeof filterFunctions];
        let filtered = todos.filter(fn);
        const term = searchTerm.trim().toLowerCase();
        if (term) {
            filtered = filtered.filter(todo =>
                todo.title.toLowerCase().includes(term)
            );
        }
        return filtered;
    }
);

export const getVisibleTodos = createSelector(
    getFilteredTodos,
    selectTodosState,
    (filtered, { currentPage }) => {
        const start = (currentPage - 1) * TODOS_PER_PAGE;
        return filtered.slice(start, start + TODOS_PER_PAGE);
    }
);

export const getTotalPages = createSelector(
    getFilteredTodos,
    filtered => Math.ceil(filtered.length / TODOS_PER_PAGE)
);
