import { config } from '../_config';
import { store } from '../_helpers';

export const cryptoService = {
	getCoins,
	getIcons,
	getPrices
};


function getCoins() {

	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
	};

	const user = JSON.parse(localStorage.getItem('user'));
	return fetch(`${config.api.miningpoolhub}&action=getuserallbalances&api_key=${user.apiKey}`, requestOptions)
		.then(response => {

			if (!response.ok) {
				return Promise.reject(`Could not fetch coins: Invalid HTTP Response`);
			}

			return response.json();
		})
		.then(coins => {

			if (coins) {

				let data = coins.getuserallbalances.data;

				data.map((item) => {
					item.symbol			= config.coins[item.coin]
					item.total_coins	= item.confirmed + item.unconfirmed
					return item
				}).join();

				return data;
			}
			return coins;
		})
		.catch(e => {
			return Promise.reject(`Could not fetch coins`);
		});
}

function getIcons() {

	const requestOptions = {
		mode: 'cors',
		headers: new Headers({
			'Content-Type': 'application/json',
			Accept: 'application/json'
		})
	};

	return fetch(config.api.icons, requestOptions)
		.then(response => {

			if (!response.ok) {
				return Promise.reject(`Could not fetch icons: Invalid HTTP Response`);
			}

			return response.json();
		})
		.then(icons => {

			if (icons.Response === "Error"){
				return Promise.reject(`${icons.ErrorsSummary}`);
			}

			let coins = store.getState().crypto.coins;

			if (icons && icons.Response === "Success") {
				var newSet = coins.map((coin) => {
					if (icons.Data[coin.symbol] !== undefined){
						coin.icon	= icons.BaseImageUrl + icons.Data[coin.symbol].ImageUrl;
						coin.id		= icons.Data[coin.symbol].Id;
					}
					return coin;
				})
				return newSet;
			}
			return icons;
		})
		.catch(e => {
			return Promise.reject(`Could not fetch icons: ${e}`);
		});
}

function getPrices() {

	let coins = store.getState().crypto.coins;
	let syms = coins.map((item) => {
		return item.symbol
	}).join();

	const requestOptions = {
		mode: 'cors',
		headers: new Headers({
			'Content-Type': 'application/json',
			Accept: 'application/json'
		})
	};

	return fetch(config.api.price + syms, requestOptions)
		.then(response => {

			if (!response.ok) {
				return Promise.reject(`Could not fetch prices: Invalid HTTP Response`);
			}

			return response.json();
		})
		.then(prices => {

			if (prices.Response === "Error"){
				return Promise.reject(`${prices.ErrorsSummary}`);
			}


			if (prices) {
				var newSet = coins.map((coin) => {
					if (prices[coin.symbol] !== undefined){
						coin.unit_price		= prices[coin.symbol].USD;
						coin.total_price	= (coin.total_coins * coin.unit_price)
					}
					return coin;
				})
				return newSet;
			}
			return prices;
		})
		.catch(e => {
			return Promise.reject(`Could not fetch prices: ${e}`);
		});
}