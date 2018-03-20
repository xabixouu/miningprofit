import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { crypto } from './crypto.reducer';

const rootReducer = combineReducers({
  authentication,
  alert,
  crypto
});

export default rootReducer;