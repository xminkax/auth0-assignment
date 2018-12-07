import React from 'react';
import STYLES from './Header.scss';

const Header = () => (
  <header className={STYLES.header}>
    <div className={STYLES.container}>
      <ul className={STYLES.menu}>
        <li><span>Platform</span></li>
        <li><span>Solutions</span></li>
        <li><span>Why Auth0</span></li>
        <li><span>Developers</span></li>
        <li><span>Pricing</span></li>
        <li><span>Talk To Sales</span></li>
      </ul>
    </div>
  </header>
);

export default Header;
