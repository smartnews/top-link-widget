<script lang="ts">
    import { page } from "$app/stores";
    import { APIService } from "$lib/APIService";
    import { getUserLocationInfo } from "$lib/Service";
    import CalendarView from "$lib/components/CalendarView.svelte";
    import NoLocationView from "$lib/components/NoLocationView.svelte";
    import RainRadarView from "$lib/components/RainRadarView.svelte";
    import WeatherForecastView from "$lib/components/WeatherForecastView.svelte";
    import { logEvent } from "$lib/pixel/logging";
    import type {
        DataItemRainRadar,
        DataItemWeatherForecast,
        LocationInfo,
        TopLinkAPIResponse
    } from "$lib/types";
    import { onMount } from "svelte";

    let locationInfo: LocationInfo;
    let response: TopLinkAPIResponse | undefined;
    let forecastData: DataItemWeatherForecast;
    let rainRadarData: DataItemRainRadar;
    let loading = true;
    let status = "初期化中...";

    onMount(() => {
        refresh();
    });

    // SmartNews上で、画面が表示された時の処理
    onMount(() => {
        document.addEventListener("visibilitychange", onVisibilityChange);
        return () => document.removeEventListener("visibilitychange", onVisibilityChange);
    });
    async function onVisibilityChange() {
        if (document.hidden) return;

        refresh();
    }

    async function refresh() {
        logEvent("refreshStart", { id: "dummy" });
        // 「読み込み中」がチラつくので、2度目以降は loading を true にしない
        status = "現在地を取得中...";
        logEvent("getUserLocationInfoStart", { id: "dummy" });
        locationInfo = await getUserLocationInfo($page.url.searchParams);
        logEvent("getUserLocationInfoComplete", { id: "dummy" });
        status = "天気情報を取得中...";
        logEvent("fetchTopLinksByLocationInfoStart", { id: "dummy" });
        response = await APIService.fetchTopLinksByLocationInfo(locationInfo);
        logEvent("fetchTopLinksByLocationInfoComplete", { id: "dummy" });
        console.log(response);
        if (!response) {
            loading = false;
            return;
        }
        // console.log(response);
        logEvent("parseResponseStart", { id: "dummy" });
        status = "天気情報をパース中...";
        forecastData = response.data.find(
            (x) => x.title == "Weather Forecast"
        ) as DataItemWeatherForecast;
        rainRadarData = response.data.find((x) => x.title == "Rain Radar") as DataItemRainRadar;
        logEvent("parseResponseComplete", { id: "dummy" });
        loading = false;
        logEvent("refreshComplete", { id: "dummy" });
    }
</script>

<div class="root" data-pixel-impression data-pixel-id="widget">
    <!-- <DebugView data={locationInfo} /> -->
    <CalendarView />
    <div class="border" />
    {#if loading}
        <div class="loading">{status}</div>
    {:else if response}
        <WeatherForecastView data={forecastData} showCityNameForDebug={false} />
        <div class="border" />
        <RainRadarView data={rainRadarData} />
    {:else}
        <NoLocationView />
    {/if}
</div>

<style>
    .root {
        display: flex;
        height: 48px;
        max-width: 480px;
        overflow: hidden;
    }
    .border {
        flex-shrink: 0;
        width: 0.5px;
        height: 100%;
        background-color: var(--separator);
    }
    .loading {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--low-emphasis);
        font-size: 13px;
    }
</style>
