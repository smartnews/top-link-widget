import SNClientBridge from "@smartnews/sn-client-bridge";
import { BridgeService } from "./BridgeService";
import type { LocationInfo } from "./types";

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