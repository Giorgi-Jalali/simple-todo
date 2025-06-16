import type {ThemeType, Todo} from "../../types.ts";

export interface TodosState {
    todos: Todo[];
    loading: boolean;
    error: string | null;
    filter: string;
    searchTerm: string;
    currentPage: number;
    theme: ThemeType;
}

export type UpdateTodoTitlePayload = {
    id: number;
    newTitle: string;
};