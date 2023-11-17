import { Schema, model, Types } from "mongoose";

enum Gender {
	male,
	female,
	other
}

export interface IProfile {
	_id?: Types.ObjectId;
	nickname: string;
	avatar: string;
	background: string;
	phone: string;
	address: string;
	dayOfBirth: Date;
	gender?: Gender;
	coin: number;
}

const ProfileSchema = new Schema<IProfile>(
	{
		nickname: String,
		avatar: String,
		background: String,
		phone: String,
		address: String,
		dayOfBirth: Date,
		gender: {
			type: Number,
			enum: Gender,
			default: 0
		},
		coin: Number
	},
	{
		timestamps: true
	}
);

const Profile = model<IProfile>("Profile", ProfileSchema);

export { Profile, ProfileSchema };
