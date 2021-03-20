import React, { useEffect, useState, useContext } from 'react';
import { usePostQuery, useCommentsQuery } from '../../generated/graphql';
import CreateComment from './comments/CreateComment';
import CommentView from './comments/CommentView';
import UserContext from '../../UserContext';
const PostView = (props) => {
	const { data: postData, loading: postLoading, error: postError } = usePostQuery({
		variables: { id: props.match.params.id }
	});

	const { data: commentData, loading: commentsLoading, error: commentError } = useCommentsQuery({
		variables: { postId: props.match.params.id }
	});

	const user = useContext(UserContext);

	if (postLoading || commentsLoading) return <div>Loading....</div>;
	if (postError || commentError) return <div>An error occured. Please refresh the page</div>;

	return (
		<div>
			{Object.keys(postData) != 0 ? (
				<div>
					<h1>{postData.post.title}</h1>
					<h3>Author: {postData.post.author.name}</h3>
					<p>{postData.post.content}</p>
					<CreateComment postId={postData.post._id} />
				</div>
			) : (
				<div>Loading</div>
			)}

			{Object.keys(commentData) != 0 ? (
				commentData.comments.map((comment) => {
					return <CommentView user={user} comment={comment} postId={props.match.params.id} />;
				})
			) : (
				<h5>There are no comments yet!</h5>
			)}
		</div>
	);
};

export default PostView;
