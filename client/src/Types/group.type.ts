import { User } from "./user.type";

export interface Group {
	_id: string;
	author: string;
	name: string;
	image: string;
	background: string;
	description: string;
	members: User[];
	publish: boolean;
}
