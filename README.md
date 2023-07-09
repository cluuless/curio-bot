# Curio, the little Curation Bot

When you react to a message with a specific emoji, this little bot will collect it and post it to a channel of your choosing. Works similar to the Reactji bot for Slack.

## Commands

`/curate [emoji] [channel]`

Set the reaction emoji and channel that Curio bot will save posts to. You may have more than one reaction emoji that is curating to different channels. However, running `/curate` again on an emoji that already has a set channel will overwrite the old channel.

`/uncurate [emoji]`

Stop curating on this emoji. This will NOT delete any already-curated messages.

`/listcurations`

List all reaction emojis and channels that Curio is currently curating in your server.
