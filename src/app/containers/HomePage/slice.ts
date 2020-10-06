/*
 * Table Slice
 *
 * Here we define:
 * - The shape of our container's slice of Redux store,
 * - All the actions which can be triggered for this slice, including their effects on the store.
 *
 * Note that, while we are using dot notation in our reducer, we are not actually mutating the state
 * manually. Under the hood, we use immer to apply these updates to a new copy of the state.
 * Please see https://immerjs.github.io/immer/docs/introduction for more information.
 *
 */
import {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from 'utils/@reduxjs/toolkit';
import {
    ContainerState,
    ICompanyDTO,
    ICompanyPricesDTO,
    IMarketDTO,
    IMarketPricesDTO,
    NetworkStatus,
    Price,
    IPricesMap,
} from './types';

// The initial state of the GithubRepoForm container
export const initialState: ContainerState = {
    companies: [],
    companiesPrices: [],
    markets: [],
    marketsPrices: [],
    network: NetworkStatus.IDLE,
};

const createPricesMap = (data: Array<Price>): Price => data.reduce((a, c) => {
    const k = Object.keys(c)[0];
    const v = Object.values(c)[0];
    a[k] = v;
    return a;
}, {} as Price)

const tableDataSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        initModule() {},
        initUpdates() {},
        setCompanies(state, action: PayloadAction<Array<ICompanyDTO>>) {
            state.companies = action.payload;
        },
        setCompaniesPrices(state, action: PayloadAction<Array<ICompanyPricesDTO>>) {
            state.companiesPrices =
                action.payload.reduce((a, c) => {
                    const n = [...a];
                    n.push({
                        id: c.company,
                        prices: createPricesMap(c.prices),
                    } as IPricesMap)
                    return n;
                }, [] as Array<IPricesMap>);
        },
        setMarkets(state, action: PayloadAction<Array<IMarketDTO>>) {
            state.markets = action.payload;
        },
        setMarketsPrices(state, action: PayloadAction<Array<IMarketPricesDTO>>) {
            state.marketsPrices =
                action.payload.reduce((a, c) => {
                    const n = [...a];
                    n.push({
                        id: c.market,
                        prices: createPricesMap(c.prices),
                    } as IPricesMap)
                    return n;
                }, [] as Array<IPricesMap>);
        },
        setNetworkState(state, action: PayloadAction<NetworkStatus>) {
            state.network = action.payload;
        },
    },
});

export const { actions, reducer, name: sliceKey } = tableDataSlice;