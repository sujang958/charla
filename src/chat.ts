// jrwb2k0tikjgq2u4izmk0wrot08zjo

import tmi from "tmi.js"

const client = new tmi.client({
  identity: {
    username: "Charla",
    password: "jrwb2k0tikjgq2u4izmk0wrot08zjo",
  },
  channels: [
    "omom1972"
  ]
})

client.on('connected', (address, port) => {
  console.log("Connected to Twitch", address, port)
})

client.on("message", (channel, userState, message) => {
  console.log(channel, userState, message)
})

client.connect()