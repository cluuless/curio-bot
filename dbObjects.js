const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
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