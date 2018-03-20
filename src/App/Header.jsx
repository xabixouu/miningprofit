import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userActions } from '../_actions';
import { history } from '../_helpers';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import * as colors from 'material-ui/colors';

const styles = {
	root: {
		flexGrow: 1,
	},
	navbar:{
		backgroundColor: colors.grey['900'],
		padding: 10
	}
};

class Header extends React.Component {

	constructor(props) {
		super(props);
		this.handleLogout = this.handleLogout.bind(this);
	}


	handleLogout(e) {
		e.preventDefault();

		const { dispatch } = this.props;

		dispatch(userActions.logout());
		history.push('/login')
	}

	render() {

		const { classes, user } = this.props;

		return (
			<div className={classes.root}>
				<AppBar position="static" style={styles.navbar}>
					<Toolbar>

						<Grid
							container
							alignItems='center'
							direction='column'
							justify='center'
						>

							<Typography variant="display1" gutterBottom color="inherit">
								Mining Profit
							</Typography>

							<Typography variant="title" gutterBottom color="inherit">
								From MiningPoolHub API
							</Typography>

							{user && user.username &&
								<div align="center">
									<Typography variant="subheading" gutterBottom color="inherit">
										Welcome back {user.username}
									</Typography>

									<Button color="default" variant="raised" onClick={this.handleLogout}>
										Log out
									</Button>
								</div>
							}

						</Grid>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
	const { user } = state.authentication;
	return {
		user
	};
}

const connectedHeader = connect(mapStateToProps)(Header);
// export { connectedHeader as Header };
const finalPage = withStyles(styles)(connectedHeader);

export { finalPage as Header };
