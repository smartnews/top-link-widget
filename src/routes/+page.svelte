<script lang="ts">
    import { page } from "$app/stores";
    import CalendarView from "$lib/components/CalendarView.svelte";
    import RainRadarView from "$lib/components/RainRadarView.svelte";
    import WeatherForecastView from "$lib/components/WeatherForecastView.svelte";
    import type {
        DataItemRainRadar,
        DataItemWeatherForecast,
        TopLinkAPIResponse
    } from "$lib/types";
    import { onMount } from "svelte";

    let response: TopLinkAPIResponse;
    let forecastData: DataItemWeatherForecast;
    let rainRadarData: DataItemRainRadar;

    onMount(async () => {
        console.log($page);
        const locationId = $page.url.searchParams.get("locationId") ?? "129428";
        const res = await fetch(
            `https://dev.smartnews.be/api/habits/v1/top_widget/links?locationId=${locationId}`
        );
        response = await res.json();
        forecastData = response.data.find(
            (x) => x.title == "Weather Forecast"
        ) as DataItemWeatherForecast;
        rainRadarData = response.data.find((x) => x.title == "Rain Radar") as DataItemRainRadar;
    });
</script>

{#if response}
    <div class="root">
        <CalendarView date={new Date()} />
        <div class="border" />
        <WeatherForecastView data={forecastData} />
        <div class="border" />
        <RainRadarView data={rainRadarData} />
    </div>
{:else}
    <div>Loading...</div>
{/if}

<style>
    .root {
        display: flex;
        height: 48px;
    }
    .border {
        width: 0.5px;
        height: 100%;
        background-color: var(--separator);
    }
</style>
