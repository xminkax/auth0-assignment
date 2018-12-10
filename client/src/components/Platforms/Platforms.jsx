import React from 'react';
import PropTypes from 'prop-types';
import PlatformsList from './PlatformsList';
import Search from '../Search';
import filter from './filter';
import Loading from './Loading';
import Links from './Links';

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

    this.onSearch = this.onSearch.bind(this);
    this.onClickPlatforms = this.onClickPlatforms.bind(this);
    this.onClickFavouritePlatforms = this.onClickFavouritePlatforms.bind(this);
    this.getFavouritePlatforms = this.getFavouritePlatforms.bind(this);
    // this.filterPlatforms = debounce(this.filterPlatforms.bind(this), 500);
  }

  componentDidMount() {
    fetch('http://localhost:4000/platforms')
      .then(response => response.json())
      .then((platforms) => {
        this.setState({ platforms });
        this.defaultPlatforms = platforms;
      });
  }

  onSearch(e) {
    const searchValue = e.target.value.trim();
    this.filterPlatforms(searchValue);
  }

  getFavouritePlatforms(profile) {
    fetch(`http://localhost:4000/favourite-platforms/${profile.sub}`)
      .then(response => response.json())
      .then((favouritePlatforms) => {
        this.setState({ favouritePlatforms, isFavouritePlatformsActive: true });
        this.defaultFavouritePlatforms = favouritePlatforms;
      });
  }

  componentDidUpdate() {
    if (this.props.isAuth && this.state.favouritePlatforms === null) {
      this.props.getProfile(this.getFavouritePlatforms);
    }
  }

  filterPlatforms(searchValue) {
    const defaultStatePlatforms = this.state.isFavouritePlatformsActive ?
      { favouritePlatforms: this.defaultFavouritePlatforms } :
      { platforms: this.defaultPlatforms };

    if (!searchValue) {
      this.setState(Object.assign(defaultStatePlatforms, { searchValue: '' }));
      return;
    }

    const platforms = this.state.isFavouritePlatformsActive ?
      this.state.favouritePlatforms :
      this.state.platforms;

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
        <div className="platforms-content">
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
  isAuth: PropTypes.bool.isRequired, // eslint-disable-line react/forbid-prop-types
  login: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
  getProfile: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
};
