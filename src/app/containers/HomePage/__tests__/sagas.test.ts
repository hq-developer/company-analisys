import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

// Actions
import { actions } from '../slice';

// Fetchers
import {
    fetchCompanies,
    fetchMarkets,
    fetchCompanyPrices,
    fetchMarketsPrices
} from 'utils/fetchers'

import * as Sagas from '../sagas';
import {ICompanyDTO, ICompanyPricesDTO, IMarketDTO, IMarketPricesDTO, NetworkStatus} from "../types";

describe('Table Sagas', () => {
    it('should trigger all flow', async () => {
        const mockFetchCompanies = [{id: 1}, {id: 2}];
        const mockFetchMarkets = [{id: 3}, {id: 4}];
        const mockFetchCompanyPrices = {company: 'x'};
        const mockFetchMarketPrices = {market: 'y'};

        await expectSaga(Sagas.tableWatcher)
            .provide([
                [matchers.call.fn(fetchCompanies), mockFetchCompanies],
                [matchers.call.fn(fetchMarkets), mockFetchMarkets],
                [matchers.call.fn(fetchCompanyPrices), mockFetchCompanyPrices],
                [matchers.call.fn(fetchMarketsPrices), mockFetchMarketPrices],
            ])
            .put(actions.setNetworkState(NetworkStatus.ACTIVE))
            .call(fetchCompanies)
            .call(fetchMarkets)
            .put(actions.setCompanies(mockFetchCompanies as Array<ICompanyDTO>))
            .put(actions.setMarkets(mockFetchMarkets as Array<IMarketDTO>))
            .call(fetchCompanyPrices, 1)
            .call(fetchCompanyPrices, 2)
            .call(fetchMarketsPrices, 3)
            .call(fetchMarketsPrices, 4)
            .put(actions.setCompaniesPrices([
                mockFetchCompanyPrices as unknown as ICompanyPricesDTO,
                mockFetchCompanyPrices as unknown as ICompanyPricesDTO,
            ]))
            .put(actions.setMarketsPrices([
                mockFetchMarketPrices as unknown as IMarketPricesDTO,
                mockFetchMarketPrices as unknown as IMarketPricesDTO,
            ]))
            .put(actions.setNetworkState(NetworkStatus.SUCCESS))
            // .put(actions.initUpdates())
            .dispatch(actions.initModule())
            .silentRun();
    })
});