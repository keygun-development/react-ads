import {AdNetwork} from "./index";

export type AdsenseProviderOptions = {
    client: string;
};

export type AdsenseSlotOptions = {
    slot: string;
    format?: string;
    responsive?: "true" | "false";
    size?: [number, number];
    adtest?: "on"|"off";
};

export const adsense: AdNetwork<"adsense"> = (
    container,
    providerOptions,
    slotOptions
) => {
    const { client } = providerOptions;
    const { slot, format, responsive, adtest, size } = slotOptions;

    // ✅ Voeg script tag toe als die nog niet aanwezig is
    if (!document.querySelector(`script[src*="adsbygoogle.js"]`)) {
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
    }

    const ad = document.createElement("ins");
    ad.className = "adsbygoogle";
    ad.setAttribute("data-ad-client", client);
    ad.setAttribute("data-ad-slot", slot);
    if (format) ad.setAttribute("data-ad-format", format);
    if (responsive) ad.setAttribute("data-full-width-responsive", responsive);
    if (adtest) ad.setAttribute("data-adtest", adtest);

    if (size) {
        const [w, h] = size;
        ad.style.display = "inline-block";
        ad.style.width = `${w}px`;
        ad.style.height = `${h}px`;
    } else {
        ad.style.display = "block";
    }

    container.appendChild(ad);

    (window as any).adsbygoogle = (window as any).adsbygoogle || [];
    (window as any).adsbygoogle.push({});
};