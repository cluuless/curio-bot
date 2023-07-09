const { Op } = require('sequelize');
const { Events } = require('discord.js');
const { EmojiMap } = require('../dbObjects.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		EmojiMap.sync();
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};