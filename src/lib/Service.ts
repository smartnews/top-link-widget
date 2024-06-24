import type { DataItemWeatherForecast, TopLinkAPIResponse } from "./types";

export async function fetchTopLinksData(searchParams: URLSearchParams) {
    if (searchParams.size == 0) {
        return undefined;
    }
    const res = await fetch(`https://dev.smartnews.be/api/habits/v1/top_widget/links?${searchParams.toString()}`)
    const data: TopLinkAPIResponse = await res.json();
    return data;
}

export async function fetchTopLinksByLocationId(locationId?: string) {
    if (!locationId) return undefined;
    const res = await fetch(`https://dev.smartnews.be/api/habits/v1/top_widget/links?locationId=${locationId}`)
    const data: TopLinkAPIResponse = await res.json();
    return data;
}


export async function fetchTopLinksByLocation(lat: number, lng: number) {
    const res = await fetch(`https://dev.smartnews.be/api/habits/v1/top_widget/links?latitude=${lat}&longitude=${lng}`)
    const data: TopLinkAPIResponse = await res.json();
    return data;
}

/**
 * 緯度経度からlocationIdを取得
 */
export async function getLocationIdFromLatLng(lat: number, lng: number) {
    const res = await fetchTopLinksByLocation(lat, lng);
    const weather = res.data.find(x => x.title == "Weather Forecast") as DataItemWeatherForecast;
    if (!weather) {
        return undefined;
    }
    return weather.content.locationId;
}