import React from 'react';
import PropTypes from 'prop-types';
import PlatformItem from './PlatformItem';

const PlatformsList = ({ platforms }) => (
  <div className="platforms-list-wrapper">
    {
      !platforms || platforms.length === 0 ?
        <div className="no-records"><h2>No records</h2></div> :
        <ul className="list">
          {
            platforms.map(platform => (
              <PlatformItem
                key={platform.id}
                platform={platform}
              />))
          }
        </ul>
    }
  </div>
);

export default PlatformsList;

PlatformsList.propTypes = {
  platforms: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
