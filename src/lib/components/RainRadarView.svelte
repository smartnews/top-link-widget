<script lang="ts">
    import type { DataItemRainRadar } from "$lib/types";

    export let data: DataItemRainRadar;
    console.log(data);
    $: icon = getIcon(data.content.locationForecast.message.status);

    function getIcon(_status?: string) {
        switch (_status) {
            case "NONE":
                return "norain";
            default:
                return "norain";
        }
    }
</script>

{#if data}
    <div class="root hstack">
        <img src="./images/rainRadar/{icon}.svg" alt="" />
        <div class="message">{data.content.locationForecast.message.text}</div>
    </div>
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
