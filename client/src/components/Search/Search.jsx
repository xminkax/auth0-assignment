import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ onSearch }) => (
  <div>
    <input
      className="form-control"
      placeholder="Search technologies"
      onKeyUp={onSearch}
      type="text"
    />
  </div>
);

export default Search;

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
