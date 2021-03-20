import React, { useState } from 'react';
import { useRegisterMutation } from '../generated/graphql';

const Register = ({ history }) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ feedback, setFeedback ] = useState('');
	const [ register, { data, loading, error } ] = useRegisterMutation({
		variables: {
			email, // value for 'email'
			password // value for 'password'
		}
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('Clicked');

		if (password !== ' ' && email !== '') {
			await register();
			if (error) {
				console.log('Error:' + error);
				setFeedback('Something went wrong, please try again');
				return;
			}

			if (data && !data.registerUser.success) {
				setFeedback(data.registerUser.message);
				return;
			}

			setFeedback('Success');
		}
	};

	return (
		<div>
			<h3>{feedback}</h3>

			<form>
				<div>
					<input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div>
					<input
						placeholder="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div>
					<button onClick={handleSubmit} type="submit">
						Register
					</button>
				</div>
			</form>
		</div>
	);
};

export default Register;
