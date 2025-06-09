import { create } from 'zustand';
import type { Todo, TodoStore } from '../types.ts';

export const useTodoStore = create<TodoStore>((set) => ({
    todos: [],
    loading: false,
    error: null,

    fetchTodos: async () => {
        set({ loading: true, error: null });

        try {
            const endpoints = [
                { key: 'todos', url: 'https://jsonplaceholder.typicode.com/todos' },
                { key: 'posts', url: 'https://jsonplaceholder.typicode.com/posts' },
            ];

            const responses = await Promise.all(
                endpoints.map((endpoint) =>
                    fetch(endpoint.url, {
                        headers: { Authorization: 'Bearer example-token' },
                    })
                )
            );

            const jsonData = await Promise.all(responses.map((res) => res.json()));

            const result: Record<string, Todo[]> = {};
            endpoints.forEach((endpoint, index) => {
                result[endpoint.key] = jsonData[index];
            });

            console.log('Fetched posts: ', result.posts);
            set({ todos: result.todos.slice(0, 8), loading: false });

        } catch (error: unknown) {
            console.log('error: ', error);
            set({ error: 'Failed to fetch todos', loading: false });
        }
    },

    addTodo: (title) =>
        set((state) => {
            const newTodo: Todo = {
                id: Date.now(),
                title,
                completed: false,
            };
            return { todos: [newTodo, ...state.todos] };
        }),

    removeTodo: (id) =>
        set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
        })),
}));
