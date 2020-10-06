import { takeLatest } from 'redux-saga/effects';

// Actions
import { actions } from './slice';

// Fetchers
// import { fetchCompanies } from 'utils/fetchers'

/**
 * Initialize Module
 */
export function* init() {}

/**
 * Root saga manages watcher lifecycle
 */
export function* tableWatcher() {
    yield takeLatest(actions.initModule.type, init);
}