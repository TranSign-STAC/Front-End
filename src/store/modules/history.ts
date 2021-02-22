import { createReducer } from 'typesafe-actions';
import { takeEvery, put, call } from 'redux-saga/effects';

import * as historyApi from '../../utils/api/history';

type HistoryState = {
    fetchHistoryStatus: {
        loading: boolean;
        error: Error | null;
        data: History | null;
    };
};

export const FETCH_HISTORY_LOADING = 'history/FETCH_HISTORY_LOADING';
export const FETCH_HISTORY_SUCCESS = 'history/FETCH_HISTORY_SUCCESS';
export const FETCH_HISTORY_ERROR = 'history/FETCH_HISTORY_ERROR';

function* readHistorySaga(action: any) {
    try {
        const result = yield call(historyApi.readHistory, action.payload);
        yield put({ type: FETCH_HISTORY_SUCCESS, payload: result.data.history });
    } catch (error) {
        yield put({ type: FETCH_HISTORY_ERROR, payload: error });
    }
}

const initialState: HistoryState = {
    fetchHistoryStatus: {
        loading: false,
        data: null,
        error: null,
    },
};

export default createReducer<HistoryState>(initialState, {
    [FETCH_HISTORY_LOADING]: (state) => ({
        ...state,
        fetchHistoryStatus: {
            loading: true,
            error: null,
            data: null,
        },
    }),
    [FETCH_HISTORY_SUCCESS]: (state, action) => ({
        ...state,
        fetchHistoryStatus: {
            loading: false,
            error: null,
            data: action.payload,
        },
    }),
    [FETCH_HISTORY_ERROR]: (state, action) => ({
        ...state,
        fetchHistoryStatus: {
            loading: false,
            error: action.payload,
            data: null,
        },
    }),
});

export function* historySaga() {
    yield takeEvery(FETCH_HISTORY_LOADING, readHistorySaga);
}
