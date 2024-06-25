<script lang="ts">
    import type { DataItemRainRadar, DataItemWeatherForecast, PlaceData } from "$lib/types";
    import { stripHtmlTags } from "$lib/utils/StringUtil";

    export let placeData: PlaceData;
    const weather = placeData.response.data.find((x) => x.title == "Weather Forecast") as
        | DataItemWeatherForecast
        | undefined;
    const rainRadar = placeData.response.data.find((x) => x.title == "Rain Radar") as
        | DataItemRainRadar
        | undefined;
    // console.log(data);
</script>

{#if weather}
    <a
        href="./?locationId={weather.content.locationId}&latitude={placeData.location
            .latitude}&longitude={placeData.location.longitude}"
        class="root vstack"
    >
        <div class="header hstack">
            <div class="name">{weather.content.locationName}</div>
            <div>{weather.content.optimalDailyWeatherForecast.name}</div>
        </div>
        {#if rainRadar}
            <div class="radar">
                {stripHtmlTags(rainRadar.content.locationForecast.message.text)}
            </div>
        {/if}
    </a>
{/if}

<style>
    .root {
        color: var(--high-emphasis);
    }
    .header {
        gap: 8px;
    }
    .name {
        gap: 8px;
        font-weight: bold;
    }
    .radar {
        font-size: 11px;
        color: var(--low-emphasis);
    }
</style>
