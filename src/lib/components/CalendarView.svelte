<script lang="ts">
    import { format } from "date-fns";
    const date = new Date();
</script>

<div class="root">
    <div class="date">{format(date, "M月d日")}</div>
    <div class="youbi">{format(date, "eeee")}</div>
</div>

<style>
    .root {
        flex-shrink: 0;
        padding: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
        line-height: 1;
    }
    .date {
        font-weight: 600;
        font-feature-settings: "palt";
    }
    .youbi {
        font-size: 11px;
        color: var(--low-emphasis);
    }
</style>
