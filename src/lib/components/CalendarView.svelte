<script lang="ts">
    import { base } from "$app/paths";
    import { format } from "date-fns";
    const date = new Date();

    const images = ["railway", "game1", "game2", "baseball"];
</script>

<a class="root" href="smartnews://openMorningPackage?url=https%3A%2F%2Fmp.smartnews.com%2F">
    <div class="date">
        {format(date, "M月d日")}
    </div>
    <!-- <div class="youbi">{format(date, "eeee")}</div> -->
    <div class="ad hstack">
        <div class="icons hstack">
            {#each images as image}
                <div class="image-container">
                    <img src={`${base}/images/${image}.png`} alt="" />
                </div>
            {/each}
        </div>
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
    .date {
        font-weight: 600;
        font-feature-settings: "palt";
    }
    .icons {
        gap: 2px;
    }
    .image-container {
        position: relative;
        display: inline-block;
    }

    .image-container img {
        display: block;
        width: 16px;
        height: 16px;
        border-radius: 22%;
    }

    .image-container::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 0.5px solid rgba(0, 0, 0, 0.38);
        box-sizing: border-box;
        pointer-events: none;
        border-radius: 22%;
    }
    @media (prefers-color-scheme: dark) {
        .image-container::before {
            border-color: rgba(255, 255, 255, 0.38);
        }
    }
</style>
