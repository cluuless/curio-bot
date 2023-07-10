const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

const helpText = `
If this is your first time using Curio, run /curate to set up your first curation!

**Basic Commands:**
\`/curate [emoji] [channel]\`: Set the emoji and channel that curio bot will save posts to. 
\`/uncurate [emoji]\`: Stop curating on the provided emoji.
\`/listcurations\`: List all emojis and channels that Curio is currently curating.

**Advanced Commands:**
\`/collectmultiple [emoji] [messageurl1] [messageurl2] [messageurl3 (optional)]\`: Collect up to 3 messages and post to the emoji's curation channel.
`;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('See Curio\'s commands.'),
	async execute(interaction) {
		const resultEmbed = new EmbedBuilder()
			.setColor(0xCC6600)
			.setTitle('Curio, the little curation bot')
			.setURL('https://github.com/cluuless/curio-bot')
			.setDescription(helpText);
		await interaction.reply({ embeds: [ resultEmbed ] });
	},
};