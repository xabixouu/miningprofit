import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import red from 'material-ui/colors/red';

import { userActions } from '../_actions';
import { userConstants } from '../_constants';
import { history } from '../_helpers';



const styles = theme => ({
	root: {
		flexGrow: 1,
		marginTop: 10,
		padding: theme.spacing.unit * 2,
	},
	paper: {
		padding: theme.spacing.unit * 2,
		height: '100%',
		paddingTop: 10,
		paddingBottom: 10
	},
	alertPaper: {
		backgroundColor: red[200],
		padding: 20
	}
});

class LoginPage extends React.Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount(){
		const { loggedIn, user, dispatch } = this.props

		if (loggedIn){
			this.setState({
				username: user.username,
				submitted: true
			})

			dispatch({
				type: userConstants.LOGIN_SUCCESS,
				user
			})

            history.push('/')
		}
		else{
			// reset login status
			dispatch(userActions.logout())

			this.setState({
				username: '',
				submitted: false
			})
		}
	}

	handleChange(e) {
        const { name, value } = e.target;
		this.setState({
			[name]: value,
			submitted: false
		});
	};

	handleSubmit(e) {
		e.preventDefault();

		this.setState({ submitted: true });
		const { username } = this.state;
		const { dispatch } = this.props;
		if (username) {
			dispatch(userActions.login(username));
		}
	}

	render() {
		const { loggingIn, classes, alert } = this.props;
		const { username, submitted } = this.state;

		return (
			<Grid container
				className={classes.root}
				alignItems={"center"}
				direction={"row"}
				justify={"center"}>

				<Grid item xs={12} md={8} xl={4} lg={6}>
					<Paper className={classes.paper}>

						<Grid
							container
							alignItems={"center"}
							direction={"row"}
							justify={"center"}
						>
							<Grid item xs={12} align="center">
								<Typography variant="title" gutterBottom color="inherit">
									Login to see your stats
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									id="full-width"
									name="username"
									label="Your MiningPoolHub API key here"
									fullWidth
									margin="normal"
									value={username}
									onChange={this.handleChange}
									error={submitted && !username}
								/>
							</Grid>
							<Grid item xs={12} align="center">
								<Button
									variant="raised"
									color="primary"
									onClick={this.handleSubmit}
									disabled={loggingIn}>
									Login
								</Button>
							</Grid>

							{alert && alert.message &&

								<Grid item xs={12} align="center">
									<Paper className={classes.alertPaper}>
										{alert.message}
									</Paper>
								</Grid>
							}
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		);
	}
}

LoginPage.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
	const { loggingIn, loggedIn, user } = state.authentication;
	const alert = state.alert;
	return {
		loggingIn,
		alert,
		loggedIn, user,
    	currentURL: ownProps.location.pathname
	};
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
// export { connectedLoginPage as LoginPage };
const finalPage = withRoot(withStyles(styles)(connectedLoginPage));

export { finalPage as LoginPage };

