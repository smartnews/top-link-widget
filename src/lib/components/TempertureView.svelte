<script lang="ts">
    export let label: string;
    export let temperature: number;
    export let diff: number;
    export let color: "orange" | "blue";
</script>

<div class="root hstack" style:color="var(--tab-{color})">
    <div class="label">{label}</div>
    <div class="temperature">{temperature}°</div>
    {#if diff > 0}
        <div class="diff">(+{diff})</div>
    {:else}
        <div class="diff">({diff})</div>
    {/if}
</div>

<style>
    .root {
        gap: 4px;
        align-items: center;
    }
    .temperature {
        font-weight: 600;
        font-size: 15px;
    }
    .label {
        color: var(--low-emphasis);
        font-size: 11px;
    }
    .diff {
        font-size: 13px;
    }
</style>
