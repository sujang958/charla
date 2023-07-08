<script lang="ts">
  import tmi from "tmi.js"
  import Preferences from "./lib/Preferences.svelte"
  import { color } from "./stores/color"
  import { channel } from "./stores/channel"

  const client = new tmi.Client({
    options: { debug: true },
    identity: {
      username: "justinfan6969",
    },
    channels: [$channel],
  })

  let messages: { message: string; size: number }[] = []
  let messageContainer: HTMLDivElement

  client.connect().catch(console.error)

  client.on("message", (_, tags, message, __) => {
    const formattedMessage = (
      localStorage.getItem("messageFormat") ?? "%username%: %message%"
    )
      .replace("%username%", tags.username)
      .replace("%message%", message)

    console.log(formattedMessage)

    messages = [
      ...(messages.length > 100 ? [] : messages),
      {
        message: formattedMessage,
        size: Number(localStorage.getItem("fontSize") ?? "1.5"),
      },
    ]
    messageContainer.scrollTo(0, document.body.scrollHeight)
  })
</script>

<main
  class={`relative min-h-screen w-full text-white`}
  style={`background-color: ${$color};`}
>
  <div class="fixed bottom-4 right-4">
    <svg
      data-tauri-drag-region
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      class="h-5 w-5 cursor-pointer fill-black/5 transition duration-200 hover:fill-neutral-900/100"
    >
      <path
        data-tauri-drag-region
        fill-rule="evenodd"
        d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8 1a1 1 0 100-2 1 1 0 000 2zm-3-1a1 1 0 11-2 0 1 1 0 012 0zm7 1a1 1 0 100-2 1 1 0 000 2z"
        clip-rule="evenodd"
      />
    </svg>
  </div>
  <div class="flex w-full flex-col gap-y-0.5 p-2" bind:this={messageContainer}>
    {#if messages.length < 1}
      {$channel}에 연결됨
    {/if}
    {#each messages as { message, size }}
      <p class={`text-[${size}rem] font-bold`}>{message}</p>
    {/each}
  </div>
</main>

<Preferences />
