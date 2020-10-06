import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

// Actions
import { actions } from '../slice';

// Fetchers
import {
    fetchCompanies,
} from 'utils/fetchers'

import * as Sagas from '../sagas';
import {NetworkStatus} from "../types";

describe('Table Sagas', () => {
    it('should trigger all flow', async () => {
        const mockFetchCompanies = [{id: 1}, {id: 2}];

        await expectSaga(Sagas.tableWatcher)
            .provide([
                [matchers.call.fn(fetchCompanies), mockFetchCompanies],
            ])
            .put(actions.setNetworkState(NetworkStatus.ACTIVE))
            .call(fetchCompanies)
            .put(actions.setNetworkState(NetworkStatus.SUCCESS))
            .dispatch(actions.initModule())
            .silentRun();
    })
});
