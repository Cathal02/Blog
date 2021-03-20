import React from 'react';
import {
	useUnapprovedPostsQuery,
	useChangeApprovalStatusMutation,
	UnapprovedPostsDocument
} from '../../generated/graphql';
import { DataStore } from 'apollo-client/data/store';

const PostApproval = () => {
	const { data, loading, error, refetch } = useUnapprovedPostsQuery();
	const [
		changeApprovalStatus,
		{ approvalData, approvalLoading, approvalError }
	] = useChangeApprovalStatusMutation();

	if (loading || approvalLoading) return <h3>Loading...</h3>;
	if (error || approvalError) return <h3>{error}</h3>;
	if (data) console.log(data.posts);

	const handleChangeApproval = async (e, id) => {
		e.preventDefault();
		await changeApprovalStatus({
			variables: { postId: id, approved: true }
		});

		refetch();
	};
	return (
		<div>
			<h1>Post Approval</h1>
			{data.posts.map((x) => {
				return (
					<form name={x._id} key={x._id}>
						<h2>Title: {x.title}</h2>
						<p>Written by: {x.author.name}</p>
						<button onClick={(e) => handleChangeApproval(e, x._id)}>Approve Post</button>
						<br />
					</form>
				);
			})}
		</div>
	);
};

export default PostApproval;
