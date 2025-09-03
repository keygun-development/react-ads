import React, { createContext, ReactNode, useContext } from "react";
import { AdNetwork, networks, NetworkConfig } from "./networks";

type AdProviderProps<K extends keyof NetworkConfig> = {
    network: K;
    options: NetworkConfig[K]["provider"];
    adapter?: AdNetwork<K>;
    dev?: boolean;
    children: ReactNode;
};

interface AdContextValue<K extends keyof NetworkConfig> {
    network: K;
    options: NetworkConfig[K]["provider"];
    adapter?: AdNetwork<K>;
    dev?: boolean;
    getAdapter: () => AdNetwork<K>;
}

const AdContext = createContext<AdContextValue<any> | null>(null);

export function AdProvider<K extends keyof NetworkConfig>({
                                                              network,
                                                              options,
                                                              adapter,
                                                              dev = false,
                                                              children,
                                                          }: AdProviderProps<K>) {
    const getAdapter = (): AdNetwork<K> => {
        if (network === "custom" && adapter) return adapter;
        return networks[network] as AdNetwork<K>;
    };

    return (
        <AdContext.Provider value={{ network, options, adapter, getAdapter, dev }}>
            {children}
        </AdContext.Provider>
    );
}

export function useAdContext<K extends keyof NetworkConfig>() {
    const ctx = useContext(AdContext);
    if (!ctx) throw new Error("useAdContext must be used within AdProvider");
    return ctx as AdContextValue<K>;
}
