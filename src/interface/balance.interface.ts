export interface BalanceResponseInterface {
    status:          string;
    responseMessage: string;
    data:            Data;
}

export interface Data {
    balanceCommerce: string;
}
