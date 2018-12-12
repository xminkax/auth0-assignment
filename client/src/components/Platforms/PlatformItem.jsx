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
        <div className="title">{title}</div>
        <div className="detail-title">Authenticate your {title} app</div>
        <div className="connections">
          <a className="btn btn-lg btn-success" href="/authenticate/react/bankid/">Show connections</a>
        </div>
      </div>
    </li>
  );
};

export default PlatformItem;

PlatformItem.propTypes = {
  platform: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
