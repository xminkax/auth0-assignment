import React from 'react';
import PropTypes from 'prop-types';
import PlatformItem from './PlatformItem';

const PlatformsList = ({ platforms }) => (
  <div>
    {
        platforms && platforms.length > 0 &&
        platforms.map(
          platform => (
            <PlatformItem
              platform={platform}
            />),
        )
      }
  </div>
);

export default PlatformsList;

PlatformsList.propTypes = {
  platforms: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
