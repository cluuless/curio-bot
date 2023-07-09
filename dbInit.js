const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const EmojiMap = require('./models/EmojiMap.js')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
	const emojimap = [
		EmojiMap.upsert({ emoji: '⭐', channel: '#test' }),
	];

	await Promise.all(emojimap);
	console.log('Database synced');

	sequelize.close();
}).catch(console.error);