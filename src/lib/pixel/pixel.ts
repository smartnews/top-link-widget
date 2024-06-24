import { dev } from "$app/environment";

import { SmartNewsPixel, buildSmartNewsApp, buildSmartNewsUser, buildSmartNewsLinkContext } from "@smartnews/pixel";
import SNClientBridge from "@smartnews/sn-client-bridge";

const APP = {
  version: "1.0.0",
  environment: "production"
};

const pixel = createSmartNewsPixel();
const initializingPromise = retrieveSmartNewsAppInfo(pixel);

function createSmartNewsPixel() {
  if (dev) return;
  if (typeof window == "undefined") return null;

  const pixel = new SmartNewsPixel("0c190be2-a604-4389-8239-bed005bd8fd8", { environment: "production" });

  pixel.app = APP;

  return pixel;
}

async function retrieveSmartNewsAppInfo(pixel: any) {
  if (dev) return;
  if (typeof window == "undefined") return;

  try {
    if (SNClientBridge.hasBridgeInterface()) {
      const { result: appInfo } = await SNClientBridge.postMessage("getAppInfo");
      const { result: contextInfo } = await SNClientBridge.postMessage("getContextInfo");
      pixel.app = {
        ...APP,
        ...buildSmartNewsApp(appInfo)
      };
      pixel.user = buildSmartNewsUser(appInfo);
      pixel.context = buildSmartNewsLinkContext(contextInfo);
    }
  } catch (e) {
    // ignore errors
    console.error(e);
  }
}

export function getSmartNewsPixel() {
  return pixel;
}

export async function getSmartNewsPixelInitialized() {
  await initializingPromise;
  return pixel;
}
