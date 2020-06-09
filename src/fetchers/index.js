import { generateData } from './data';

const mainDataSet = generateData();

/**
 * Access points
 */
export const getPrices = [10, 20];

/**
 * Fetch all companies
 */
export const fetchCompanies = () => mainDataSet.companies;

/**
 * Fetch company's prices by company's ids
 * @param {Array} companyIds 
 */
export const fetchCompaniesPrices = companyIds => Array.isArray(companyIds) 
    ? mainDataSet.companiesPrices.filter(prices => companyIds.includes(prices.company))
    : undefined;

/**
 * Fetch all markets data
 */
export const fetchMarkets = () => mainDataSet.markets;

/**
 * Fetch markets prices by market's ids
 * @param {Array} marketIds 
 */
export const fetchMarketsPrices = marketIds => Array.isArray(marketIds)
    ? mainDataSet.marketsPrices.filter(market => marketIds.includes(market.id))
    : undefined;

/**
 * Fetch conversion rates from: https://exchangeratesapi.io/
 */
export const fetchConversionRates = () => {
    const baseUrl = 'https://api.exchangeratesapi.io';
}