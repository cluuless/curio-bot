const { SlashCommandBuilder } = require('discord.js');
const { EmojiMap, constructKey } = require('../db/dbObjects.js');
const { createAttachmentsFromMessages, createEmbedFromMessages } = require('../utils/embedsUtil.js');
const { getMessageIDFromURL, getChannelIDFromURL } = require('../utils/urlUtils.js');


const NUM_MESSAGEURL_ARGS = 3;

async function fetchMessageFromURL(interaction, messageUrl) {
	const messageId = getMessageIDFromURL(messageUrl);
	const channelId = getChannelIDFromURL(messageUrl);
	const textChannel = await interaction.client.channels.fetch(channelId);
	const resultMessage = await textChannel.messages.fetch(messageId);
	return resultMessage;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('collectmultiple')
		.setDescription('Manually collect up to 3 messages and save into one post in the channel corresponding to the emoji.')
		.addStringOption(option =>
			option
				.setName('emoji')
				.setDescription('The emoji to use for collection')
				.setRequired(true),
		)
		.addStringOption(option =>
			option
				.setName('messageurl1')
				.setDescription('First message')
				.setRequired(true),
		)
		.addStringOption(option =>
			option
				.setName('messageurl2')
				.setDescription('Second message')
				.setRequired(true),
		)
		.addStringOption(option =>
			option
				.setName('messageurl3')
				.setDescription('(optional) Third message')
				.setRequired(false),
		),
	async execute(interaction) {
		const emoji_str = interaction.options.getString('emoji');

		// Fetch message objects from the non-null urls.
		const messages = [];
		for (let i = 0; i < NUM_MESSAGEURL_ARGS; i++) {
			// The params are 1-indexed, but the arr is 0-indexed.
			const messageUrl = interaction.options.getString(`messageurl${i + 1}`) ?? null;
			if (messageUrl !== null) {
				const message = await fetchMessageFromURL(interaction, messageUrl);
				messages.push(message);
			}
		}

		// Get the correct channel to post.
		const guild_emoji_key = constructKey(interaction.guild.id, emoji_str);
		const result = await EmojiMap.findOne({ where: { key: guild_emoji_key } });

		if (result !== null) {
			const channel = interaction.client.channels.cache.get(result.channel);
			const embed = await createEmbedFromMessages(messages);
			const attachments = createAttachmentsFromMessages(messages);

			if (embed === null) {
				console.log('ERROR on collectmultiple: Invalid embed.');
				await interaction.reply({
					content: 'There was an error saving these messages.',
					ephemeral: true,
				});
				return;
			}

			channel.send({ embeds: [ embed ], files: attachments });
			await interaction.reply({
				content: `Collected ${messages.length} messages and posted to the channel ${channel}.`,
				ephemeral: true,
			});
		}
	},
};