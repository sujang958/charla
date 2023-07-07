<script lang="ts">
  import tmi from "tmi.js"

  const client = new tmi.Client({
    options: { debug: true },
    identity: {
      username: "justinfan6969",
    },
    channels: ["omom1972"],
  })

  client.connect().catch(console.error)

  client.on("message", (channel, tags, message, self) => {
    console.log(message)
  })
</script>
