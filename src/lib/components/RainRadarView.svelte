<script lang="ts">
    import type { DataItemRainRadar, RRLocationForecastNode } from "$lib/types";
    import { stripHtmlTags } from "$lib/utils/StringUtil";

    export let data: DataItemRainRadar;
    console.log(data);
    $: currentInfo = data.content.locationForecast.forecasts.find((x) => {
        return x.timestamp == data.content.currentEpochSecond;
    });
    // console.log(currentInfo);
    $: icon = getIcon(currentInfo);

    function getIcon(_currentInfo?: RRLocationForecastNode) {
        if (!_currentInfo) {
            return "norain";
        }
        if (_currentInfo.weather == "NONE") {
            return "norain";
        }
        return `rain_${_currentInfo.strength.toLowerCase()}`;
    }
</script>

{#if data}
    <a href={data.url} class="root hstack">
        {#if icon}
            <img src="./images/rainRadar/{icon}.svg" alt="" />
        {:else}
            <div>{data.content.locationForecast.message.status}</div>
        {/if}
        <div class="message">{stripHtmlTags(data.content.locationForecast.message.text)}</div>
    </a>
{:else}
    <div>no data</div>
{/if}

<style>
    .root {
        width: 100%;
        padding: 8px;
        align-items: center;
        justify-content: center;
        gap: 4px;
        line-height: 1;
    }
    .message {
        font-size: 13px;
        font-feature-settings: "palt";
        color: var(--mid-emphasis);
        line-height: 1.3;
    }
</style>
