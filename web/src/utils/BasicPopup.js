import React, { Component } from 'react';
import { Button, Header, Segment, TransitionablePortal } from 'semantic-ui-react';

export default class TransitionablePortalExampleControlled extends Component {
	state = { open: true };

	handleClick = () => this.setState((prevState) => ({ open: !prevState.open }));
	handleClose = () => this.setState({ open: false });

	render() {
		const { open } = this.state;

		return (
			<div>
				<Button
					content={open ? 'Close Portal' : 'Open Portal'}
					negative={open}
					positive={!open}
					onClick={this.handleClick}
				/>

				<TransitionablePortal onClose={this.handleClose} open={open}>
					<Segment style={{ left: '40%', position: 'fixed', top: '50%', zIndex: 1000 }}>
						<Header>{this.props.title}</Header>
						{this.props.children}
					</Segment>
				</TransitionablePortal>
			</div>
		);
	}
}
