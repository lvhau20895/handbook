import { Schema, Types, model } from "mongoose";
import { IProfile, ProfileSchema } from "./profile.model";

export interface IUser {
	_id?: Types.ObjectId;
	username: string;
	email: string;
	password: string;
	role?: String;
	profiles?: IProfile;
	groups?: Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
	{
		username: {
			type: String,
			require: true,
			unique: true
		},
		email: {
			type: String,
			require: true,
			unique: true
		},
		password: {
			type: String,
			require: true
		},
		role: {
			type: String,
			enum: ["guest", "admin"],
			default: "guest"
		},
		profiles: ProfileSchema,
		groups: [
			{
				type: Types.ObjectId,
				ref: "Group"
			}
		]
	},
	{
		timestamps: true
	}
);

const User = model<IUser>("User", UserSchema);

export default User;
