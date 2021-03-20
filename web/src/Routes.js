import React, { useEffect, useRef } from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './pages/Header';
import CreatePost from './pages/posts/CreatePost.js';
import EditPost from './pages/posts/EditPost.js';
import PostView from './pages/posts/PostView';
import CreateBlog from './pages/blog/CreateBlog';
import AdminDashboard from './pages/admin/AdminDashboard';
import { useMeQuery } from './generated/graphql';
import UserContext from './UserContext';
import { Container } from 'semantic-ui-react';
import Posts from './pages/posts/Posts';
import history from './history';
import Blog from './pages/blog/Blog';
import PublicProfile from './pages/user/PublicProfile';

function Routes() {
	const { data } = useMeQuery();

	useEffect(
		() => {
			console.log(data);
		},
		[ data ]
	);
	return (
		<Router history={history}>
			<Switch>
				<UserContext.Provider value={data ? data.me : null}>
					<Header />

					<Container>
						<Route exact path="/" component={Home} />
						<Route exact path="/home" component={Home} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/profile" component={PublicProfile} />
						<Route exact path="/profile/:id" component={PublicProfile} />
						<Route exact path="/posts" component={Posts} />
						<Route exact path="/blog/create" component={CreateBlog} />
						<Route exact path="/blog/view/:id" component={Blog} />
						<Route exact path="/blog/:id/posts/create" component={CreatePost} />
						<Route exact path="/posts/view/:id" component={PostView} />
						<Route exact path="/posts/edit/:id" component={EditPost} />
						<Route exact path="/admin" component={AdminDashboard} />
					</Container>
				</UserContext.Provider>
			</Switch>
		</Router>
	);
}

export default Routes;
