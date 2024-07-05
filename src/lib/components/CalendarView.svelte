<script lang="ts">
    import { base } from "$app/paths";
    import { format } from "date-fns";
    const date = new Date();
</script>

<a class="root" href="smartnews://openMorningPackage?url=https%3A%2F%2Fmp.smartnews.com%2F">
    <div class="date">
        {format(date, "M月d日")}
    </div>
    <!-- <div class="youbi">{format(date, "eeee")}</div> -->
    <div class="ad hstack">
        <div>ミニゲーム</div>
        <img class="chevron" src="{base}/images/chevron.svg" alt="" />
    </div>
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
    .ad {
        font-weight: bold;
        font-size: 11px;
        color: var(--key-color);
        font-feature-settings: "palt";
    }
    .chevron {
        height: 11px;
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
