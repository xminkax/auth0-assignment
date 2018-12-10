import React from 'react';
import PropTypes from 'prop-types';
import Platforms from '../Platforms';
import Header from '../Header';
import '../Main.css'
import { TryBanner } from '@auth0/styleguide-react-components';
import { Footer } from '@auth0/styleguide-react-components';

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
        <TryBanner title="START YOUR FREE TRIAL TODAY" button="USE AUTH0 FOR FREE"/>
        <Footer />
      </div>
    );
  }
}

export default App;

App.propTypes = {
  auth: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
};
