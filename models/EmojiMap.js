module.exports = (sequelize, DataTypes) => {
	return sequelize.define('emojimaps', {
		key: {  // guildid::emoji
			type: DataTypes.STRING,
			primaryKey: true
		},
		guildid: {
			type: DataTypes.STRING,
			defaultValue: "",
			allowNull: false,
		},
		emoji: {
			type: DataTypes.STRING,
			defaultValue: "⭐",
			allowNull: false,
		},
		channel: {
			type: DataTypes.STRING,
			defaultValue: "",
			allowNull: false,
		},
	}, {
		timestamps: false,
	});
};