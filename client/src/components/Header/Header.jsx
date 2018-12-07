import React from 'react';
import { authorize, logout } from '../../login';

const Header = () => (
  <header>
    <button onClick={authorize}>
      Log In
    </button>
    <button onClick={logout}>
      Log out
    </button>
  </header>
);

export default Header;
