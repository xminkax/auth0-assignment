import React from 'react';
import PropTypes from 'prop-types';
import STYLES from './PlatformsItem.scss';

const PlatformItem = ({ platform }) => {
  const { title, imageName } = platform;
  return (
    <div>
      <span>Title: {title}</span>
      <span>
        <img alt={imageName} className={STYLES.img} src={`../../assets/${imageName}.png`} />
      </span>
    </div>
  );
};

export default PlatformItem;

PlatformItem.propTypes = {
  platform: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
