import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useFollowingQuery } from '../../generated/graphql';
import UserContext from '../../UserContext';

const FollowingSection = () => {
	const user = useContext(UserContext);
	const { data, loading, error } = useFollowingQuery({
		variables: {
			_id: user ? user._id : ''
		}
	});

	if (loading) return <div>Loading....</div>;
	console.log(data);
	return (
		<div>
			<h1>Your Subscriptions</h1>
			{data?.following.map((blog) => {
				return (
					<h3>
						<Link to={'/blog/view/' + blog._id}>{blog.name}</Link>
					</h3>
				);
			})}
		</div>
	);
};

export default FollowingSection;
