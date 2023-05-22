const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { ProfileSchema } = require("./profileSchema");

const UserSchema = new Schema(
	{
		_id: {
			type: String,
			require: true
		},
		username: {
			type: String,
			require: true
		},
		email: {
			type: String,
			require: true
		},
		password: {
			type: String,
			require: true
		},
		role: {
			type: String,
			enum: ["admin", "guest"],
			default: "guest"
		},
		profile: ProfileSchema
	},
	{
		timestamps: true
	}
);

const User = model("User", UserSchema);
module.exports = { User, UserSchema };
