<script lang="ts">
    import { format } from "date-fns";
    const date = new Date();
</script>

<a class="root" href="smartnews://openMorningPackage?url=https%3A%2F%2Fmp.smartnews.com%2F">
    <div class="date">{format(date, "M月d日")}</div>
    <div class="youbi">{format(date, "eeee")}</div>
</a>

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
        color: var(--high-emphasis);
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
