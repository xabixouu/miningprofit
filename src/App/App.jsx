import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux'
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';

import { Header } from './Header';
import CssBaseline from 'material-ui/CssBaseline';


class App extends React.Component {
	constructor(props) {
		super(props);

		const { dispatch } = this.props;
		history.listen((location, action) => {
			console.log(location, action)
			// clear alert on location change
			dispatch(alertActions.clear());
		});
	}

	render() {
		const { location } = this.props;
		return (
			<div>
				<CssBaseline />
				<div className="container">

					<ConnectedRouter history={history}>
						<div>
							<Header />
							<Switch>
								<Route exact path="/login" component={LoginPage} />
								<PrivateRoute exact path="/" component={HomePage} />
								<Redirect to={{ pathname: '/login', state: { from: location } }} />
							</Switch>
						</div>
					</ConnectedRouter>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { alert } = state;
	return {
		alert
	};
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };