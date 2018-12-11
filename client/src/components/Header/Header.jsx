import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ isAuth, login, logout }) => (
  <div>
    <header>
      <div className="wrapper">
        <div><img className="logo" src="../../assets/logo-grey.png" alt="logo" /></div>
        <ul className="menu">
          <li>
            <span>Platform</span>
            <i className="icon-budicon-460 arrow" />
          </li>
          <li>
            <span>Solutions</span>
            <i className="icon-budicon-460 arrow" />
          </li>
          <li>
            <span>Why Auth0</span>
            <i className="icon-budicon-460 arrow" />
          </li>
          <li>
            <span>Developers</span>
            <i className="icon-budicon-460 arrow" />
          </li>
          <li>
            <span>Pricing</span>
          </li>
          <li>
            <button className="btn btn-transparent btn-sm talk-button">Talk to sales</button>
          </li>
        </ul>
        {
          !isAuth && (
            <div className="auth-buttons">
              <button className="signin-button" onClick={login}>Log In</button>
              <button onClick={login} className="btn btn-success btn-sm signup">Sign up</button>
            </div>)
        }
        {
          isAuth && (
            <div className="auth-buttons">
              <button className="logout" onClick={logout}>
                Log out
              </button>
            </div>)
        }
      </div>
    </header>
  </div>
);

export default Header;

Header.propTypes = {
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

