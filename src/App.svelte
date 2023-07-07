<script lang="ts">
  import tmi from "tmi.js"

  const DEFAULT_FORMAT = "%username%: %message%"

  localStorage.messageFormat ??= DEFAULT_FORMAT
  localStorage.fontSize ??= 3

  const client = new tmi.Client({
    options: { debug: true },
    identity: {
      username: "justinfan6969",
    },
    channels: ["omom1972"],
  })

  let messages: string[] = []

  client.connect().catch(console.error)

  client.on("message", (_, tags, message, __) => {
    const formattedMessage = (
      String(localStorage.messageFormat) ?? DEFAULT_FORMAT
    )
      .replace("%username%", tags.username)
      .replace("%message%", message)

    messages = [...messages, formattedMessage]
  })
</script>

<main class="w-full h-screen bg-black/5 text-white font-pretendard relative">
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
  <div class="flex flex-col gap-y-2 p-2 w-full">
    <p class="text-2xl font-bold">Hello!</p>
    {#each messages as message}
      <p class="text-xl font-bold text-stroke">{message}</p>
    {/each}
  </div>
</main>
