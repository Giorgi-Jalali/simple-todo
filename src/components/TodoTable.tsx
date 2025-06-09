import { useTodoStore } from '../store/todoStore';
import TodoRow from './TodoRow';
import {Table, Th} from "../styles.ts";

const TodoTable = () => {
    const { todos, removeTodo } = useTodoStore();

    return (
        <Table>
            <thead>
            <tr>
                <Th>Title</Th>
                <Th>Completed</Th>
                <Th>Action</Th>
            </tr>
            </thead>
            <tbody>
            {todos.map((todo) => (
                <TodoRow key={todo.id} todo={todo} onDelete={removeTodo} />
            ))}
            </tbody>
        </Table>
    );
};

export default TodoTable;
