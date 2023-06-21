const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ProfileSchema = new Schema(
	{
		_id: {
			type: String,
			require: true
		},
		nickname: String,
		avatar: String,
		coin: Number,
		birthday: Date,
		phone: String
	},
	{
		timestamps: false
	}
);

const Profile = model("Profile", ProfileSchema);
module.exports = { Profile, ProfileSchema };
