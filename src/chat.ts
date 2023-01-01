// jrwb2k0tikjgq2u4izmk0wrot08zjo

import tmi from "tmi.js"

export const getClient = ({
  password,
  channel,
}: {
  password: string
  channel: string
}) => {
  const client = new tmi.client({
    identity: {
      username: "Charla",
      password: password,
    },
    channels: [channel],
  })

  client.on("connected", (address, port) => {
    console.log("Connected to Twitch", address, port)
  })

  return client
}



// client.on("message", (channel, userState, message) => {
//   console.log(channel, userState, message)
// })

// client.connect()
