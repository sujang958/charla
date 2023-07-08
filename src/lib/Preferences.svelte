<script lang="ts">
  import { onMount } from "svelte"
    import { color } from "@/stores/color"

  let shown = false

  let messageFormat: string
  let fontSize: string

  document.addEventListener("keypress", (event) => {
    if (event.key !== "k") return
    shown = true
  })

  onMount(() => {
    localStorage.messageFormat ??= "%username%: %message%"
    localStorage.fontSize ??= "1.5"

    messageFormat =
      localStorage.getItem("messageFormat") ?? "%username%: %message%"
    fontSize = localStorage.getItem("fontSize") ?? "1.5"
  })

  $: if (messageFormat) localStorage.setItem("messageFormat", messageFormat)
  $: if (fontSize) localStorage.setItem("fontSize", fontSize)
</script>

{#if shown}
  <div
    class="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black/10 backdrop-blur-xl gird place-items-center p-20"
  >
    <div
      class="bg-white rounded-lg w-full h-full py-5 px-7 flex flex-col justify-between"
    >
      <div class="flex flex-col gap-y-6">
        <label class="flex flex-col text-sm gap-y-1">
          텍스트 크기
          <input
            type="number"
            bind:value={fontSize}
            class="text-base rounded-lg w-min border-neutral-300 py-0.5 px-2"
          />
        </label>
        <label class="flex flex-col text-sm gap-y-1">
          메시지 형식
          <input
            type="text"
            bind:value={messageFormat}
            class="text-base rounded-lg w-min border-neutral-300 py-0.5 px-2"
          />
        </label>
        <label class="flex flex-col text-sm gap-y-1">
          배경 색깔
          <input
            type="text"
            bind:value={$color}
            class="text-base rounded-lg w-min border-neutral-300 py-0.5 px-2"
          />
        </label>
      </div>

      <div class="flex flex-row items-center justify-end gap-x-3">
        <button
        on:click={() => (shown = false)}
          class="border border-neutral-950 text-sm text-black font-semibold rounded-lg px-4 py-1.5"
          >닫기</button
        >
        <button
        on:click={() => (shown = false)}
          class="border border-neutral-950 bg-neutral-950 text-sm text-white font-semibold rounded-lg px-4 py-1.5"
          >저장</button
        >
      </div>
    </div>
  </div>
{/if}
