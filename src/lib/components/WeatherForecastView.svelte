<script lang="ts">
    import type { DataItemWeatherForecast } from "$lib/types";
    import TempertureView from "./TempertureView.svelte";

    export let data: DataItemWeatherForecast | undefined;
    $: forecast = data?.content.optimalDailyWeatherForecast;
    $: icon = getIcon(forecast?.name);

    function getIcon(name?: string) {
        switch (name) {
            case "曇り":
                return "cloudy";
            default:
                return undefined;
        }
    }
</script>

{#if forecast}
    <div class="root">
        {#if icon}
            <img class="icon" src="./images/weather/{icon}.svg" alt={forecast.name} />
        {:else}
            <div>{forecast.name}</div>
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
    </div>
{:else}
    <div>データなし</div>
{/if}

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
        width: 36px;
        height: 36px;
        object-fit: contain;
    }
    .tempertures {
        gap: 4px;
    }
</style>
