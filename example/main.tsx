import React from "react";
import ReactDOM from "react-dom/client";
import {AdProvider, AdSlot} from "../src";

ReactDOM.createRoot(document.getElementById("root")!).render(
    // Define your own adsense client and ad-slots
    <React.StrictMode>
        <AdProvider network="adsense" options={{client: "ca-pub-xxx"}}>
            <AdSlot<"adsense">
                options={{slot: "xxx", format: "auto", responsive: "false", adtest: "on", size: [550, 250]}}
                lazyload
                threshold={0.2}
            />
            <AdSlot<"adsense">
                options={{slot: "xxx", format: "auto", responsive: "false", adtest: "on", size: [300, 300]}}
                lazyload={false}
            />
        </AdProvider>
    </React.StrictMode>
);
