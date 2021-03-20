import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import BlogCard from '../blog/BlogCard';
import { Grid, Image } from 'semantic-ui-react';

const renderGrid = (blogs) => {};
const UserBlogSection = ({ data, viewerIsOwner }) => {
	return (
		<div>
			<div />
			<h1 style={{ display: 'inline', margin: '10px' }}>{viewerIsOwner ? 'Your Blogs' : 'Somone elses'}</h1>{' '}
			{viewerIsOwner ? (
				<Button positive as={Link} to={'/blog/create'} style={{ margin: '10px' }}>
					New Blog
				</Button>
			) : (
				''
			)}
			<Grid columns='three' divided>
				<Grid.Row>
					{data.blogByUser.map((blog) => {
						return (
							<Grid.Column style={{ marginBottom: '15px' }} key={blog._id}>
								<BlogCard blog={blog} />
							</Grid.Column>
						);
					})}
				</Grid.Row>
			</Grid>
		</div>
	);
};

export default UserBlogSection;
