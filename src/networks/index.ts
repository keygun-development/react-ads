import {adsense, AdsenseProviderOptions, AdsenseSlotOptions} from "./adsense";
import {custom, CustomProviderOptions, CustomSlotOptions} from "./custom";

export type NetworkConfig = {
    adsense: {
        provider: AdsenseProviderOptions;
        slot: AdsenseSlotOptions;
    };
    custom: {
        provider: CustomProviderOptions;
        slot: CustomSlotOptions;
    };
};

export type AdNetwork<K extends keyof NetworkConfig> = (
    container: HTMLElement,
    providerOptions: NetworkConfig[K]["provider"],
    slotOptions: NetworkConfig[K]["slot"]
) => void;

export const networks: { [K in keyof NetworkConfig]: AdNetwork<K> } = {
    adsense,
    custom,
};