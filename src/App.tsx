/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { useTodoStore } from './store/todoStore';
import { TodoInput } from './components/TodoInput';
import TodoTable from './components/TodoTable.tsx';

import {Container, Error, Loading, Title} from "./styles.ts";

function App() {
    const { fetchTodos, loading, error } = useTodoStore();

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    return (
        <Container>
            <Title>Todo App</Title>
            <TodoInput />
            {loading && <Loading>Loading</Loading>}
            {error && <Error>{error}</Error>}
            {!loading && <TodoTable />}
        </Container>
    );
}

export default App;
