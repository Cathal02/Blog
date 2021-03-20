import React from 'react';
import PostApproval from './PostApproval';
import { useAdminMeQuery } from '../../generated/graphql';
const AdminDashboard = () => {
	const { data, loading } = useAdminMeQuery();

	if (loading) return <h1>Loading</h1>;

	if (data && data.me) {
		if (!data.me.admin) {
			return <h3>You must be an admin to access this page.</h3>;
		}
	}
	return (
		<div>
			<PostApproval />
		</div>
	);
};
export default AdminDashboard;
