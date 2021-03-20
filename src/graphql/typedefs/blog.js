import { gql } from 'apollo-server-express';

export default gql`
	extend type Query {
		blog(_id: String!): Blog
		blogByUser(_id: String!): [Blog]
		recentBlogPosts(_id: String!, amount: Int!): [Post]
	}

	extend type Mutation {
		createBlog(name: String!): BlogCreateResponse!
	}

	type Blog {
		author: Author!
		posts: [Post]!
		name: String!
		_id: String!
	}

	type BlogCreateResponse {
		success: Boolean!
		message: String
		_id: String
	}
`;
