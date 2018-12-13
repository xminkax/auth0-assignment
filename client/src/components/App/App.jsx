import React from 'react';
import PropTypes from 'prop-types';
import { TryBanner, Footer } from '@auth0/styleguide-react-components';
import Platforms from '../Platforms';
import Header from '../Header';
import '../App.css';

class App extends React.Component {
  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {
    const {
      isAuthenticated, getProfile, login, logout,
    } = this.props.auth;
    return (
      <div className="app">
        <Header login={login} logout={logout} isAuth={isAuthenticated()} />
        <Platforms isAuth={isAuthenticated()} login={login} getProfile={getProfile} />
        <TryBanner title="Start your free trial today" button="Use AUTH0 for free" />
        <Footer />
      </div>
    );
  }
}

export default App;

App.propTypes = {
  auth: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
