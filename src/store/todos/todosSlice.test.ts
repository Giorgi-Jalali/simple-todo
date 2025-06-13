import todosReducer, { addTodo } from './todosSlice';
import type { TodosState } from './types';

describe('todosSlice – addTodo reducer', () => {
    let initialState: TodosState;

    beforeEach(() => {
        initialState = {
            todos: [],
            loading: false,
            error: null,
            filter: 'all',
            searchTerm: '',
            currentPage: 1,
            theme: 'light',
        };
    });

    it('adds a new todo when title is at least 3 characters', () => {
        const action = addTodo('Write tests');
        const nextState = todosReducer(initialState, action);

        expect(nextState.todos).toHaveLength(1);
        expect(nextState.todos[0]).toMatchObject({
            title: 'Write tests',
            completed: false,
        });
        expect(nextState.error).toBeNull();
    });

    it('trims whitespace and still adds valid title', () => {
        const action = addTodo('  Do stuff  ');
        const nextState = todosReducer(initialState, action);

        expect(nextState.todos[0].title).toBe('Do stuff');
        expect(nextState.error).toBeNull();
    });

    it('does not add and sets error when title is shorter than 3 chars', () => {
        const action = addTodo('Hi');
        const nextState = todosReducer(initialState, action);

        expect(nextState.todos).toHaveLength(0);
        expect(nextState.error).toBe('Title must be at least 3 characters');
    });
});
