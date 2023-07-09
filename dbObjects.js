const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const EmojiMap = require('./models/EmojiMap.js')(sequelize, Sequelize.DataTypes);

function constructKey(guild_id, emoji_str) {
	return `${guild_id}::${emoji_str}`;
}

module.exports = { EmojiMap, constructKey };