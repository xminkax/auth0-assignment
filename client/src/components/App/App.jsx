import React from 'react';
import PropTypes from 'prop-types';
import Platforms from '../Platforms';
import Header from '../Header';
import Footer from '../Footer';

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
      <div>
        <Header login={login} logout={logout} isAuth={isAuthenticated()} />
        <Platforms isAuth={isAuthenticated()} login={login} getProfile={getProfile} />
        <Footer />
      </div>
    );
  }
}

export default App;

App.propTypes = {
  auth: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
};
