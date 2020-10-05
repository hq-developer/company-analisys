import { takeLatest, delay } from 'redux-saga/effects';

// Actions
import { actions } from './slice';

/**
 * Github repos request/response handler
 */
export function* init() {
    console.log('Init Data')
    yield delay(500);
    console.log('Init Data 2')
}

/**
 * Root saga manages watcher lifecycle
 */
export function* tableWatcher() {
    yield takeLatest(actions.initModule.type, init);
}