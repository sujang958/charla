<script lang="ts">
  import tmi from "tmi.js"
  import Preferences from "./lib/Preferences.svelte"
  import {color} from "./stores/color"
  

  const client = new tmi.Client({
    options: { debug: true },
    identity: {
      username: "justinfan6969",
    },
    channels: ["omom1972"],
  })

  let messages: { message: string; size: number }[] = []

  client.connect().catch(console.error)

  client.on("message", (_, tags, message, __) => {
    const formattedMessage = (
      localStorage.getItem("messageFormat") ?? "%username%: %message%"
    )
      .replace("%username%", tags.username)
      .replace("%message%", message)

    console.log(formattedMessage)

    messages = [
      ...messages,
      {
        message: formattedMessage,
        size: Number(localStorage.getItem("fontSize") ?? "1.5"),
      },
    ]
  })
</script>

<main class={`w-full h-screen text-white relative`} style={`background-color: ${$color};`}>
  <div class="fixed bottom-4 right-4">
    <svg
      data-tauri-drag-region
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      class="w-5 h-5 fill-black/5 transition duration-200 hover:fill-neutral-900/100 cursor-pointer"
    >
      <path
        data-tauri-drag-region
        fill-rule="evenodd"
        d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8 1a1 1 0 100-2 1 1 0 000 2zm-3-1a1 1 0 11-2 0 1 1 0 012 0zm7 1a1 1 0 100-2 1 1 0 000 2z"
        clip-rule="evenodd"
      />
    </svg>
  </div>
  <div class="flex flex-col gap-y-0.5 p-2 w-full">
    {#each messages as { message, size }}
      <p class={`text-[${size}rem] font-bold`}>{message}</p>
    {/each}
  </div>
</main>

<Preferences />

<!-- TODO: add option window that can modify format and font size-->
