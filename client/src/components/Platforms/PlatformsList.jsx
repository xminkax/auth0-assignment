import React from 'react';
import PropTypes from 'prop-types';
import PlatformItem from './PlatformItem';

const PlatformsList = ({platforms}) => (
  <div className="platforms-list-container">
    {
      !platforms || platforms.length === 0 ?
        <div className="no-records"><h2>No records</h2></div> :
        <ul className="platforms-list">
          {
            platforms.map(platform => (
            <PlatformItem
              platform={platform}
            />))
          }
        </ul>
    }
  </div>
);

export default PlatformsList;

PlatformsList.propTypes = {
  platforms: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
