const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const EmojiMap = require('../models/EmojiMap.js')(sequelize, Sequelize.DataTypes);

// For testing
const force = process.argv.includes('--force') || process.argv.includes('-f');
sequelize.sync({ force }).then(async () => {
	const emojimap = [
		EmojiMap.upsert({ emoji: '⭐', channel: '#test' }),
	];

	await Promise.all(emojimap);
	console.log('Database synced');

	sequelize.close();
}).catch(console.error);