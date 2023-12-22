export interface ProvidersResponseInterface {
    status: string;
    responseMessage: string;
    data: ProvidersInterface;
}

export interface ProvidersInterface {
    companies: ListProvidersInterface[];
}

export interface ListProvidersInterface {
    _id: string;
    company: string;
    image: string;
}
