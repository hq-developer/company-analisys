const API_DOMAIN = "http://localhost:3030";
/**
 * Fetch all companies
 */
export const fetchCompanies = () =>
  fetch(`${API_DOMAIN}/companies`)
    .then((response) => response.json())
    .catch(() => undefined);

/**
 * Fetch company's prices by company's id
 * @param id
 */
export const fetchCompanyPrices = (id) =>
  fetch(`${API_DOMAIN}/company/${id}/prices`)
    .then((response) => response.json())
    .catch(() => undefined);

/**
 * Fetch all markets data
 */
export const fetchMarkets = () =>
  fetch(`${API_DOMAIN}/markets`)
    .then((response) => response.json())
    .catch(() => undefined);

/**
 * Fetch market prices by market's id
 * @param id
 */
export const fetchMarketsPrices = (id) =>
  fetch(`${API_DOMAIN}/market/${id}/prices`)
    .then((response) => response.json())
    .catch(() => undefined);

/**
 * Fetch conversion rates from: https://exchangeratesapi.io/
 */
// export const fetchConversionRates = () => {
//     const baseUrl = 'https://api.exchangeratesapi.io';
// }

export const update = () =>
  fetch(`${API_DOMAIN}/update`)
    .then((r) => true)
    .catch(() => false);
