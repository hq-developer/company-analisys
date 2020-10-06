import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';

// Types
import { NetworkStatus } from './types';

// Actions
import { actions } from './slice';

// Fetchers
import {
    fetchCompanies,
} from 'utils/fetchers'

/**
 * Initialize Module
 */
function* init() {
    yield put(actions.setNetworkState(NetworkStatus.ACTIVE));
    try {
        const _companies: Array<any> = yield call(fetchCompanies);
        yield put(actions.setNetworkState(NetworkStatus.SUCCESS));
    } catch (e) {
        yield put(actions.setNetworkState(NetworkStatus.FAILURE));
    }
}

/**
 * Run a sequence of requests updating the companies prices
 */
function* updateData(){
}

/**
 * Root saga manages watcher lifecycle
 */
export function* tableWatcher() {
    yield takeLatest(actions.initModule.type, init);
    yield takeEvery(actions.initUpdates.type, updateData);
}
