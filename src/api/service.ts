import axiosInstance from "./axios.instance";
import { useAuthStore } from "../store";
import { BalanceResponseInterface } from "../interface/balance.interface";
import { ProvidersResponseInterface } from "../interface/providers.interface";

export const useBalanceService = () => {
    const token  = useAuthStore().getToken();
    let balanceCache: BalanceResponseInterface | null = null;

    const getBalance = async () => {
        if (balanceCache !== null) {
            return balanceCache;
        }

        try {
            const response = await axiosInstance.get<BalanceResponseInterface>('/getActualBalance', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            balanceCache = response.data;
            return balanceCache;
        } catch (error) {
            console.error('Failed to get balance:', error);
            throw error;
        }
    };

    return { getBalance };
}

export const useProviders = () => {
    const token  = useAuthStore().getToken();
    let providersCache: ProvidersResponseInterface | null = null;

    const getProviders = async () => {
        if (providersCache !== null) {
            return providersCache;
        }

        try {
            const response = await axiosInstance.get<ProvidersResponseInterface>('/getProviders', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            providersCache = response.data;
            return providersCache;
        } catch (error) {
            console.error('Failed to get providers:', error);
            throw error;
        }
    };

    return { getProviders };
}
