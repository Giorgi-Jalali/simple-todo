import {create} from 'zustand';
import type {Todo, TodoStore} from '../types.ts';

const TODOS_PER_PAGE = 20;

export const useTodoStore = create<TodoStore>((set, get) => ({
    todos: [],
    loading: false,
    error: null,
    currentPage: 1,
    filter: 'all',

    setFilter: (filter) => set({filter, currentPage: 1}),

    setCurrentPage: (page) => set({currentPage: page}),

    fetchTodos: async () => {
        set({loading: true, error: null});

        try {
            const endpoints = [
                {key: 'todos', url: 'https://jsonplaceholder.typicode.com/todos'},
                {key: 'posts', url: 'https://jsonplaceholder.typicode.com/posts'},
            ];

            const responses = await Promise.all(
                endpoints.map((endpoint) =>
                    fetch(endpoint.url, {
                        headers: {Authorization: 'Bearer example-token'},
                    })
                )
            );

            const jsonData = await Promise.all(responses.map((res) => res.json()));

            const result: Record<string, Todo[]> = {};
            endpoints.forEach((endpoint, index) => {
                result[endpoint.key] = jsonData[index];
            });

            console.log('Fetched posts: ', result.posts);
            set({todos: result.todos, loading: false, currentPage: 1});

        } catch (error: unknown) {
            console.log('error: ', error);
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
        const {todos, filter} = get();
        if (filter === 'completed') {
            return todos.filter((t) => t.completed);
        }
        if (filter === 'incompleted') {
            return todos.filter((t) => !t.completed);
        }
        return todos;
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

}));
