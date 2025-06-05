import { useEffect } from 'react';
import { useTodoStore } from './store/todoStore';
import { useLoadingDots } from './hooks/useLoadingDots';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';

function App() {
    const { fetchTodos, loading, error } = useTodoStore();
    const dots = useLoadingDots();

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    return (
        <div style={{background: "green" }}>
            <h1>Todo App</h1>
            <TodoInput />
            {loading && <p>Loading{dots}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <TodoList />
        </div>
    );
}

export default App;