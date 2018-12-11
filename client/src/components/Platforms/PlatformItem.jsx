import React from 'react';
import PropTypes from 'prop-types';

const PlatformItem = ({ platform }) => {
  const { title, imageName } = platform;
  return (
    <li className="platforms-item">
      <div className="wrapper">
        <div className="asset-platform">
          <img className="image" alt={imageName} src={`../../assets/${imageName}.png`} />
        </div>
        <div>
          <span className="title">{title}</span>
        </div>
      </div>
    </li>
  );
};

export default PlatformItem;

PlatformItem.propTypes = {
  platform: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
