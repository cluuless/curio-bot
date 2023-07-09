const { Op } = require('sequelize');
const { ChannelType, SlashCommandBuilder, GUILDS } = require('discord.js');
const { EmojiMap, constructKey } = require('../dbObjects.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('curate')
		.setDescription('Set or update the emoji and channel name that Curio will post to.')
		.addStringOption(option =>
			option
				.setName('emoji')
				.setDescription('The emoji to use')
				.setRequired(true)
			)
		.addChannelOption(option =>
			option
				.setName('channel')
				.setDescription('The channel to post to')
				.addChannelTypes(ChannelType.GuildText)
				.setRequired(true)
			),
	async execute(interaction) {
		const emoji_str = interaction.options.getString('emoji');
		const channel = interaction.options.getChannel('channel');
		const guild_emoji_key = constructKey(interaction.guild.id, emoji_str);
		
		console.log(`Recieved curate request from guild ${guild_emoji_key} for (${emoji_str}, ${channel.name}).`);
		await EmojiMap.upsert({
			key: guild_emoji_key,
			guildid: interaction.guild.id,
			emoji: emoji_str,
            channel: channel.id
		});
		await interaction.reply(`Okay! I'll start saving posts that receive ${emoji_str} reactions to the channel ${channel}.`);
	},
};