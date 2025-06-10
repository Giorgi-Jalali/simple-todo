import {useTodoStore} from '../store/todoStore';
import {Button, FilterContainer} from "../styles.ts";
import {FILTERS} from "../constants.ts";

const TodoFilter = () => {
    const {filter, setFilter} = useTodoStore();

    return (
        <FilterContainer>
            <Button onClick={() => setFilter('all')} disabled={filter === 'all'}>
                All
            </Button>
            {FILTERS.map((f) => (
                <Button key={f} onClick={() => setFilter(f)} disabled={filter === f}>
                    {f[0].toUpperCase() + f.slice(1)}
                </Button>
            ))}
        </FilterContainer>
    );
};

export default TodoFilter;