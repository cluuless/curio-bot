# Curio, the Little Discord Curation Bot

When you react to a Discord message with a specific emoji, Curio will collect it and post it to a channel of your choosing. Works similar to the Reactji bot for Slack.

## Commands

`/curate [emoji] [channel]`

Set the reaction emoji and channel that Curio bot will save posts to. You may have more than one reaction emoji that is curating to different channels. However, running `/curate` again on an emoji that already has a set channel will overwrite the old channel.

`/uncurate [emoji]`

Stop curating on this emoji. This will NOT delete any already-curated messages.

`/listcurations`

List all reaction emojis and channels that Curio is currently curating in your server.

## News & Updates

**[2023-07-09]** Initial MVP (v.0.1.0) is up on git, but for the most part is still in development. More to come, including documentation on how to add the bot to your server.

## Who is maintaining this?

Currently @cluuless is the sole maintainer of this repo as a small side project. For now, issues will be addressed as best effort (unless this suddenly blows up and gets really popular, in which case I may re-evaluate).