import { createReducer } from 'typesafe-actions';
import { takeEvery, put, call } from 'redux-saga/effects';

import * as translateApi from '../../utils/api/translate';

type TranslationState = { translateStatus: object };

export const TRANSLATE_TEXT_TO_SIGN_LOADING = 'history/TRANSLATE_TEXT_TO_SIGN_LOADING';
export const TRANSLATE_SIGN_TO_TEXT_LOADING = 'history/TRANSLATE_SIGN_TO_TEXT_LOADING';
export const TRANSLATE_SUCCESS = 'history/TRANSLATE_SUCCESS';
export const TRANSLATE_ERROR = 'history/TRANSLATE_ERROR';

function* translateTextToSignSaga(action: any) {
    try {
        const result = yield call(translateApi.translateTextToSign, action.payload);
        yield put({ type: TRANSLATE_SUCCESS, payload: result.data });
    } catch (error) {
        yield put({ type: TRANSLATE_ERROR, payload: error });
    }
}

function* translateSignToTextSaga(action: any) {
    try {
        const result = yield call(translateApi.translateTextToSign, action.payload);
        console.log(result);
        // yield put({ type: TRANSLATE_SUCCESS, payload: result.data.history });
    } catch (error) {
        yield put({ type: TRANSLATE_ERROR, payload: error });
    }
}

const initialState: TranslationState = {
    translateStatus: {
        loading: false,
        data: null,
        error: null,
    },
};

export default createReducer<TranslationState>(initialState, {
    [TRANSLATE_TEXT_TO_SIGN_LOADING]: (state) => ({
        ...state,
        translateStatus: {
            loading: true,
            error: null,
            data: null,
        },
    }),
    [TRANSLATE_SIGN_TO_TEXT_LOADING]: (state) => ({
        ...state,
        translateStatus: {
            loading: true,
            error: null,
            data: null,
        },
    }),
    [TRANSLATE_SUCCESS]: (state, action) => ({
        ...state,
        translateStatus: {
            loading: false,
            error: null,
            data: action.payload,
        },
    }),
    [TRANSLATE_ERROR]: (state, action) => ({
        ...state,
        translateStatus: {
            loading: false,
            error: action.payload,
            data: null,
        },
    }),
});

export function* translateSaga() {
    yield takeEvery(TRANSLATE_TEXT_TO_SIGN_LOADING, translateTextToSignSaga);
    yield takeEvery(TRANSLATE_SIGN_TO_TEXT_LOADING, translateSignToTextSaga);
}
