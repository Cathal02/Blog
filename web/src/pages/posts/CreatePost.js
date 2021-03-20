import React, { useState } from 'react';
import { useCreatePostMutation } from '../../generated/graphql';
import { BlogDocument } from '../../generated/graphql';
const CreatePost = ({ history, match }) => {
	const [ title, setPostTitle ] = useState('');
	const [ content, setPostContent ] = useState('');
	const [ feedback, setFeedback ] = useState('');
	const [ createPostMutation, { data, loading, error } ] = useCreatePostMutation();
	const blogId = match.params.id;
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (content !== ' ' && title !== '') {
			await createPostMutation({
				variables: {
					title,
					content,
					blog: blogId
				},
				refetchQueries: [
					{
						query: BlogDocument,
						variables: {
							_id: blogId
						}
					}
				]
			});

			if (error) {
				console.log('Error:' + error);
				setFeedback('Something went wrong, please try again');
				return;
			}

			if (data && !data.createPost.success) {
				setFeedback(data.createPost.message);
				return;
			}

			history.push('/blog/view/' + blogId);
		}
	};

	if (loading) return <h1>Creating Post</h1>;

	return (
		<div>
			<h3>{feedback}</h3>
			<form>
				<input
					type='text'
					value={title}
					onChange={(e) => setPostTitle(e.currentTarget.value)}
					name='post title'
					placeholder='Post Name'
				/>
				<textarea
					rows='4'
					name='content'
					value={content}
					onChange={(e) => setPostContent(e.currentTarget.value)}
					placeholder='Content'
				/>
				<button onClick={handleSubmit}>Create Post</button>
			</form>
		</div>
	);
};

export default CreatePost;
