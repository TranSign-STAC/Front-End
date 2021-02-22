import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import translate, { translateSaga } from './modules/translate';
import history, { historySaga } from './modules/history';

export function* rootSaga() {
    yield all([translateSaga(), historySaga()]);
}
export default combineReducers({ translate, history });
