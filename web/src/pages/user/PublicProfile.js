import { useContext, useRef, useEffect, useState } from 'react';
import UserContext from '../../UserContext';
import { useBlogByUserQuery, useFollowingCountQuery, useFollowersCountQuery } from '../../generated/graphql';
import FollowingSection from './FollowingSection';
import { Menu, Segment } from 'semantic-ui-react';
import UserBlogSection from './UserBlogSection';

const Profile = (props) => {
	const [ _id, setId ] = useState('0');
	const [ viewerIsOwner, setViewerIsOwner ] = useState(false);
	const [ activeItem, setActiveItem ] = useState('feed');
	const user = useContext(UserContext);

	const { data, loading, error } = useBlogByUserQuery({
		variables: {
			_id
		}
	});

	useEffect(
		//Handles whether or not we are viewing our own page
		//Or someone elses
		// Handles but routes /profile and /profile/:id
		// to avoid having seperate classes
		() => {
			// If we are logged in
			if (user != null) {
				// This isn't our profile
				if (props.match.params.id == null) {
					setId(user._id);

					setViewerIsOwner(true);
					return;
				}
			}

			// If we are viewing someone else's
			if (props.match.params.id != null) {
				//Check if the profile we're trying to view is our own
				// Check if we're logged in and compare id to profile id
				setId(props.match.params.id);
				if (user != null) {
					setViewerIsOwner(user._id == props.match.params.id);
				}
			}
		},
		[ user ]
	);

	if (loading) return <div>Loading....</div>;
	if (error) return <div>error: {JSON.stringify(error)} </div>;

	const renderSection = () => {
		switch (activeItem) {
			case 'feed':
			default:
				return <h1>Your feed</h1>;
			case 'subscriptions':
				return <FollowingSection />;
			case 'blogs':
				return <UserBlogSection data={data} viewerIsOwner={viewerIsOwner} />;
		}
	};

	const handleItemClick = (e, { name }) => {
		setActiveItem(name);
	};

	return (
		<div>
			{_id == '0' ? (
				<div>You must be logged in to view your profile.</div>
			) : (
				<div>
					<div>
						<Menu pointing secondary>
							<Menu.Item name='feed' active={activeItem === 'feed'} onClick={handleItemClick} />

							<Menu.Item name='blogs' active={activeItem === 'blogs'} onClick={handleItemClick} />
							{viewerIsOwner ? (
								<Menu.Item
									name='subscriptions'
									active={activeItem === 'subscriptions'}
									onClick={handleItemClick}
								/>
							) : (
								''
							)}
						</Menu>

						<Segment>{renderSection()}</Segment>
					</div>
				</div>
			)}
		</div>
	);
};

export default Profile;
