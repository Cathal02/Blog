import React, { useState, useContext } from 'react';
import { useCreateBlogMutation } from '../../generated/graphql';
import UserContext from '../../UserContext';
import { BlogByUserDocument } from '../../generated/graphql';

const CreateBlog = ({ history }) => {
	const user = useContext(UserContext);

	const [ name, setName ] = useState('');
	const [ feedback, setFeedback ] = useState('');
	const [ createBlogMutation, { data, loading, error } ] = useCreateBlogMutation({
		variables: {
			name
		}
	});
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (name !== '') {
			await createBlogMutation({
				refetchQueries: [
					{
						query: BlogByUserDocument,
						variables: {
							_id: user._id
						}
					}
				]
			});

			if (error) {
				console.log('Error:' + error);
				setFeedback('Something went wrong, please try again');
				return;
			}

			if (data && !data.createBlog.success) {
				setFeedback(data.createBlog.message);
				return;
			}

			history.push('/profile');
		}
	};

	if (loading) return <h1>Creating Blog</h1>;

	if (!user) return <h1>You must be logged in to create a blog.</h1>;
	return (
		<div>
			<h3>{feedback}</h3>
			<form>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.currentTarget.value)}
					name="blog title"
					placeholder="Blog Name"
				/>
				<button onClick={handleSubmit}>Create Blog</button>
			</form>
		</div>
	);
};

export default CreateBlog;
