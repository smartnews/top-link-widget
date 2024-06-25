import SNClientBridge from "@smartnews/sn-client-bridge";
import type { LocationInfo } from "./types";


export namespace BridgeService {
    async function getUserLatLng(): Promise<{ latitude: number; longitude: number; }> {
        const res = await SNClientBridge.postMessage('getLocation');
        return res.result;
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
            latitude: latlng.latitude,
            longitude: latlng.longitude,
            locationId: locationId
        };
    }

}

