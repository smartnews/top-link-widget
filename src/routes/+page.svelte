<script lang="ts">
    import { page } from "$app/stores";
    import { fetchTopLinksData } from "$lib/Service";
    import CalendarView from "$lib/components/CalendarView.svelte";
    import NoLocationView from "$lib/components/NoLocationView.svelte";
    import RainRadarView from "$lib/components/RainRadarView.svelte";
    import WeatherForecastView from "$lib/components/WeatherForecastView.svelte";
    import type {
        DataItemRainRadar,
        DataItemWeatherForecast,
        TopLinkAPIResponse
    } from "$lib/types";
    import { onMount } from "svelte";

    let response: TopLinkAPIResponse | undefined;
    let forecastData: DataItemWeatherForecast;
    let rainRadarData: DataItemRainRadar;
    let loading = true;

    onMount(async () => {
        response = await fetchTopLinksData($page.url.searchParams);
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
    });
</script>

<div class="root" data-pixel-impression data-pixel-id="widget">
    <CalendarView />
    <div class="border" />
    {#if loading}
        <div class="loading">読み込み中...</div>
    {:else if response}
        <WeatherForecastView data={forecastData} />
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
