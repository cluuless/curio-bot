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

// Returns an array of [guild_id, emoji_str]
function splitKeyOrNull(key_str) {
	const key_arr = key_str.split("::");
    if (key_arr.length != 2) {
        console.log(`ERROR: Cannot correctly split key ${key_str} into proper EmojiMap format.`);
        return null;
    }
    
}

async function getChannelForEmojiOrNull(guild_id, emoji_str) {
	const guild_emoji_key = constructKey(guild_id, emoji_str);
	const result = await EmojiMap.findOne({ where: { key: guild_emoji_key } });
	if (result === null) {
		return null;
	}
	return result.channel;
}

module.exports = { EmojiMap, constructKey, splitKeyOrNull, getChannelForEmojiOrNull };