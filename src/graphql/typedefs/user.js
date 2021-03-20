import { gql } from 'apollo-server-express';

export default gql`
	extend type Query {
		users: [User!]
		userId: String!
		me: User
	}

	extend type Mutation {
		registerUser(user: UserInput!): BaseResponse!
		login(user: UserInput!): LoginResponse!
		revokeUserFrefreshToken(userId: String!): Boolean!
		logout: Boolean!
	}

	type User {
		email: String!
		password: String!
		name: String
		admin: Boolean!
		_id: String!
	}

	input UserInput {
		email: String!
		password: String!
		name: String
	}

	type LoginResponse {
		accessToken: String!
		user: User!
	}

	type BaseResponse {
		success: Boolean!
		message: String
	}
`;
