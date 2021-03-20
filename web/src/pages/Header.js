import React, { Component, useState, useContext, useEffect } from 'react';
import { Menu } from 'semantic-ui-react';

import { useMeQuery } from '../generated/graphql';
import { Link } from 'react-router-dom';
import { useLogoutMutation } from '../generated/graphql';
import { Container, Button, Icon } from 'semantic-ui-react';
import UserContext from '../UserContext';
import history from '../history';
import { setAccessToken } from '../accessToken';

const Header = (props) => {
	const [ logout, { client } ] = useLogoutMutation();
	const [ activeItem, setActiveItem ] = useState('browse');
	const user = useContext(UserContext);

	const handleLogout = async () => {
		await logout();
		setAccessToken('');
		client.resetStore();
	};
	return (
		<Menu secondary borderless>
			<Container>
				<Menu.Item
					as={Link}
					to="/"
					name="browse"
					active={activeItem === 'browse'}
					onClick={() => setActiveItem('browse')}
				>
					<Icon size="large" name="home" />
					Home
				</Menu.Item>

				<Menu.Item
					as={Link}
					to="/posts"
					name="submit"
					active={activeItem === 'submit'}
					onClick={() => setActiveItem('submit')}
				>
					<Icon size="large" name="pencil" />
					Blog
				</Menu.Item>
				<Menu.Item name="submit" active={activeItem === 'aboutMe'} onClick={() => setActiveItem('aboutMe')}>
					<Icon size="large" name="question" />
					About me!
				</Menu.Item>

				{!!!user ? (
					<Menu.Menu position="right">
						<Menu.Item>
							<Button positive as={Link} to="/register">
								Sign up
							</Button>
						</Menu.Item>

						<Menu.Item>
							<Button as={Link} to="/login">
								Log-in
							</Button>
						</Menu.Item>
					</Menu.Menu>
				) : (
					<Menu.Menu position="right">
						<Menu.Item link onClick={() => history.push('/profile')}>
							<Icon size="large" name="user" />
							Profile
						</Menu.Item>
						<Menu.Item link onClick={handleLogout}>
							<Icon size="large" name="close" />
							Logout
						</Menu.Item>
					</Menu.Menu>
				)}
			</Container>
		</Menu>
	);
};

export default Header;
