import { takeLatest, takeEvery, call, put, all, select, delay } from 'redux-saga/effects';

// Types
import { ICompanyDTO, IMarketDTO, NetworkStatus } from './types';

// Actions
import { actions } from './slice';

// Fetchers
import {
    fetchCompanies,
    fetchMarkets,
    fetchCompanyPrices,
    fetchMarketsPrices,
    update,
} from 'utils/fetchers'

// Selectors
import { selectCompaniesIds } from './selectors';

/**
 * Initialize Module
 */
function* init() {
    yield put(actions.setNetworkState(NetworkStatus.ACTIVE));
    try {
        const companies: Array<ICompanyDTO> = yield call(fetchCompanies);
        const markets: Array<IMarketDTO> = yield call(fetchMarkets);

        yield put(actions.setCompanies(companies))
        yield put(actions.setMarkets(markets))

        yield call(fetchCompanyPricesIntoState, companies.map(c => c.id));
        yield call(fetchMarketPricesIntoState, markets.map(m => m.id));

        yield put(actions.setNetworkState(NetworkStatus.SUCCESS));

        // yield put(actions.initUpdates())
    } catch (e) {
        yield put(actions.setNetworkState(NetworkStatus.FAILURE));
    }
}

/**
 * Fetches the Companies prices and updates the state
 * @param ids
 */
function* fetchCompanyPricesIntoState(ids: Array<number>) {
    const effects = ids.reduce((a, c) => {
        a[c] = call(fetchCompanyPrices, c);
        return a;
    }, {});

    const prices = yield all(effects);
    yield put(actions.setCompaniesPrices(Object.values(prices)))
}

/**
 * Fetches Market prices and update the state.
 * @param ids
 */
function* fetchMarketPricesIntoState(ids: Array<number>) {
    const effects = ids.reduce((a, c) => {
        a[c] = call(fetchMarketsPrices, c);
        return a;
    }, {});

    const prices = yield all(effects);
    yield put(actions.setMarketsPrices(Object.values(prices)))
}

/**
 * Run a sequence of requests updating the companies prices
 */
function* updateData(){
    yield delay(1000);
    const companiesIds = yield select(selectCompaniesIds);
    const numberOfUpdates = 15;
    let count = 0;
    while(count < numberOfUpdates){
        yield call(update);
        yield delay(500);
        yield call(fetchCompanyPricesIntoState, companiesIds);
        count++;
    }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* tableWatcher() {
    yield takeLatest(actions.initModule.type, init);
    yield takeEvery(actions.initUpdates.type, updateData);
}