import { gql } from 'apollo-server-express';

export default gql`
	extend type Query {
		posts(approved: Boolean): [Post]
		post(postId: String!): Post
	}

	extend type Mutation {
		createPost(post: PostInput): PostResponse!
		# deletePost(postId: String): Boolean
		editPost(postId: String!, newPost: PostInput!): EditPostResponse!
		removeAllPosts: Boolean
		changeApprovalStatus(postId: String!, approved: Boolean!): ApprovalStatusResponse!
	}

	type Post {
		content: String
		title: String
		author: Author
		_id: String
		approved: Boolean
	}

	type Author {
		name: String
		_id: String!
	}

	input PostInput {
		content: String!
		title: String!
		blog: String!
	}

	type PostResponse {
		success: Boolean!
		post: Post
		message: String
	}

	type ApprovalStatusResponse {
		success: Boolean!
		approved: Boolean!
		message: String
		postId: String
	}

	type EditPostResponse {
		success: Boolean!
		message: String
	}
`;
