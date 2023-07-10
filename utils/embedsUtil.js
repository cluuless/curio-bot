const { EmbedBuilder } = require('discord.js');

// Returns an array of attachments.
function createAttachmentsFromMessage(message) {
	return ((message.attachments !== null) ? message.attachments.map(({ attachment }) => attachment) : []);
}

// Returns a flattened array of all attachments.
function createAttachmentsFromMessages(messages) {
	const attachments = [];
	for (let i = 0; i < messages.length; i++) {
		const currAttchments = createAttachmentsFromMessage(messages[i]);
		if (currAttchments.length > 0) attachments.push(...currAttchments);
	}
	console.log(attachments);
	return attachments;
}

// Returns an Embed.
async function createEmbedFromMessage(message) {
	const member = await message.guild.members.fetch(message.author.id);
	const resultEmbed = new EmbedBuilder()
		.setColor(0xCC6600)
		.setTitle(message.url)
		.setURL(message.url)
		.setAuthor({ name: `${member.displayName}`, iconURL: `${member.displayAvatarURL()}` })
		.setDescription(`${message.content}`);
	return resultEmbed;
}

// Returns the original embed with the additional message as a new field.
function appendMessageToEmbed(embed, message) {
	embed.addFields({ name: `${message.url}`, value: `${message.content}` });
}

// Returns a single Embed, where any additional messages are included as new fields.
async function createEmbedFromMessages(messages) {
	if (messages.length < 2) return null;
	const resultEmbed = await createEmbedFromMessage(messages[0]);
	for (let i = 1; i < messages.length; i++) {
		appendMessageToEmbed(resultEmbed, messages[i]);
	}
	return resultEmbed;
}

module.exports = {
	createAttachmentsFromMessage,
	createAttachmentsFromMessages,
	createEmbedFromMessage,
	createEmbedFromMessages,
};