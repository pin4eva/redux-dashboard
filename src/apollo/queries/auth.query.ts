import { gql } from "@apollo/client";

export const SIGNUP = gql`
	mutation Signup(
		$first_name: String!
		$last_name: String!
		$email: String!
		$password: String!
	) {
		signup(
			first_name: $first_name
			last_name: $last_name
			email: $email
			password: $password
		) {
			token
		}
	}
`;

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
		}
	}
`;

export const VERIFY_ME = gql`
	mutation VerifyMe($token: String!) {
		verifyMe(token: $token) {
			uuid
			_id
			email
		}
	}
`;

export const GET_ME = gql`
	{
		getMe {
			_id
			uuid
			first_name
			last_name
			email
			email_verified_at
			created_at
			updated_at
		}
	}
`;

export const RESEND_VERIFICATION_EMAIL = gql`
	mutation {
		resendVerificationEmail {
			message
		}
	}
`;
