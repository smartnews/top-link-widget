<script lang="ts">
    import { setDefaultOptions } from "date-fns";
    import { ja } from "date-fns/locale";
    import "../app.css";
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { getSmartNewsPixel } from "$lib/pixel/pixel";

    setDefaultOptions({ locale: ja });

    onMount(() => {
        if (dev == false) {
            const pixel = getSmartNewsPixel();
            pixel?.observe(document.body);
        }
    });
</script>

<slot />
