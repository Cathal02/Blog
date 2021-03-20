import { useBlogQuery, useRecentBlogPostsQuery } from '../../generated/graphql';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import UserContext from '../../UserContext';
import { useContext, useState, useEffect } from 'react';
import FollowBlog from './FollowBlog';
const Blog = ({ match }) => {
	const user = useContext(UserContext);
	const { data, loading, error } = useBlogQuery({
		variables: {
			_id: match.params.id
		}
	});

	const { data: recentPosts, loading: recentLoading, error: recentError } = useRecentBlogPostsQuery({
		variables: {
			_id: match.params.id,
			amount: 3
		}
	});

	if (loading || recentLoading) return <div>Loading</div>;
	if (error || recentError) return <div>error: {JSON.stringify(error)} </div>;

	return (
		<div>
			<h1>{data.blog.name}</h1>
			<FollowBlog blog={data.blog} />
			{user && user._id == data.blog.author._id ? (
				<Button positive as={Link} to={'/blog/' + data.blog._id + '/posts/create'}>
					Create a post
				</Button>
			) : (
				''
			)}

			<h3>Recent Posts</h3>
			{recentPosts.recentBlogPosts.map((post) => {
				return (
					<div>
						<Link to={'/posts/view/' + post._id}>{post.title}</Link>
					</div>
				);
			})}
			<h4>All posts</h4>
			{data.blog.posts.map((post) => {
				return (
					<div>
						<Link to={'/posts/view/' + post._id}>{post.title}</Link>
					</div>
				);
			})}
		</div>
	);
};

export default Blog;
