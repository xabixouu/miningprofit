import { config } from '../_config';

export const userService = {
	login,
	logout
};

function login(username) {

	const requestOptions = {
		headers: new Headers({
			'Access-Control-Allow-Origin':'*',
			'Content-Type': 'multipart/form-data'
		})
	};
	return fetch(`${config.api.miningpoolhub}&action=getuserstatus&api_key=${username}`, requestOptions)
		.then(response => {

			if (!response.ok) {
				return Promise.reject(`Incorrect API Key`);
			}

			return response.json();
		})
		.then(user => {

			if (user) {
				let userData = user.getuserstatus.data;

				userData.apiKey = username;

				localStorage.setItem('user', JSON.stringify(userData));
				return userData;
			}
			return user;
		})
		.catch(e => {
			return Promise.reject(`Incorrect API Key: ${e}`);
		});
}

function logout() {
	localStorage.removeItem('user');
}