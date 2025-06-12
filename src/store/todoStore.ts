import {create} from 'zustand';
import type {Todo, TodoStore} from '../types.ts';
import {TODOS_PER_PAGE} from '../constants.ts';
import {filterFunctions} from "../utils/filterFunctions.ts";
import {API_ENDPOINTS, AUTH_HEADER} from "../config/api.ts";
import {patchTodo} from "../api/todoApi.ts";

export const useTodoStore = create<TodoStore>((set, get) => ({
    todos: [],
    loading: false,
    error: null,
    currentPage: 1,
    filter: 'all',
    searchTerm: '',
    setSearchTerm: (term) => set({ searchTerm: term }),

    setFilter: (filter) => set({filter, currentPage: 1}),

    setCurrentPage: (page) => set({currentPage: page}),

    fetchTodos: async () => {
        set({loading: true, error: null});

        try {
            const endpointEntries = Object.entries(API_ENDPOINTS);

            const responses = await Promise.all(
                endpointEntries.map(([, url]) =>
                    fetch(url, {
                        headers: AUTH_HEADER,
                    })
                )
            );

            const data = await Promise.all(responses.map((res) => res.json()));

            const [todos, posts] = data;

            console.log('Fetched posts:', posts);

            set({
                todos,
                loading: false,
                currentPage: 1,
            });
        } catch (error) {
            console.error('Error:', error);
            set({error: 'Failed to fetch todos', loading: false});
        }
    },

    addTodo: (title) =>
        set((state) => {
            const newTodo: Todo = {
                id: Date.now(),
                title,
                completed: false,
            };
            return {todos: [newTodo, ...state.todos]};
        }),

    removeTodo: (id) =>
        set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
        })),

    getFilteredTodos: () => {
        const { todos, filter, searchTerm } = get();
        const fn = filterFunctions[filter as keyof typeof filterFunctions];
        let filtered = todos.filter(fn);

        if (searchTerm.trim()) {
            filtered = filtered.filter(todo =>
                todo.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
            );
        }

        return filtered;
    },

    getVisibleTodos: () => {
        const {currentPage} = get();
        const filtered = get().getFilteredTodos();
        const start = (currentPage - 1) * TODOS_PER_PAGE;
        return filtered.slice(start, start + TODOS_PER_PAGE);
    },

    getTotalPages: () => {
        const filtered = get().getFilteredTodos();
        return Math.ceil(filtered.length / TODOS_PER_PAGE);
    },

    updateTodoTitle: async (id: number, newTitle: string) => {
        const previousTodos = get().todos;

        set((state) => ({
            todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, title: newTitle } : todo
            ),
        }));

        try {
            await patchTodo(id, { title: newTitle });
        } catch (error) {
            console.error('Failed to update todo.', error);
            set({ todos: previousTodos });
        }
    },

}));
