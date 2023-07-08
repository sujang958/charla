<script lang="ts">
  import { onMount } from "svelte";
  import { color } from "@/stores/color";

  let shown = false;

  let messageFormat: string;
  let fontSize: string;

  document.addEventListener("keypress", (event) => {
    if (event.key !== "k") return;
    shown = true;
  });

  onMount(() => {
    localStorage.messageFormat ??= "%username%: %message%";
    localStorage.fontSize ??= "1.5";

    messageFormat =
      localStorage.getItem("messageFormat") ?? "%username%: %message%";
    fontSize = localStorage.getItem("fontSize") ?? "1.5";
  });

  $: if (messageFormat) localStorage.setItem("messageFormat", messageFormat);
  $: if (fontSize) localStorage.setItem("fontSize", fontSize);
</script>

{#if shown}
  <div
    class="gird fixed bottom-0 left-0 right-0 top-0 z-50 place-items-center bg-black/10 p-20 backdrop-blur-xl"
  >
    <div
      class="flex h-full w-full flex-col justify-between rounded-lg bg-white px-7 py-5"
    >
      <div class="flex flex-col gap-y-6">
        <label class="flex flex-col gap-y-1 text-sm">
          텍스트 크기
          <input
            type="number"
            bind:value={fontSize}
            class="w-min rounded-lg border-neutral-300 px-2 py-0.5 text-base"
          />
        </label>
        <label class="flex flex-col gap-y-1 text-sm">
          메시지 형식
          <input
            type="text"
            bind:value={messageFormat}
            class="w-min rounded-lg border-neutral-300 px-2 py-0.5 text-base"
          />
        </label>
        <label class="flex flex-col gap-y-1 text-sm">
          배경 색깔
          <input
            type="text"
            bind:value={$color}
            class="w-min rounded-lg border-neutral-300 px-2 py-0.5 text-base"
          />
        </label>
      </div>

      <div class="flex flex-row items-center justify-end gap-x-3">
        <button
          on:click={() => (shown = false)}
          class="rounded-lg border border-neutral-950 px-4 py-1.5 text-sm font-semibold text-black"
          >닫기</button
        >
        <button
          on:click={() => (shown = false)}
          class="rounded-lg border border-neutral-950 bg-neutral-950 px-4 py-1.5 text-sm font-semibold text-white"
          >저장</button
        >
      </div>
    </div>
  </div>
{/if}
