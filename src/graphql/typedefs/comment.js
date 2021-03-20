import { gql } from 'apollo-server-express';

export default gql`
	extend type Query {
		comments(postId: String!): [Comment]
	}

	extend type Mutation {
		createComment(comment: CommentInput!): CreateCommentResponse!
		editComment(commentId: String!, updatedContent: String!): CreateCommentResponse!
	}

	type Comment {
		content: String
		parentPost: String
		author: Author
		_id: String
	}

	input CommentInput {
		content: String!
		postId: String!
	}

	type CreateCommentResponse {
		success: Boolean!
		message: String
		comment: Comment
	}
`;
