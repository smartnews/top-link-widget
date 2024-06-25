<script lang="ts">
    import type { PageData } from "./$types";
    import Cell from "./Cell.svelte";

    export let data: PageData;
</script>

<div class="root vstack">
    {#each data.data as res}
        <Cell placeData={res} />
    {/each}
</div>

<style>
    .root {
        padding: 16px;
        gap: 8px;
    }
</style>
