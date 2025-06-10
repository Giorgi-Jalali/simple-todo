import type {Todo} from '../types.ts';

export const filterFunctions = {
    completed: (todo: Todo) => todo.completed,
    incompleted: (todo: Todo) => !todo.completed,
} as const;