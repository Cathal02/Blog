import React, { useState } from 'react';
import UserContext from '../../../UserContext';
import EditComment from './EditComment';
const CommentView = (props) => {
	const [ editing, setEditing ] = useState(false);

	const renderButton = () => {
		if (!props.user) {
			return '';
		}

		if (props.user._id === props.comment.author._id || props.user.admin) {
			return <button onClick={() => setEditing(true)}>Edit comment</button>;
		}
	};

	const renderView = () => {
		if (editing) {
			return <EditComment comment={props.comment} postId={props.postId} setEditing={setEditing} />;
		} else {
			return (
				<div>
					<h4>{props.comment.author.name}</h4>
					<p>{props.comment.content}</p>
					{renderButton()}
				</div>
			);
		}
	};
	return <div>{renderView()}</div>;
};

export default CommentView;
