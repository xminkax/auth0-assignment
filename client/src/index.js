/* eslint-disable no-console */
// Disabling 'no-console' as it's reasonable for this file to do some logging.
import ReactDOM from 'react-dom';
import { makeMainRoutes } from './components/routes';

const routes = makeMainRoutes();

ReactDOM.render(
  routes,
  document.getElementById('root')
);
