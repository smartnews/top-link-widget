
import type { LocationInfo, PlaceData } from '$lib/types';
import { compact, concurrent, map, pipe, toArray, toAsync } from "@fxts/core";
import type { PageServerLoad } from './$types';
import { APIService } from '$lib/APIService';


export const load: PageServerLoad = async ({ params }) => {


    const places: LocationInfo[] = [
        // 稚内市
        { latitude: 45.415784, longitude: 141.673462 },
        // 札幌市
        { latitude: 43.062095, longitude: 141.354376 },
        // 渋谷区
        { latitude: 35.66841112719756, longitude: 139.70528087931888 },
        // 伊勢市
        { latitude: 34.486032, longitude: 136.709579 },
        // 長崎市
        { latitude: 32.750286, longitude: 129.877667 },
        // 那覇市
        { latitude: 26.212401, longitude: 127.679207 },
    ]

    const data: PlaceData[] = await pipe(places,
        toAsync,
        concurrent(100),
        map(async x => {
            const locationId = await APIService.getLocationIdFromLatLng(x.latitude, x.longitude);
            if (!locationId) return undefined;
            const out: LocationInfo = { latitude: x.latitude, longitude: x.longitude, locationId }
            return out;
        }),
        compact,
        map(async x => {
            const res = await APIService.fetchTopLinksByLocationInfo(x)
            if (!res) return undefined;
            return { location: x, response: res }
        }),
        compact,
        toArray,
    )

    return {
        data
    };
};