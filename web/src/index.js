import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, createHttpLink } from '@apollo/client';
import { getAccessToken } from './accessToken';
import { setContext } from '@apollo/client/link/context';
import App from './App';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable } from 'apollo-link';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { setAccessToken } from './accessToken';
import jwtDecode from 'jwt-decode';
const cache = new InMemoryCache({});

const requestLink = new ApolloLink(
	(operation, forward) =>
		new Observable((observer) => {
			let handle;
			Promise.resolve(operation)
				.then((operation) => {
					const token = getAccessToken();
					// return the headers to the context so httpLink can read them
					if (token) {
						operation.setContext({
							headers: {
								authorization: `bearer ${token}`
							}
						});
					}
				})
				.then(() => {
					handle = forward(operation).subscribe({
						next: observer.next.bind(observer),
						error: observer.error.bind(observer),
						complete: observer.complete.bind(observer)
					});
				})
				.catch(observer.error.bind(observer));

			return () => {
				if (handle) handle.unsubscribe();
			};
		})
);

const client = new ApolloClient({
	link: ApolloLink.from([
		new TokenRefreshLink({
			accessTokenField: 'accessToken',
			isTokenValidOrUndefined: () => {
				const token = getAccessToken();

				if (!token) {
					return true;
				}

				try {
					const { exp } = jwtDecode(token);
					if (Date.now() >= exp * 1000) {
						return false;
					} else {
						return true;
					}
				} catch (err) {
					return false;
				}
			},
			fetchAccessToken: () => {
				return fetch('http://localhost:5000/refresh_token', {
					credentials: 'include',
					method: 'POST'
				});
			},
			handleFetch: (accessToken) => {
				setAccessToken(accessToken);
			},
			handleError: (err) => {
				// full control over handling token fetch Error
				console.warn('Your refresh token is invalid. Try to relogin');
				console.log(err);
			}
		}),
		onError(({ graphQLErrors, networkError }) => {
			console.log(graphQLErrors);
			console.log(networkError);
		}),
		requestLink,
		new HttpLink({
			uri: 'http://localhost:5000/graphql',
			credentials: 'include'
		})
	]),
	cache,
	resolvers: {
		Mutation: {
			updateNetworkStatus: (_, { isConnected }, { cache }) => {
				cache.writeData({ data: { isConnected } });
				return null;
			}
		}
	}
});

cache.writeData({
	data: {
		isConnected: true
	}
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
);
