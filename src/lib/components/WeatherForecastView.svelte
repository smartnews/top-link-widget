<script lang="ts">
    import type { DataItemWeatherForecast, Weather } from "$lib/types";
    import TempertureView from "./TempertureView.svelte";

    export let data: DataItemWeatherForecast | undefined;
    $: forecast = data?.content.optimalDailyWeatherForecast;

    $: icon = getIcon(forecast?.weather);
    $: secondaryIcon = getIcon(forecast?.secondaryWeather);

    function getIcon(name?: Weather) {
        return name?.toLowerCase();
    }
</script>

<a href={data?.url} class="root">
    {#if forecast}
        {#if secondaryIcon}
            <div class="doubleIcon hstack">
                <img class="icon first" src="./images/weather/{icon}.svg" alt="" />
                <img class="icon second" src="./images/weather/{secondaryIcon}.svg" alt="" />
            </div>
        {:else}
            <img class="icon single" src="./images/weather/{icon}.svg" alt="" />
        {/if}

        <div class="tempertures vstack">
            <TempertureView
                label="最高"
                color="orange"
                temperature={forecast.maxTemperature}
                diff={forecast.maxTemperatureDiff}
            />
            <TempertureView
                label="最低"
                color="blue"
                temperature={forecast.minTemperature}
                diff={forecast.minTemperatureDiff}
            />
        </div>
    {:else}
        <div>データなし</div>
    {/if}
</a>

<style>
    .root {
        flex-shrink: 0;
        line-height: 1;
        padding: 0 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
    }
    .icon {
        object-fit: contain;
    }
    .doubleIcon > img {
        width: 24px;
        height: 24px;
    }
    .single {
        width: 36px;
        height: 36px;
    }
    .first {
        transform: translateY(-6px);
    }
    .second {
        transform: translateY(6px);
    }
    .tempertures {
        gap: 4px;
    }
</style>
