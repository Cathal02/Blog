import React, { useState, useEffect, useRef } from 'react';
import { useEditPostMutation, useCreatePostMutation, usePostQuery } from '../../generated/graphql';
import { useAdminMeQuery } from '../../generated/graphql';

const CreatePost = (props) => {
	const [ title, setPostTitle ] = useState('');
	const [ content, setPostContent ] = useState('');
	const [ feedback, setFeedback ] = useState('');
	const [ validUser, setValidUser ] = useState(true);
	const { data: postData, loading, error: postError } = usePostQuery({ variables: { id: props.match.params.id } });
	const { data: user, loading: userLoading, error: userError } = useAdminMeQuery();

	const [
		editPost,
		{ data: editPostResponse, loading: editPostLoading, error: editPostError }
	] = useEditPostMutation();

	const post = useRef({});

	// Checks to see if our post mutation has been finished
	// And take the correct actions
	useEffect(
		() => {
			if (!editPostResponse) return;
			if (editPostResponse && editPostResponse.editPost.success) {
				props.history.push('/');
				return;
			}

			setFeedback(editPostResponse.editPost.message);
		},
		[ editPostResponse ]
	);

	// Checks for update of the post we want to update in
	// order to populate inputs

	useEffect(
		() => {
			if (postData) {
				setPostTitle(postData.post.title);
				setPostContent(postData.post.content);

				post.current = postData.post;
			}
		},
		[ postData ]
	);

	// Checks whether or not the user editing
	// this post is allowed to or not.

	useEffect(
		() => {
			if (!postData) return;
			if (user != null && user.me !== null) {
				if (!user.me.admin && postData.post.author._id !== user.me._id) {
					setValidUser(false);
					return;
				}
				return;
			}
			setValidUser(false);
			return;
		},
		[ user, postData ]
	);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (title === '' || content === '') {
			setFeedback('Content or title cannot be empty!');
			return;
		}

		await editPost({
			variables: {
				postId: post.current._id,
				post: {
					title,
					content
				}
			}
		});
	};

	if (loading || userLoading) return <h3>Loading...</h3>;
	if (postError || userError) return <h3>An error occured. Please try again.</h3>;

	return (
		<div>
			<h3>{feedback}</h3>
			{validUser ? (
				<form>
					<input
						type="text"
						value={title}
						onChange={(e) => setPostTitle(e.currentTarget.value)}
						name="post title"
						placeholder="Post Name"
					/>
					<textarea
						rows="4"
						name="content"
						value={content}
						onChange={(e) => setPostContent(e.currentTarget.value)}
						placeholder="Content"
					/>
					<button onClick={handleSubmit}>Create Post</button>
				</form>
			) : (
				<h3>You are not the author of this post.</h3>
			)}
		</div>
	);
};

export default CreatePost;
