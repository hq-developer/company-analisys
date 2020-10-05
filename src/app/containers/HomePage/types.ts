/* --- STATE --- */
export interface TableState {
    companies: Array<any>;
    companiesPrices: Array<any>;
    markets: Array<any>;
    marketsPrices: Array<any>;
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