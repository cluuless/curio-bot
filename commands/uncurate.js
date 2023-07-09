const { Op } = require('sequelize');
const { ChannelType, SlashCommandBuilder, GUILDS } = require('discord.js');
const { EmojiMap, constructKey } = require('../dbObjects.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('uncurate')
		.setDescription('Stop curating on an emoji. This will not delete any already-curated messages.')
		.addStringOption(option =>
			option
				.setName('emoji')
				.setDescription('The emoji to stop curating on.')
				.setRequired(true)
			),
	async execute(interaction) {
		const emoji_str = interaction.options.getString('emoji');
		const guild_emoji_key = constructKey(interaction.guild.id, emoji_str);
		
		console.log(`Recieved uncurate request from guild ${guild_emoji_key} for (${emoji_str}).`);
		// This removes the mapping in the EmojiMap, but will not remove the post from the channel.
		await EmojiMap.destroy({ where: { key: guild_emoji_key }});
		await interaction.reply(`I will no longer collect ${emoji_str} reactions. If you would like me to start collecting posts again, run the /curate command!`);
	},
};