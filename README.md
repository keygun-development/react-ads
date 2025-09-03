# react-ads

A React package for rendering ad slots from multiple networks like **Google AdSense** or custom ad networks. The package focuses on **type safety, lazy loading, and dev-friendly placeholders** for easy testing during development.

---

## Features

- Support for multiple ad networks (currently AdSense + custom networks)
- **Type-safe** configuration per network and ad slot
- Lazy loading of ad slots using **IntersectionObserver**
- Reserve space for ads with the `size` option
- Dev mode renders **dummy placeholders** for testing
- Supports multiple `<AdSlot>`s inside a single `<AdProvider>`

---

## Installation

```bash
npm install react-ads
# or
yarn add react-ads
```

## Basic Usage
```js
import React from "react";
import { AdProvider, AdSlot } from "react-ads";

export default function App() {
  return (
    <AdProvider network="adsense" options={{ client: "ca-pub-xxx" }} dev>
      {/* Lazy-loaded ad slot */}
      <AdSlot<"adsense">
        options={{
          slot: "xxx",
          format: "auto",
          responsive: "true",
          adtest: "on",
          size: [300, 250],
        }}
        lazyload
      />

      {/* Immediately loaded ad slot */}
      <AdSlot<"adsense">
        options={{
          slot: "xxx",
          format: "auto",
          responsive: "false",
          adtest: "on",
          size: [300, 300],
        }}
      />
    </AdProvider>
  );
}
```
## Props

### AdProvider
| Prop       | Type                             | Description                                                                   |
| ---------- | -------------------------------- | ----------------------------------------------------------------------------- |
| `network`  | `"adsense"` \| `"custom"`        | The network for all ad slots inside this provider                             |
| `options`  | Provider-specific options        | Required network configuration (`client` for AdSense, `scriptUrl` for custom) |
| `adapter`  | Optional custom network function | Allows injecting a custom ad loader                                           |
| `dev`      | `boolean`                        | Show placeholder ads for development/testing                                  |
| `children` | `ReactNode`                      | Ad slots or other React elements                                              |

### AdSlot
| Prop          | Type                  | Description                                                                       |
| ------------- | --------------------- | --------------------------------------------------------------------------------- |
| `options`     | Slot-specific options | Configuration for the individual ad slot (`slot`, `size`, `format`, `responsive`) |
| `lazyload`    | `boolean`             | If `true`, the ad will only load when visible                                     |
| `threshold`   | `number`              | IntersectionObserver threshold (0-1)                                              |
| `placeholder` | `ReactNode`           | Optional placeholder before ad loads                                              |
| `className`   | `string`              | Optional CSS class for the container                                              |
| `onLoad`      | `() => void`          | Callback when ad is loaded                                                        |
| `onError`     | `() => void`          | Callback on load error                                                            |

## Dev Mode
Set `dev={true}` on the `AdProvider` to render **dummy placeholders** for ad slots. This is especially useful on localhost where real ads cannot be served.

```js
<AdProvider network="adsense" options={{ client: "ca-pub-8005043805782208" }} dev>
  <AdSlot<"adsense">
    options={{ slot: "1234567890", size: [300, 250] }}
  />
</AdProvider>
```

## Adding More Networks
You can extend the package with new networks:

1. Add a network adapter in networks.ts:

```js
export const networks: { [K in keyof NetworkConfig]: AdNetwork<K> } = {
    adsense,
    custom,
    myCustomNetwork: (container, providerOptions, slotOptions) => {
        // Load ads using your network's script or API
    }
};
```

2. Update NetworkConfig with the new provider and slot types.

## Future Enhancements
- Automatic ad refresh interval per slot 
- More pre-configured networks (e.g., Media.net, PropellerAds)
- Server-side rendering support 
- Analytics hooks for impressions and clicks