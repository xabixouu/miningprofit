import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { crypto } from './crypto.reducer';

const rootReducer = combineReducers({
	authentication,
	alert,
	crypto,
	router: routerReducer
});

export default rootReducer;