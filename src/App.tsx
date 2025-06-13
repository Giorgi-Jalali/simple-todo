/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';

import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchTodos, setTheme } from './store/todos/todosSlice';
import { lightTheme, darkTheme } from './styles/theme';

import { GlobalStyles } from './styles/global';
import { Button, Container, Error, Loading, Title } from './styles';

import { TodoInput } from './components/TodoInput';
import TodoFilter    from './components/TodoFilter';
import TodoSearch    from './components/todoSearch/TodoSearch';
import TodoTable     from './components/TodoTable';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

function App() {
    const dispatch = useAppDispatch();
    const { loading, error, theme } = useAppSelector(s => s.todos);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleThemeToggle = () => {
        dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'));
    };

    const activeTheme = theme === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeProvider theme={activeTheme}>
            <GlobalStyles />
            <Container>
                <Title>Todo App</Title>
                <Button onClick={handleThemeToggle}>
                    Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
                </Button>
                <TodoInput />
                {error   && <Error>{error}</Error>}
                <TodoFilter />
                <TodoSearch />
                {loading && <Loading>Loading</Loading>}
                {!loading && (
                    <ErrorBoundary>
                        <TodoTable />
                    </ErrorBoundary>
                )}
            </Container>
        </ThemeProvider>
    );
}

export default App;
