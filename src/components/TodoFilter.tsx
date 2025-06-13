import {FILTERS} from '../constants';
import {Button, FilterContainer} from '../styles';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {setFilter} from '../store/todos/todosSlice';

const TodoFilter = () => {
    const dispatch = useAppDispatch();
    const filter = useAppSelector((state) => state.todos.filter);

    return (
        <FilterContainer>
            <Button onClick={() => dispatch(setFilter('all'))} disabled={filter === 'all'}>
                All
            </Button>
            {FILTERS.map((f) => (
                <Button
                    key={f}
                    onClick={() => dispatch(setFilter(f))}
                    disabled={filter === f}
                >
                    {f[0].toUpperCase() + f.slice(1)}
                </Button>
            ))}
        </FilterContainer>
    );
};

export default TodoFilter;
