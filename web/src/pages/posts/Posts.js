import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useApprovedPostsQuery } from '../../generated/graphql';
import UserContext from '../../UserContext';

const Posts = ({ history }) => {
	const { data, loading, error } = useApprovedPostsQuery();
	const user = useContext(UserContext);

	if (loading) return <div>loading </div>;
	if (error) return <div>An error occured.</div>;

	const renderButton = (post) => {
		if (!user) return '';
		if (post.author === null) return '';
		if (post.author._id != user._id && !user.admin) return '';
		return <button onClick={() => history.push('/posts/edit/' + post._id)}>Edit post</button>;
	};
	return (
		<div>
			<h3>
				<h3 onClick={() => history.push('/posts/create')}>Create a post</h3>
			</h3>
			<div>
				{data.posts.map((x) => {
					return (
						<div key={x._id}>
							<h1>
								<Link to={'/posts/view/' + x._id}>Title: {x.title}</Link>
							</h1>
							<h4>Written by: {x.author === null ? '' : x.author.name}</h4>
							{renderButton(x)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Posts;
