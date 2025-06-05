import { create } from 'zustand';
import type { Todo, TodoStore } from '../types.ts';

export const useTodoStore = create<TodoStore>((set) => ({
    todos: [],
    loading: false,
    error: null,

    fetchTodos: async () => {
        set({ loading: true, error: null });
        try {
            const [todos, posts] = await Promise.all([
                fetch('https://jsonplaceholder.typicode.com/todos', {
                    headers: { Authorization: 'Bearer example-token' },
                }).then((res) => res.json()),
                fetch('https://jsonplaceholder.typicode.com/posts', {
                    headers: { Authorization: 'Bearer example-token' },
                }).then((res) => res.json()),
            ]);
            console.log('Fetched posts: ', posts);
            set({ todos: todos.slice(0, 10), loading: false });
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
