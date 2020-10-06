import { createSelector } from '@reduxjs/toolkit';

import moment from "moment";

import { RootState } from 'types';
import { initialState } from './slice';
import {ReactNode} from "react";

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.table || initialState;

export const selectCompanies = createSelector(
    [selectDomain],
    domain => domain.companies,
);

export const selectCompaniesIds = createSelector(
    [selectCompanies],
    companies => companies.map(c => c.id),
);


export const selectCompaniesPrices = createSelector(
    [selectDomain],
    domain => domain.companiesPrices,
);

export const selectMarkets = createSelector(
    [selectDomain],
    domain => domain.markets,
);

export const selectMarketsPrices = createSelector(
    [selectDomain],
    domain => domain.marketsPrices,
);

export const selectDataForTable = createSelector(
    [
        selectCompanies,
        selectCompaniesPrices,
        selectMarkets,
        selectMarketsPrices,
    ],
    (
        companies,
        allCompaniesPrices,
        markets,
        allMarketsPrices,
    ) => {
        const today = moment();
        const trendStart = today.clone().subtract(10, 'days');
        return companies.map(company => {
            const rowInfo: Array<ReactNode> = [];
            if (!company) {
                return rowInfo;
            }

            const {name, id, market: mktId} = company;
            const market = markets.find(m => m.id === mktId)
            const compPrices = allCompaniesPrices.find(cp => cp.id === id);
            const mktPrices = allMarketsPrices.find(cp => cp.id === mktId);
            const mktName = market?.name || '';

            const priceToday = compPrices?.prices[today.format('YYYY-MM-DD')].toFixed(2) || '';
            const priceTrendInit = compPrices?.prices[trendStart.format('YYYY-MM-DD')].toFixed(2) || '';
            const compTrend = priceToday && priceTrendInit
                ? priceToday > priceTrendInit ? 'Grow' : 'Loss'
                : 'no data'

            const mktPriceToday = mktPrices?.prices[today.format('YYYY-MM-DD')].toFixed(2) || '';
            const mktPriceTrendInit = mktPrices?.prices[trendStart.format('YYYY-MM-DD')].toFixed(2) || '';
            const mktTrend = mktPriceToday && mktPriceTrendInit
                ? mktPriceToday > mktPriceTrendInit ? 'Grow' : 'Loss'
                : 'no data'

            const bestPrice = compPrices
                ? Math.max(...Object.values(compPrices.prices)).toFixed(2)
                : 'no data';

            const worstPrice = compPrices
                ? Math.min(...Object.values(compPrices.prices)).toFixed(2)
                : 'no data';

            rowInfo.push(name)
            rowInfo.push(mktName)
            rowInfo.push(priceToday)
            rowInfo.push(compTrend)
            rowInfo.push(mktTrend)
            rowInfo.push(bestPrice)
            rowInfo.push(worstPrice)
            return rowInfo
        });
    },
);
