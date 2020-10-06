/* -- MODELS --- */
interface IEntityDTO {
    id: number;
    name: string;
    description: string;
}

export interface ICompanyDTO extends IEntityDTO {
    market: number;
}

export interface IMarketDTO extends IEntityDTO {}

export type Price = Record<string, number>;

export interface ICompanyPricesDTO {
    company: number;
    prices: Array<Price>;
}

export interface IMarketPricesDTO {
    market: number;
    prices: Array<Price>;
}

export interface IPricesMap {
    id: number;
    prices: Price;
}

/* --- STATE --- */
export interface TableState {
    companies: Array<ICompanyDTO>;
    companiesPrices: Array<IPricesMap>;
    markets: Array<IMarketDTO>;
    marketsPrices: Array<IPricesMap>;
    network: NetworkStatus;
}

export enum NetworkStatus {
    IDLE,
    ACTIVE,
    SUCCESS,
    FAILURE,
}

/*
  Internal type
*/
export type ContainerState = TableState;