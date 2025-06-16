import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Todo, ThemeType } from '../../types';
import { API_ENDPOINTS, AUTH_HEADER } from '../../config/api';
import { patchTodo } from '../../api/todoApi';
import type { RootState } from '../store';
import type { TodosState } from './types';

const initialState: TodosState = {
    todos: [],
    loading: false,
    error: null,
    filter: 'all',
    searchTerm: '',
    currentPage: 1,
    theme: (localStorage.getItem('theme') as ThemeType) ?? 'dark',
};

export const fetchTodos = createAsyncThunk<Todo[], void, { rejectValue: string }>(
    'todos/fetchTodos',
    async (_, { rejectWithValue }) => {
        try {
            const entries = Object.entries(API_ENDPOINTS);
            const responses = await Promise.all(
                entries.map(([, url]) => fetch(url, { headers: AUTH_HEADER }))
            );
            const data = await Promise.all(responses.map(r => r.json()));
            return data[0] as Todo[];
        } catch {
            return rejectWithValue('Failed to fetch todos');
        }
    }
);

export const updateTodoTitle = createAsyncThunk<
    { id: number; newTitle: string },
    { id: number; newTitle: string },
    { state: RootState; rejectValue: string }
>(
    'todos/updateTodoTitle',
    async ({ id, newTitle }, { rejectWithValue }) => {
        const trimmed = newTitle.trim();
        if (trimmed.length < 3) {
            return rejectWithValue('Title must be at least 3 characters');
        }
        try {
            await patchTodo(id, { title: trimmed });
            return { id, newTitle: trimmed };
        } catch {
            return rejectWithValue('Failed to update todo');
        }
    }
);

const slice = createSlice({
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
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodos.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.todos = payload;
                state.currentPage = 1;
            })
            .addCase(fetchTodos.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload ?? null;
            })
            .addCase(updateTodoTitle.pending, state => {
                state.error = null;
            })
            .addCase(updateTodoTitle.fulfilled, (state, { payload }) => {
                const t = state.todos.find(todo => todo.id === payload.id);
                if (t) t.title = payload.newTitle;
            })
            .addCase(updateTodoTitle.rejected, (state, { payload }) => {
                state.error = payload ?? 'Title must be at least 3 characters';
            });
    },
});

export const {
    setFilter,
    setSearchTerm,
    setCurrentPage,
    addTodo,
    removeTodo,
    setTheme,
} = slice.actions;

export default slice.reducer;
