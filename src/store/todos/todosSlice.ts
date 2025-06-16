import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Todo, ThemeType } from '../../types';
import type {TodosState, UpdateTodoTitlePayload} from './types';

const initialState: TodosState = {
    todos: [],
    loading: false,
    error: null,
    filter: 'all',
    searchTerm: '',
    currentPage: 1,
    theme: (localStorage.getItem('theme') as ThemeType) ?? 'dark',
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<string>) {
            state.filter = action.payload;
            state.currentPage = 1;
        },
        setSearchTerm(state, action: PayloadAction<string>) {
            state.searchTerm = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        addTodo(state, action: PayloadAction<string>) {
            const title = action.payload.trim();
            if (title.length < 3) {
                state.error = 'Title must be at least 3 characters';
                return;
            }
            state.error = null;
            state.todos.unshift({ id: Date.now(), title, completed: false });
        },
        removeTodo(state, action: PayloadAction<number>) {
            state.todos = state.todos.filter(t => t.id !== action.payload);
        },
        setTheme(state, action: PayloadAction<ThemeType>) {
            state.theme = action.payload;
            localStorage.setItem('theme', action.payload);
        },

        fetchTodos() {},
        updateTodoTitle: (state, _action: PayloadAction<UpdateTodoTitlePayload>) => {console.log("state: ", state)},


        fetchTodosPending(state) {
            state.loading = true;
            state.error = null;
        },
        fetchTodosFulfilled(state, action: PayloadAction<Todo[]>) {
            state.loading = false;
            state.todos = action.payload;
            state.currentPage = 1;
        },
        fetchTodosRejected(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        updateTodoTitlePending(state) {
            state.error = null;
        },
        updateTodoTitleFulfilled(state, action: PayloadAction<UpdateTodoTitlePayload>) {
            const t = state.todos.find(todo => todo.id === action.payload.id);
            if (t) t.title = action.payload.newTitle;
        },
        updateTodoTitleRejected(state, action: PayloadAction<string>) {
            state.error = action.payload ?? 'Title must be at least 3 characters';
        },
    },
});

export const {
    setFilter,
    setSearchTerm,
    setCurrentPage,
    addTodo,
    removeTodo,
    setTheme,
    fetchTodos,
    fetchTodosPending,
    fetchTodosFulfilled,
    fetchTodosRejected,
    updateTodoTitle,
    updateTodoTitlePending,
    updateTodoTitleFulfilled,
    updateTodoTitleRejected,
} = todosSlice.actions;

export default todosSlice.reducer;
