import { dev } from "$app/environment";
import { getSmartNewsPixel, getSmartNewsPixelInitialized } from "./pixel";

export function generateTrackingCookies() {
    try {
        const pixel = getSmartNewsPixel();
        if (!pixel) return;
        return {
            lifecycleId: pixel.lifecycleId,
            sessionId: pixel.sessionId
        };
    } catch (e) {
        // ignore errors
        console.error(e);
        return {};
    }
}

export function trackPageView() {
    if (dev) return;
    getSmartNewsPixelInitialized()
        .then(pixel => pixel && pixel.trackPageView())
        .catch(e => console.error(e));
}

type PixelEventName = "click" | "impression" | "visibility" | "pageView" | "activity" | "error" | "conversion" | "performance"
export type PixelEventParam = { [key: string]: unknown } & { id: string }

export function logEvent(name: string, data: PixelEventParam) {
    // window.gtag("event", name, data)
    getSmartNewsPixelInitialized()
        .then(pixel => pixel && pixel.track(name as PixelEventName, data))
        .catch(e => console.error(e));
}
