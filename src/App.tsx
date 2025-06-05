import { useEffect } from 'react';
import { useTodoStore } from './store/todoStore';
import { useLoadingDots } from './hooks/useLoadingDots';
import { TodoInput } from './components/TodoInput';
import TodoTable from "./components/TodoTable.tsx";

function App() {
    const { fetchTodos, loading, error } = useTodoStore();
    const dots = useLoadingDots();

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    return (
        <div style={{ width: "700px" }}>
            <h1>Todo App</h1>
            <TodoInput />
            {loading && <p>Loading{dots}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && <TodoTable />}
        </div>
    );
}

export default App;