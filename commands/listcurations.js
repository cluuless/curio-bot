const { SlashCommandBuilder } = require('discord.js');
const { EmojiMap } = require('../db/dbObjects.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('listcurations')
		.setDescription('List all the emojis and channels that Curio is actively curating.'),
	async execute(interaction) {
		const guildid = interaction.guild.id;
		const result = await EmojiMap.findAll({
			where: { guildid: guildid },
			attributes: ['emoji', 'channel'],
		});
		if (result === null) {
			await interaction.reply('There is nothing being curated at the moment. Run the /curate command to set it up!');
		}
		else {
			let pretty_print = 'The following are being collected:\n';
			result.forEach((row) => {
				const channel = interaction.client.channels.cache.get(row.channel);
				pretty_print += `* Messages with ${row.emoji} reactions are being collected to ${channel}\n`;
			});
			await interaction.reply(pretty_print);
		}
	},
};