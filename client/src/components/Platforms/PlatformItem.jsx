import React from 'react';
import PropTypes from 'prop-types';

const PlatformItem = ({ platform }) => {
  const { title, imageName } = platform;
  return (
    <div>
      <span>Title: {title}</span>
      <span>Image name: {imageName}</span>
    </div>
  );
};

export default PlatformItem;

PlatformItem.propTypes = {
  platform: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
