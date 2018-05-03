import createHistory from 'history/createBrowserHistory'
import { config } from '../_config'

export const history = createHistory({
	basename: config['ghpages-baseurl']
});