<script lang="ts">
    import SNClientBridge from "@smartnews/sn-client-bridge";

    function onSettingButtonTap() {
        SNClientBridge.postMessage("selectLocationId");
    }
</script>

<div class="root hstack">
    <img class="icon" src="./images/weather/clear.svg" alt="" />
    <div class="message">天気と雨雲レーダーの位置を設定しましょう</div>
    <button data-pixel-click data-pixel-id="location_setting" on:click={onSettingButtonTap}
        >位置を設定</button
    >
</div>

<style>
    .root {
        padding: 8px;
        gap: 8px;
    }
    .icon {
        width: 32px;
        height: 32px;
    }
    .message {
        font-size: 13px;
        color: var(--mid-emphasis);
        line-height: 1.3;
    }
    button {
        border: none;
        background-color: var(--key-color);
        border-radius: 4px;
        flex-shrink: 0;
        color: white;
        font-size: 13px;
        font-weight: bold;
        padding: 8px;
        line-height: 1;
    }
    button:active {
        opacity: 0.5;
    }
</style>
