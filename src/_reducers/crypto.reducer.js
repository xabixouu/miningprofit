import { cryptoConstants } from '../_constants';

const initialState = {
	coins: [],
	loading: true,
	error: false
}

export function crypto(state = initialState, action) {

	switch (action.type){
		case cryptoConstants.LIST_REQUEST:
			return {
				...state,
				loading: true,
				error: false
			}

		case cryptoConstants.LIST_SUCCESS:
			return {
				...state,
				coins: action.coins.slice().sort()
			}

		case cryptoConstants.LIST_FAILURE:
			return {
				...state,
				loading: false,
				error: true,
				coins: []
			}



		case cryptoConstants.ICONS_REQUEST:
			return {
				...state,
				loading: true,
				error: false
			}

		case cryptoConstants.ICONS_SUCCESS:
			return {
				...state,
				coins: action.coins.slice().sort()
			}

		case cryptoConstants.ICONS_FAILURE:
			return {
				...state,
				loading: false,
				error: true,
				coins: []
			}



		case cryptoConstants.PRICES_REQUEST:
			return {
				...state,
				loading: true,
				error: false
			}

		case cryptoConstants.PRICES_SUCCESS:
			return {
				...state,
				loading: false,
				error: false,
				coins: action.coins.slice().sort()
			}

		case cryptoConstants.PRICES_FAILURE:
			return {
				...state,
				loading: false,
				error: true,
				coins: []
			}



		default:
			return state
	}

}