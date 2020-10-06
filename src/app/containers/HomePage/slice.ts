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
    NetworkStatus,
} from './types';

// The initial state of the GithubRepoForm container
export const initialState: ContainerState = {
    companies: [],
    companiesPrices: [],
    markets: [],
    marketsPrices: [],
    network: NetworkStatus.IDLE,
};

const tableDataSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        initModule() {},
        initUpdates() {},
        setCompanies(state, action: PayloadAction<Array<any>>) {
            state.companies = action.payload;
        },
        setCompaniesPrices(state, action: PayloadAction<Array<any>>) {
            state.companiesPrices = action.payload;
        },
        setMarkets(state, action: PayloadAction<Array<any>>) {
            state.markets = action.payload;
        },
        setMarketsPrices(state, action: PayloadAction<Array<any>>) {
            state.marketsPrices = action.payload;
        },
        setNetworkState(state, action: PayloadAction<NetworkStatus>) {
            state.network = action.payload;
        },
    },
});

export const { actions, reducer, name: sliceKey } = tableDataSlice;
