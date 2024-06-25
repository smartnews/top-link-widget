import { fetchTopLinksByLocation, fetchTopLinksByLocationId, getLocationIdFromLatLng } from '$lib/Service';
import type { Location, PlaceData } from '$lib/types';
import { compact, concurrent, map, pipe, toArray, toAsync } from "@fxts/core";
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ params }) => {


    const places: Location[] = [
        // 稚内市
        { latidule: 45.415784, longitude: 141.673462 },
        // 札幌市
        { latidule: 43.062095, longitude: 141.354376 },
        // 渋谷区
        { latidule: 35.66841112719756, longitude: 139.70528087931888 },
        // 伊勢市
        { latidule: 34.486032, longitude: 136.709579 },
        // 長崎市
        { latidule: 32.750286, longitude: 129.877667 },
        // 那覇市
        { latidule: 26.212401, longitude: 127.679207 },
    ]

    const data: PlaceData[] = await pipe(places,
        toAsync,
        concurrent(100),
        map(async x => {
            const locationId = await getLocationIdFromLatLng(x.latidule, x.longitude);
            if (!locationId) return undefined;
            return { latidule: x.latidule, longitude: x.longitude, locationId }
        }),
        compact,
        map(async x => {
            const res = await fetchTopLinksByLocation(x)
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