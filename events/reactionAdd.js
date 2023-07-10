const { Events } = require('discord.js');
const { EmojiMap, constructKey } = require('../db/dbObjects.js');
const { createAttachmentsFromMessage, createEmbedFromMessage } = require('../utils/embedsUtil.js');

module.exports = {
	name: Events.MessageReactionAdd,
	async execute(reaction) {
		// When a reaction is received, check if the structure is partial
		if (reaction.partial) {
			// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
			try {
				await reaction.fetch();
			}
			catch (error) {
				console.error('Something went wrong when fetching the message:', error);
				// Return as `reaction.message.author` may be undefined/null
				return;
			}
		}

		// Construct proper guild::emoji key
		const guild_emoji_key = constructKey(reaction.message.guild.id, reaction.emoji.name);
		// If a channel entry exists in the EmojiMap, write to that channel.
		const result = await EmojiMap.findOne({ where: { key: guild_emoji_key } });
		if (result !== null) {
			const channel = reaction.client.channels.cache.get(result.channel);
			const embed = await createEmbedFromMessage(reaction.message);
			const attachments = createAttachmentsFromMessage(reaction.message);

			if (embed === null) {
				console.log('ERROR on reactionAdd: Invalid embed.');
				return;
			}

			channel.send({ embeds: [ embed ], files: attachments });
		}
		// Otherwise we ignore this reaction.
	},
};