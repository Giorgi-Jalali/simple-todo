import {useTodoStore} from '../store/todoStore';
import TodoRow from './TodoRow';
import {Button, InputContainer, Table, Th} from "../styles.ts";

const TodoTable = () => {
    const {
        todos,
        removeTodo,
        filter,
        currentPage,
        setCurrentPage,
        getVisibleTodos,
        getTotalPages,
    } = useTodoStore();

    const visibleTodos = getVisibleTodos();

    const totalPages = getTotalPages();

    const goPrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <>
            <div>
                <div>Filtered Todos Number: {todos.filter(todo => {
                    if (filter === 'completed') return todo.completed;
                    if (filter === 'incompleted') return !todo.completed;
                    return true;
                }).length}</div>

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
