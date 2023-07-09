const { Events } = require('discord.js');
const { EmojiMap, constructKey } = require('../dbObjects.js');

module.exports = {
	name: Events.MessageReactionAdd,
	async execute(reaction, user) {
        // When a reaction is received, check if the structure is partial
        if (reaction.partial) {
            // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
            try {
                await reaction.fetch();
            } catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                // Return as `reaction.message.author` may be undefined/null
                return;
            }
        }
    
        // Construct proper guild::emoji key
        const guild_emoji_key = constructKey( reaction.message.guild.id, reaction.emoji.name);
        // If a channel entry exists in the EmojiMap, write to that channel.
        const result = await EmojiMap.findOne({ where: { key: guild_emoji_key } });
        if (result != null) {
            const channel = reaction.client.channels.cache.get(result.channel);
            // Flatten attachments to an array if they exist.
            let flat_attch = ((reaction.message.attachments != null) ? reaction.message.attachments.map(({ attachment }) => attachment) : []);
            // Edit message with attachments only if they exist.
            channel.send(
                `${reaction.message.url} by ${reaction.message.author}\n${reaction.message.content}`
                ).then(message => (flat_attch.length > 0 ? message.edit({files : flat_attch}) : message));
        }
        //Otherwise we ignore this reaction.
    },
};