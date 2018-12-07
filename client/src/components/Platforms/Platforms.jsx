import React from 'react';
// import debounce from 'lodash.debounce';
import PlatformsList from './PlatformsList';
import Search from '../Search';
import filter from './filter';
import Loading from './Loading';
import Links from './Links';

class Platforms extends React.Component {
  constructor() {
    super();
    this.state = {
      platforms: null,
    };

    this.onSearch = this.onSearch.bind(this);
    // in the case we would have huge list of platforms or getting data from the server debounce would be useful to prevent to call search too often /* eslint-disable max-len */
    // this.filterPlatforms = debounce(this.filterPlatforms.bind(this), 500);
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:4000/platforms');
    response.json().then((platforms) => {
      this.setState({ platforms });
      this.defaultPlatforms = platforms;
    });
  }

  onSearch(e) {
    const searchValue = e.target.value.trim();
    this.filterPlatforms(searchValue);
  }

  filterPlatforms(searchValue) {
    if (!searchValue) {
      this.setState({ platforms: this.defaultPlatforms });
    }

    const filtered = filter(searchValue, this.state.platforms);

    this.setState({ platforms: filtered });
  }

  render() {
    return (
      <div>
        <Search onSearch={this.onSearch} />
        <Links />
        { this.state.platforms === null && <Loading />}
        { this.state.platforms !== null && <PlatformsList platforms={this.state.platforms} /> }
      </div>
    );
  }
}

export default Platforms;
