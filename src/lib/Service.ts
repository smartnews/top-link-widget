import SNClientBridge from "@smartnews/sn-client-bridge";
import { BridgeService } from "./BridgeService";
import type { LatLng, LocationInfo } from "./types";


export async function getUserLocationInfo(searchParams: URLSearchParams): Promise<LocationInfo> {
    if (SNClientBridge.hasBridgeInterface()) {
        return BridgeService.getUserLocationInfo();
    } else {
        return {
            latitude: Number(searchParams.get("latitude")),
            longitude: Number(searchParams.get("longitude")),
            locationId: Number(searchParams.get("locationId")),
        }
    }
}
export async function getUserLocationId(searchParams: URLSearchParams): Promise<number | undefined> {
    if (SNClientBridge.hasBridgeInterface()) {
        return BridgeService.getUserLocationId();
    } else {
        return Number(searchParams.get("locationId"))
    }
}
