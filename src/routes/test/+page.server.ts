import { fetchTopLinksByLocationId, getLocationIdFromLatLng } from '$lib/Service';
import type { PageServerLoad } from './$types';
import { compact, concurrent, map, pipe, toArray, toAsync } from "@fxts/core"

type Place = {
    latidule: number;
    longitude: number;
}

export const load: PageServerLoad = async ({ params }) => {


    const places: Place[] = [
        // 渋谷区
        { latidule: 35.66841112719756, longitude: 139.70528087931888 },
        // 長崎市
        { latidule: 32.750286, longitude: 129.877667 },
        // 札幌市
        { latidule: 43.062095, longitude: 141.354376 },
        // 稚内市
        { latidule: 45.415784, longitude: 141.673462 },
        // 那覇市
        { latidule: 26.212401, longitude: 127.679207 },
    ]

    // let locationIds = await Promise.all(places.map(x => {
    //     return getLocationIdFromLatLng(x.latidule, x.longitude);
    // }));



    // const data = await Promise.all(locationIds.map(x => {
    //     return fetchTopLinksByLocationId(x)
    // }))

    const data = await pipe(places,
        toAsync,
        concurrent(100),
        map(x => getLocationIdFromLatLng(x.latidule, x.longitude)),
        compact,
        map(fetchTopLinksByLocationId),
        compact,
        toArray,
    )

    return {
        data
    };
};