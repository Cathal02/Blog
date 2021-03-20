import React, { useState, useEffect, useContext } from 'react';
import { useCreateCommentMutation } from '../../../generated/graphql';
import { useMeQuery } from '../../../generated/graphql';
import { CommentsDocument } from '../../../generated/graphql';
import UserContext from '../../../UserContext';
const CreateComment = (props) => {
	const [ content, setContent ] = useState('');
	const [ error, setError ] = useState('');
	const [ createCommentMutation, { data, loading, error: commentError } ] = useCreateCommentMutation();

	const user = useContext(UserContext);

	const handleSubmit = async (e) => {
		e.preventDefault();

		await createCommentMutation({
			variables: { comment: { content, postId: props.postId } },
			refetchQueries: [
				{
					query: CommentsDocument,
					variables: {
						postId: props.postId
					}
				}
			]
		});
	};

	useEffect(
		() => {
			if (error) {
				setError('An error occured. Please try again');
				return;
			}

			if (data) {
				if (data.createComment.success) {
				} else {
					setError(data.createComment.message);
				}
			}
		},
		[ data, commentError ]
	);

	if (loading) return <div>Loading</div>;

	return (
		<div>
			{error}

			{user ? (
				<form onSubmit={handleSubmit}>
					<textarea placeholder="Comment" value={content} onChange={(e) => setContent(e.target.value)} />
					<button type="submit">Create Comment</button>
				</form>
			) : (
				'You must be logged in to create a comment'
			)}
		</div>
	);
};

export default CreateComment;
