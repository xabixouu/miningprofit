import { cryptoConstants } from '../_constants';
import { cryptoService } from '../_services';
import { alertActions } from '../_actions';

export const cryptoActions = {
	getCoins,
	getIcons,
	getPrices
};




function getPrices() {
	return dispatch => {
		dispatch(request())
		cryptoService.getPrices()
			.then(
				coins => {
					dispatch(success(coins))
				},
				error => {
					dispatch(failure(error))
                    dispatch(alertActions.error(error));
				}
			)
	}


	function request() {
		return {
			type: cryptoConstants.PRICES_REQUEST
		}
	}
	function success(coins) {
		return {
			type: cryptoConstants.PRICES_SUCCESS,
			coins
		}
	}
	function failure(error) {
		return {
			type: cryptoConstants.PRICES_FAILURE,
			error
		}
	}
}


function getIcons() {
	return dispatch => {
		dispatch(request())
		cryptoService.getIcons()
			.then(
				coins => {
					dispatch(success(coins))
					dispatch(getPrices());
				},
				error => {
					dispatch(failure(error))
                    dispatch(alertActions.error(error));
				}
			)
	}


	function request() {
		return {
			type: cryptoConstants.ICONS_REQUEST
		}
	}
	function success(coins) {
		return {
			type: cryptoConstants.ICONS_SUCCESS,
			coins
		}
	}
	function failure(error) {
		return {
			type: cryptoConstants.ICONS_FAILURE,
			error
		}
	}
}

function getCoins() {
	return dispatch => {
		dispatch(request());

		cryptoService.getCoins()
			.then(
				coins => {
					dispatch(success(coins));
					dispatch(getIcons());
				},
				error => {
					dispatch(failure(error));
                    dispatch(alertActions.error(error));
				}
			)
	};

	function request() {
		return {
			type: cryptoConstants.LIST_REQUEST
		}
	}
	function success(coins) {
		return {
			type: cryptoConstants.LIST_SUCCESS,
			coins
		}
	}
	function failure(error) {
		return {
			type: cryptoConstants.LIST_FAILURE,
			error
		}
	}
}