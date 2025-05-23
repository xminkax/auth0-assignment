import React from 'react';
import PropTypes from 'prop-types';

const Links = ({ onClickFavouritePlatforms, onClickPlatforms }) => (
  <div className="links">
    <h2>
      <button className="platforms" onClick={onClickFavouritePlatforms}>
        My platforms
      </button>
      <span className="separator">|</span>
    </h2>
    <h2>
      <button className="platforms" onClick={onClickPlatforms}>
        All platforms
      </button>
    </h2>
  </div>
);

export default Links;

Links.propTypes = {
  onClickFavouritePlatforms: PropTypes.func.isRequired,
  onClickPlatforms: PropTypes.func.isRequired,
};
