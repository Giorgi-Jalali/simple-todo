export interface Todo {
    userId?: number;
    id: number;
    title: string;
    completed: boolean;
}

export interface TodoStore {
    todos: Todo[];
    loading: boolean;
    error: string | null;
    fetchTodos: () => Promise<void>;
    addTodo: (title: string) => void;
    removeTodo: (id: number) => void;
}

export interface TodoRowProps {
    todo: Todo;
    onDelete: (id: number) => void;
}