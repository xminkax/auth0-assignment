import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App/index';
import Auth from '../Auth/Auth';
import history from '../history';

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

export const makeMainRoutes = () => (
  <Router history={history}>
    <div>
      <Route
        path="/"
        render={(props) => {
          handleAuthentication(props);
          return <App {...props} auth={auth} />;
        }}
      />
    </div>
  </Router>
);
