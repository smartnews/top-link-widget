<script lang="ts">
    export let data: any;
</script>

<div class="root">
    {JSON.stringify(data, null, 4)}
</div>

<style>
    .root {
        flex-shrink: 0;
        padding: 8px;
        width: 200px;
        line-height: 1;
        font-size: 11px;
        white-space: wrap;
        overflow-y: scroll;
    }
</style>
