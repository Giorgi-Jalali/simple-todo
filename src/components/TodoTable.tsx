import {useTodoStore} from '../store/todoStore';
import TodoRow from './TodoRow';
import {Button, InputContainer, Table, Th} from '../styles.ts';

const TodoTable = () => {
    const {
        todos,
        removeTodo,
        currentPage,
        setCurrentPage,
        getVisibleTodos,
        getTotalPages,
        getFilteredTodos,
    } = useTodoStore();

    const visibleTodos = getVisibleTodos();
    const totalPages = getTotalPages();
    const filteredTodos = getFilteredTodos();

    const goPrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <>
            <div>
                <div>Filtered Todos: {filteredTodos.length}</div>
                <div>Visible Todos on Page {currentPage}: {visibleTodos.length}</div>
                <div>All loaded Todos: {todos.length}</div>

                <InputContainer>
                    <div>
                        Page {currentPage} of {totalPages}
                    </div>
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
                {visibleTodos.map((todo) => (
                    <TodoRow key={todo.id} todo={todo} onDelete={removeTodo}/>
                ))}
                </tbody>
            </Table>
        </>
    );
};

export default TodoTable;
