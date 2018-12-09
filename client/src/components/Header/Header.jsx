import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ isAuth, login, logout }) => (
  <div>
    <header>
      {
        !isAuth && (
        <button onClick={login}>
          Log In
        </button>)
      }
      {
        isAuth && (
          <button onClick={logout}>
            Log out
          </button>)
      }
    </header>
  </div>
);

export default Header;

Header.propTypes = {
  login: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
  logout: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
  isAuth: PropTypes.bool.isRequired, // eslint-disable-line react/forbid-prop-types
};

