<script lang="ts">
    import { page } from "$app/stores";
    import { APIService } from "$lib/APIService";
    import { getUserLocationId, getUserLocationInfo } from "$lib/Service";
    import CalendarView from "$lib/components/CalendarView.svelte";
    import DebugView from "$lib/components/DebugView.svelte";
    import NoLocationView from "$lib/components/NoLocationView.svelte";
    import RainRadarView from "$lib/components/RainRadarView.svelte";
    import WeatherForecastView from "$lib/components/WeatherForecastView.svelte";
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
    let prevLocationId: number | undefined;

    // locationId をポーリング
    onMount(() => {
        const id = setInterval(checkLocation, 1000);
        return () => {
            clearInterval(id);
        };
    });

    onMount(() => {
        refresh();
    });

    async function checkLocation() {
        const locationId = await getUserLocationId($page.url.searchParams);
        if (locationId != prevLocationId) {
            console.log("locationIdに変更がありました");
            refresh();
        }
        prevLocationId = locationId;
    }

    async function refresh() {
        // 「読み込み中」がチラつくので、2度目以降は loading を true にしない
        locationInfo = await getUserLocationInfo($page.url.searchParams);
        response = await APIService.fetchTopLinksByLocationInfo(locationInfo);
        console.log(response);
        if (!response) {
            loading = false;
            return;
        }
        // console.log(response);
        forecastData = response.data.find(
            (x) => x.title == "Weather Forecast"
        ) as DataItemWeatherForecast;
        rainRadarData = response.data.find((x) => x.title == "Rain Radar") as DataItemRainRadar;
        loading = false;
    }
</script>

<div class="root" data-pixel-impression data-pixel-id="widget">
    <!-- <DebugView data={locationInfo} /> -->
    <CalendarView />
    <div class="border" />
    {#if loading}
        <div class="loading">読み込み中...</div>
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
