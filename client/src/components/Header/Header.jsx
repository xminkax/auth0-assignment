import React from 'react';

const Header = ({auth, login, logout}) => (
  <div>
    <header>
      {
        !auth() && (
        <button onClick={login}>
          Log In
        </button>)
      }
      {
        auth() && (
          <button onClick={logout}>
            Log out
          </button>)
      }
    </header>
  </div>
);

export default Header;
