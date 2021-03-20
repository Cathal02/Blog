import React, { useState } from 'react';
import { useLoginMutation } from '../generated/graphql';
import { setAccessToken, getAccessToken } from '../accessToken';
import { MeDocument } from '../generated/graphql';
const Login = ({ history }) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ login ] = useLoginMutation('');

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				const response = await login({
					variables: {
						email,
						password
					},
					update: (store, { data }) => {
						if (!data) {
							return null;
						}

						store.writeQuery({
							query: MeDocument,
							data: {
								me: data.login.user
							}
						});
					}
				});

				if (response && response.data) {
					setAccessToken(response.data.login.accessToken);
				}

				history.push('/');
			}}
		>
			<div>
				<input value={email} onChange={(e) => setEmail(e.target.value)} />
			</div>
			<div>
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
			</div>
			<div>
				<button type="submit">Login</button>
			</div>
		</form>
	);
};

export default Login;
