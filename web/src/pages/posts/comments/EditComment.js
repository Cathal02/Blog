import React, { useState } from 'react';
import { useEditCommentMutation, CommentsDocument } from '../../../generated/graphql';
const EditComment = (props) => {
	const [ content, setContent ] = useState('');
	const [ editCommentMutation, { data, loading, error } ] = useEditCommentMutation({
		variables: {
			commentId: props.comment._id,
			updatedContent: content
		}
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
		await editCommentMutation({
			refetchQueries: [
				{
					query: CommentsDocument,
					variables: {
						postId: props.postId
					}
				}
			]
		});

		props.setEditing(false);
	};
	return (
		<div>
			<h4>{props.comment.author.name}</h4>
			<h3>Editing</h3>
			<form onSubmit={handleSubmit}>
				<textarea value={content} onChange={(e) => setContent(e.target.value)} />
				<button>Submit</button>
			</form>
		</div>
	);
};

export default EditComment;
