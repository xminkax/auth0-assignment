import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ onSearch }) => (
  <div className="banner">
    <h1 className="banner__title">How to authenticate</h1>
    <h2>Authenticate your users with any Identity Provider</h2>
    <div className="search-container">
        <input
          className="search"
          placeholder="Search technologies"
          onKeyUp={onSearch}
          type="text"
        />
    </div>
  </div>
);

export default Search;

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
