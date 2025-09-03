import {AdNetwork} from "./index";

export type CustomProviderOptions = {
    scriptUrl: string;
};

export type CustomSlotOptions = {
    slotId: string;
    size?: [number, number];
    sizes?: [number, number][] | Record<string, [number, number]>;
};

export const custom: AdNetwork<"custom"> = (container, providerOptions, slotOptions) => {
    const { scriptUrl } = providerOptions;
    const { slotId, sizes } = slotOptions;

    if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
        const script = document.createElement("script");
        script.src = scriptUrl;
        document.body.appendChild(script);
    }

    const div = document.createElement("div");
    div.id = slotId;
    container.appendChild(div);

    console.log("Custom ad sizes:", sizes);
}