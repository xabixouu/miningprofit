import React from 'react';
import { connect } from 'react-redux';

import { cryptoActions } from '../_actions';


import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';
import { LinearProgress } from 'material-ui/Progress';


import CoinTable from './CoinTable';


const styles = theme => ({
	root: {
		padding: theme.spacing.unit * 2,
		flexGrow: 1,
	},
	loading: {
		marginTop: theme.spacing.unit * 10
	}
});


class HomePage extends React.Component {

	componentWillMount() {
		this.props.dispatch(cryptoActions.getCoins());
		this.setState({
			lastUpdate : new Date(),
			currentTime : new Date()
		});

		this.manualRetry = this.manualRetry.bind(this)
	}

	manualRetry() {
		this.setState({
			lastUpdate : new Date()
		});
		this.props.dispatch(cryptoActions.getCoins());
	}

	componentDidMount() {

		setInterval( () => {
			this.setState({
				currentTime : new Date()
			})

			let timeDiff = (this.state.currentTime - this.state.lastUpdate );
			let diffMins = Math.round(((timeDiff % 86400000) % 3600000) / 60000);

			if (diffMins >= 5 && !this.props.crypto.loading){
				this.setState({
					lastUpdate : new Date()
				});
				this.props.dispatch(cryptoActions.getCoins());
			}

		}, 1000);
	}

	render() {

		const { classes, crypto, alert } = this.props;

		const totalEarned = crypto.coins.reduce((a, b) => {
			return (a + b.total_price)
		}, 0)

		return (

			<div className={classes.root}>
				<Grid container spacing={24} alignItems="center" direction="row" justify="center">
					{(crypto && ((crypto.loading && !crypto.error))) &&
						<Grid item xs={12} className={classes.loading}>
							<LinearProgress />
						</Grid>
					}

					{(crypto && !crypto.loading && crypto.error && !crypto.coins.length) &&
						<div>
							<Grid item xs={12} align="center">
								<Grid item xs={12}>
									Oops
								</Grid>
								<Grid item xs={12}>
									An error has occured. Please use the button to retry manually
								</Grid>
								<Grid item xs={12} style={{marginTop:20}}>
									<Button color="default" variant="raised" onClick={this.manualRetry}>
										reload
									</Button>
								</Grid>
							</Grid>

							<Grid item xs={12} align="center" style={{marginTop:20}}>
								<Grid item xs={12}>
									Error log:
								</Grid>
								<Grid item xs={12} style={{marginTop:20}}>
									{alert.message}
								</Grid>
							</Grid>
						</div>
					}

					{(crypto && !crypto.loading && !crypto.error && crypto.coins.length) &&
						<Grid item xs={12}>
							<Grid item xs={12}>
								<Paper className={classes.root}>
									Total mined: $ {totalEarned}
								</Paper>
								<Paper className={classes.root}>
									<span>Last updated: {this.state.lastUpdate.toLocaleString()}</span><br/>
									<span>Now: {this.state.currentTime.toLocaleString()}</span><br/>
								</Paper>
							</Grid>
							<Grid item xs={12}>
								<CoinTable crypto={crypto}/>
							</Grid>
						</Grid>
					}
				</Grid>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { crypto, alert } = state;
	return {
		crypto, alert
	};
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
const finalPage = withRoot(withStyles(styles)(connectedHomePage));

export { finalPage as HomePage };