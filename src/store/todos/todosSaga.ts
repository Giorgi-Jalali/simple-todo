import { takeEvery, call, put, all } from 'redux-saga/effects';
import {
    fetchTodos,
    fetchTodosPending,
    fetchTodosFulfilled,
    fetchTodosRejected,
    updateTodoTitle,
    updateTodoTitlePending,
    updateTodoTitleFulfilled,
    updateTodoTitleRejected
} from './todosSlice';
import { API_ENDPOINTS, AUTH_HEADER } from '../../config/api';
import { patchTodo } from '../../api/todoApi';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {Todo} from "../../types.ts";

function* fetchTodosSaga() {
    try {
        yield put(fetchTodosPending());

        const entries = Object.entries(API_ENDPOINTS);
        const responses: Response[] = yield all(
            entries.map(([, url]) => call(fetch, url, { headers: AUTH_HEADER }))
        );
        const data: Todo[][] = yield all(responses.map(response => call([response, 'json'])));

        yield put(fetchTodosFulfilled(data[0]));
    } catch (error) {
        yield put(fetchTodosRejected('Failed to fetch todos'));
        console.log("Error: ", error);
    }
}

function* updateTodoTitleSaga(action: PayloadAction<{ id: number; newTitle: string }>) {
    try {
        yield put(updateTodoTitlePending());

        const { id, newTitle } = action.payload;
        const trimmed = newTitle.trim();

        if (trimmed.length < 3) {
            yield put(updateTodoTitleRejected('Title must be at least 3 characters'));
            return;
        }

        yield call(patchTodo, id, { title: trimmed });
        yield put(updateTodoTitleFulfilled({ id, newTitle: trimmed }));
    } catch (error) {
        yield put(updateTodoTitleRejected('Failed to update todo'));
        console.log("Error: ", error);
    }
}

function* watchFetchTodos() {
    yield takeEvery(fetchTodos.type, fetchTodosSaga);
}

function* watchUpdateTodoTitle() {
    yield takeEvery(updateTodoTitle.type, updateTodoTitleSaga);
}

export default function* todosSaga() {
    yield all([watchFetchTodos(), watchUpdateTodoTitle()]);
}
