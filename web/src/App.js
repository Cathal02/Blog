import React, { useState, useEffect } from 'react';
import Routes from './Routes';
import { setAccessToken } from './accessToken';
import 'semantic-ui-css/semantic.min.css';
const App = () => {
	const [ loading, setLoading ] = useState(true);

	useEffect(() => {
		fetch('http://localhost:5000/refresh_token', { credentials: 'include', method: 'POST' })
			.then((res) => {
				res.json().then((data) => {
					setAccessToken(data.accessToken);
					setLoading(false);
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	if (loading) {
		return <div>loading...</div>;
	}

	return <Routes />;
};

export default App;
