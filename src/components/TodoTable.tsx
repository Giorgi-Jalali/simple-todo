import { useState } from 'react';
import { Button, InputContainer, Table, Th } from '../styles';
import TodoRow from './TodoRow';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
    getFilteredTodos,
    getVisibleTodos,
    getTotalPages
} from '../store/todos/selectors';
import { setCurrentPage } from '../store/todos/todosSlice';

const TodoTable = () => {
    const [shouldCrash, setShouldCrash] = useState(false);
    const dispatch = useAppDispatch();

    const todosCount    = useAppSelector(state => state.todos.todos.length);
    const filteredCount = useAppSelector(getFilteredTodos).length;
    const visibleTodos  = useAppSelector(getVisibleTodos);
    const totalPages    = useAppSelector(getTotalPages);
    const currentPage   = useAppSelector(state => state.todos.currentPage);

    if (shouldCrash) {
        throw new Error('Simulated render error for ErrorBoundary');
    }

    const goPrev = () => {
        if (currentPage > 1) {
            dispatch(setCurrentPage(currentPage - 1));
        }
    };
    const goNext = () => {
        if (currentPage < totalPages) {
            dispatch(setCurrentPage(currentPage + 1));
        }
    };

    return (
        <>
            <div>
                <div>Filtered Todos: {filteredCount}</div>
                <div>Visible Todos on Page {currentPage}: {visibleTodos.length}</div>
                <div>All loaded Todos: {todosCount}</div>
                <Button onClick={() => setShouldCrash(true)}>
                    Test ErrorBoundary
                </Button>

                <InputContainer>
                    <div>Page {currentPage} of {totalPages}</div>
                    <Button onClick={goPrev} disabled={currentPage === 1}>
                        Prev
                    </Button>
                    <Button onClick={goNext} disabled={currentPage === totalPages}>
                        Next
                    </Button>
                </InputContainer>
            </div>

            <Table>
                <thead>
                <tr>
                    <Th>Title</Th>
                    <Th>Completed</Th>
                    <Th>Action</Th>
                </tr>
                </thead>
                <tbody>
                {visibleTodos.map(todo => (
                    <TodoRow key={todo.id} todo={todo} />
                ))}
                </tbody>
            </Table>
        </>
    );
};

export default TodoTable;
