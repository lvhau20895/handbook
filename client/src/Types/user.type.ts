import { Group } from "./group.type";
import { Profile } from "./profile.type";

type Role = "guest" | "admin";

export interface User {
	_id: string;
	username: string;
	email: string;
	password: string;
	role?: Role;
	profiles?: Profile;
	groups?: Group[];
}
