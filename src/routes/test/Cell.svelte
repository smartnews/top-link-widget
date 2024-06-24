<script lang="ts">
    import type {
        DataItemRainRadar,
        DataItemWeatherForecast,
        TopLinkAPIResponse
    } from "$lib/types";
    import { stripHtmlTags } from "$lib/utils/StringUtil";

    export let data: TopLinkAPIResponse;
    const weather = data.data.find((x) => x.title == "Weather Forecast") as
        | DataItemWeatherForecast
        | undefined;
    const rainRadar = data.data.find((x) => x.title == "Rain Radar") as
        | DataItemRainRadar
        | undefined;
    // console.log(data);
</script>

{#if weather}
    <a href="/?locationId={weather.content.locationId}" class="root vstack">
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
