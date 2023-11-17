import { Schema, Types, model } from "mongoose";

export interface IGroup {
	_id: Types.ObjectId;
	author: Types.ObjectId;
	name: string;
	image: string;
	background: string;
	description: string;
	members: Types.ObjectId[];
	publish: boolean;
}

const GroupSchema = new Schema<IGroup>(
	{
		author: {
			type: Schema.Types.ObjectId,
			ref: "User"
		},
		name: {
			type: String,
			required: true
		},
		image: String,
		background: String,
		description: String,
		members: [
			{
				type: Types.ObjectId,
				ref: "User"
			}
		],
		publish: Boolean
	},
	{
		timestamps: true
	}
);

const Group = model<IGroup>("Group", GroupSchema);

export default Group;
