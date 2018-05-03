import { createStore, applyMiddleware } from 'redux';

import { history } from './history'

import { routerMiddleware } from 'react-router-redux'

import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from '../_reducers';

const loggerMiddleware = createLogger();

// Build the middleware for intercepting and dispatching navigation actions
const rMiddleware = routerMiddleware(history)

export const store = createStore(
	reducers,
	applyMiddleware(
		rMiddleware,
		thunkMiddleware,
		loggerMiddleware
	)
)
