import {useTodoStore} from '../store/todoStore';
import {Button, FilterContainer} from "../styles.ts";

const TodoFilter = () => {
    const {filter, setFilter} = useTodoStore();

    return (
        <FilterContainer>
            <Button onClick={() => setFilter('all')} disabled={filter === 'all'}>All</Button>
            <Button onClick={() => setFilter('completed')} disabled={filter === 'completed'}>Completed</Button>
            <Button onClick={() => setFilter('incompleted')} disabled={filter === 'incompleted'}>Incompleted</Button>
        </FilterContainer>
    );
};

export default TodoFilter;
