export interface Todo {
    userId?: number;
    id: number;
    title: string;
    completed: boolean;
}

export type TodoFilter = 'all' | 'completed' | 'incompleted';

export type ThemeType = 'light' | 'dark';

export interface TodoStore {
    todos: Todo[];
    loading: boolean;
    error: string | null;

    currentPage: number;
    setCurrentPage: (n: number) => void;

    filter: TodoFilter;
    setFilter: (filter: TodoFilter) => void;

    fetchTodos: () => void;
    addTodo: (title: string) => void;
    removeTodo: (id: number) => void;

    getVisibleTodos: () => Todo[];
    getTotalPages: () => number;
    getFilteredTodos: () => Todo[];

    searchTerm: string;
    setSearchTerm: (term: string) => void;

    updateTodoTitle: (id: number, newTitle: string) => Promise<void>;

    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
}

export interface TodoRowProps {
    todo: Todo;
    onDelete: (id: number) => void;
}