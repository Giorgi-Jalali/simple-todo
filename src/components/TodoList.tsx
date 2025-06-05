import { useTodoStore } from '../store/todoStore';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
    const { todos, removeTodo } = useTodoStore();

    return (
        <ul>
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} onDelete={removeTodo} />
            ))}
        </ul>
    );
};