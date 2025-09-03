import React, {useEffect, useRef, useState} from "react";
import {useAdContext} from "./AdProvider";
import {NetworkConfig} from "./networks";

type AdSlotProps<K extends keyof NetworkConfig> = {
    options: NetworkConfig[K]["slot"];
    lazyload?: boolean;
    threshold?: number;
    placeholder?: React.ReactNode;
    className?: string;
    onLoad?: () => void;
    onError?: () => void;
};

export function AdSlot<K extends keyof NetworkConfig>({
                                                          options,
                                                          lazyload = false,
                                                          threshold = 0.1,
                                                          placeholder,
                                                          className,
                                                          onLoad,
                                                          onError,
                                                      }: AdSlotProps<K>) {
    const {getAdapter, options: providerOptions, dev} = useAdContext<K>();
    const slotRef = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(!lazyload);

    useEffect(() => {
        if (!lazyload || !slotRef.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            {threshold}
        );
        observer.observe(slotRef.current);
        return () => observer.disconnect();
    }, [lazyload, threshold]);

    useEffect(() => {
        if (visible && slotRef.current && !dev) {
            try {
                getAdapter()(slotRef.current, providerOptions, options);
                onLoad?.();
            } catch (e) {
                onError?.();
            }
        }
    }, [visible, getAdapter, providerOptions, options, onLoad, onError, dev]);

    const renderPlaceholder = () => {
        if (!dev) return placeholder;
        const size = (options as any).size || [300, 250];
        const [w, h] = size;
        return (
            <div
                style={{
                    width: w,
                    height: h,
                    background: "#eee",
                    border: "1px dashed #aaa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    color: "#666",
                }}
            >
                Dev Placeholder {w}×{h}
            </div>
        );
    };

    return (
        <div ref={slotRef} className={className} style={{minWidth: "100%"}}>
            {visible ? (dev ? renderPlaceholder() : null) : placeholder}
        </div>
    );
}
