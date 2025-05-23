import React from 'react';
import PropTypes from 'prop-types';
import PlatformsList from './PlatformsList';
import Search from '../Search';
import filter from './filter';
import Loading from './Loading';
import Links from './Links';
// for prod would be defined config for different environments
const URL = 'http://localhost:4000';

class Platforms extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isAuth !== prevState.isAuth) {
      return { isFavouritePlatformsActive: nextProps.isAuth };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      platforms: null,
      favouritePlatforms: null,
      isFavouritePlatformsActive: false,
      searchValue: '',
    };

    this.loadingStartedFavouritePlatforms = false;

    this.onSearch = this.onSearch.bind(this);
    this.onClickPlatforms = this.onClickPlatforms.bind(this);
    this.onClickFavouritePlatforms = this.onClickFavouritePlatforms.bind(this);
    this.getFavouritePlatforms = this.getFavouritePlatforms.bind(this);
    // I was playing with debounce but this would be more useful
    // if we would have a lot of data or async call to fetch
    // this.filterPlatforms = debounce(this.filterPlatforms.bind(this), 500);
  }

  async componentDidMount() {
    const response = await fetch(`${URL}/platforms`);
    const platforms = await response.json();
    this.setState({ platforms }); // eslint-disable-line react/no-did-mount-set-state
    this.defaultPlatforms = platforms;
  }

  onSearch(e) { // eslint-disable-line react/sort-comp
    const searchValue = e.target.value.trim();
    this.filterPlatforms(searchValue);
  }

  async getFavouritePlatforms(profile) {
    const response = await fetch(`${URL}/favourite-platforms/${profile.sub}`);
    const favouritePlatforms = await response.json();
    this.setState({ favouritePlatforms, isFavouritePlatformsActive: true });
    this.defaultFavouritePlatforms = favouritePlatforms;
  }

  componentDidUpdate() {
    if (
      this.props.isAuth &&
      this.state.favouritePlatforms === null &&
      !this.loadingStartedFavouritePlatforms
    ) {
      this.loadingStartedFavouritePlatforms = true;
      this.props.getProfile(this.getFavouritePlatforms);
    }
  }

  filterPlatforms(searchValue) {
    let defaultStatePlatforms;
    let platforms;

    if (this.state.isFavouritePlatformsActive) {
      defaultStatePlatforms = { favouritePlatforms: this.defaultFavouritePlatforms };
      platforms = this.defaultFavouritePlatforms;
    } else {
      defaultStatePlatforms = { platforms: this.defaultPlatforms };
      platforms = this.defaultPlatforms;
    }

    if (!searchValue) {
      this.setState(Object.assign(defaultStatePlatforms, { searchValue: '' }));
      return;
    }

    const filtered = filter(searchValue, platforms);

    const statePlatforms = this.state.isFavouritePlatformsActive ?
      { favouritePlatforms: filtered } :
      { platforms: filtered };

    this.setState(Object.assign(statePlatforms, { searchValue }));
  }

  onClickFavouritePlatforms() {
    if (this.props.isAuth && !this.state.isFavouritePlatformsActive) {
      let filtered = this.defaultFavouritePlatforms;
      if (this.state.searchValue) {
        filtered = filter(this.state.searchValue, this.defaultFavouritePlatforms);
      }
      this.setState({ isFavouritePlatformsActive: true, favouritePlatforms: filtered });
    } else if (!this.props.isAuth) {
      this.props.login();
    }
  }

  onClickPlatforms() {
    let filtered = this.defaultPlatforms;
    if (this.state.searchValue) {
      filtered = filter(this.state.searchValue, this.defaultPlatforms);
    }

    this.setState({ isFavouritePlatformsActive: false, platforms: filtered });
  }

  render() {
    const platforms = this.props.isAuth && this.state.isFavouritePlatformsActive ?
      this.state.favouritePlatforms :
      this.state.platforms;
    return (
      <div className="platforms">
        <Search onSearch={this.onSearch} />
        <div className="content">
          <Links
            onClickPlatforms={this.onClickPlatforms}
            onClickFavouritePlatforms={this.onClickFavouritePlatforms}
          />
          {platforms === null && <Loading />}
          {platforms !== null && <PlatformsList platforms={platforms} />}
        </div>
      </div>
    );
  }
}

export default Platforms;

Platforms.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
};
