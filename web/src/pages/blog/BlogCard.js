import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { useFollowersCountQuery } from '../../generated/graphql';
import { Link } from 'react-router-dom';
const BlogCard = (props) => {
	const blog = props.blog;

	const { data, loading, error } = useFollowersCountQuery({
		variables: {
			_id: blog._id
		}
	});

	return (
		<Card>
			<Image src="/images/avatar/large/matthew.png" wrapped ui={false} />
			<Card.Content>
				<Card.Header>
					<Link to={'/blog/view/' + blog._id}>{blog.name}</Link>
				</Card.Header>
				<Card.Meta>
					<span className="date">{blog.author.name}</span>
				</Card.Meta>
				<Card.Description>Matthew is a musician living in Nashville.</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<a>
					<Icon name="user" />
					{error ? 0 : loading ? 0 : data.followersCount} Followers
				</a>
			</Card.Content>
		</Card>
	);
};

export default BlogCard;
