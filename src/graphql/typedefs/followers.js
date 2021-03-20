import { gql } from 'apollo-server-express';

export default gql`
	extend type Query {
		followers(_id: String!): [User]
		following(_id: String!): [Blog]
		followingIds(_id: String!): [String]
		followersCount(_id: String): Int
		followingCount(_id: String): Int
	}

	extend type Mutation {
		addFollower(blogId: String!, userId: String!): BaseResponse
		removeFollower(blogId: String!, userId: String!): BaseResponse
	}
`;
