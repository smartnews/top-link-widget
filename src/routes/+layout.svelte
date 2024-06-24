<script lang="ts">
    import { setDefaultOptions } from "date-fns";
    import "../app.css";
    import { ja } from "date-fns/locale";

    setDefaultOptions({ locale: ja });
</script>

<slot />
