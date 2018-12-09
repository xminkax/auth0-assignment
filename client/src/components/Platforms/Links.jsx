import React from 'react';
import PropTypes from 'prop-types';

const Links = ({ onClickFavouritePlatforms, onClickPlatforms }) => (
  <div>
    <span><button onClick={onClickFavouritePlatforms}>My Platforms</button></span>
    <span><button onClick={onClickPlatforms}>All Platforms</button></span>
  </div>
);

export default Links;

Links.propTypes = {
  onClickFavouritePlatforms: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
  onClickPlatforms: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
};
