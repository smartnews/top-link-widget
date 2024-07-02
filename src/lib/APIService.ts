import type { DataItemWeatherForecast, LocationInfo, TopLinkAPIResponse } from "./types";

export namespace APIService {
    export async function fetchTopLinksData(searchParams: URLSearchParams) {
        if (searchParams.size == 0) {
            return undefined;
        }
        const res = await fetch(`https://www.smartnews.be/api/habits/v1/top_widget/links?${searchParams.toString()}`)
        const data: TopLinkAPIResponse = await res.json();
        return data;
    }

    /**
     * API は locationId と緯度経度を同時に渡すと緯度経度が優先される仕様。
     * なのでユーザーが意図的に locationId を指定したときは、それだけを渡して情報を得る
     */
    export async function fetchTopLinksByLocationInfo(location: LocationInfo) {
        if (location.locationId) {
            return fetchTopLinksByLocationId(location.locationId);
        } else if (location.latitude && location.longitude) {
            return fetchTopLinksByLatLng(location.latitude, location.longitude);
        }
    }

    export async function fetchTopLinksByLocationId(locationId?: number) {
        if (!locationId) return undefined;
        const res = await fetch(`https://www.smartnews.be/api/habits/v1/top_widget/links?locationId=${locationId}`)
        const data: TopLinkAPIResponse = await res.json();
        return data;
    }


    export async function fetchTopLinksByLatLng(lat: number, lng: number) {
        const res = await fetch(`https://www.smartnews.be/api/habits/v1/top_widget/links?latitude=${lat}&longitude=${lng}`)
        const data: TopLinkAPIResponse = await res.json();
        return data;
    }

    /**
     * 緯度経度からlocationIdを取得
     */
    export async function getLocationIdFromLatLng(lat: number, lng: number): Promise<number | undefined> {
        const res = await fetchTopLinksByLatLng(lat, lng);
        const weather = res.data.find(x => x.title == "Weather Forecast") as DataItemWeatherForecast;
        if (!weather) {
            return undefined;
        }
        return Number(weather.content.locationId);
    }

}



