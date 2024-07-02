import SNClientBridge from "@smartnews/sn-client-bridge";
import type { LocationInfo, LatLng } from "./types";


export namespace BridgeService {
    export async function getUserLatLng(): Promise<LatLng | undefined> {
        try {
            const res = await SNClientBridge.postMessage('getLocation');
            return res.result;
        } catch (e) {
            return undefined
        }

    }
    export async function getUserLocationId(): Promise<number | undefined> {
        const res = await SNClientBridge.postMessage("getLocationId");
        if (res.result.locationId) {
            return res.result.locationId;
        }
    }
    export async function getUserLocationInfo(): Promise<LocationInfo> {
        const latlng = await getUserLatLng();
        const locationId = await getUserLocationId();
        return {
            latitude: latlng?.latitude,
            longitude: latlng?.longitude,
            locationId: locationId
        };
    }

}

