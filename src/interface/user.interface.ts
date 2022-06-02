export interface IUser {
	_id: string;
	uuid: string;
	first_name: string;
	last_name: string;
	email: string;
	email_verification_token: string;
	email_verified_at: Date;
	created_at: Date;
	updated_at: Date;
}

export interface AuthResponse {
	user: IUser;
	token: string;
}

export interface SignupPayload {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
}
