import React from 'react';
import PlatformsList from './PlatformsList';

class Platforms extends React.Component {
  constructor() {
    super();
    this.state = {
      platforms: null,
    };
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:4000/platforms');
    response.json().then((platforms) => {
      this.setState({ platforms });
    });
  }

  render() {
    console.log(this.state.platforms);
    return (
      <div>
        <span><a href="todo">My Platforms</a></span>
        <span><a href="todo">All Platforms</a></span>
        { this.state.platforms === null && <div>Loading ...</div>}
        { this.state.platforms !== null && <PlatformsList platforms={this.state.platforms} /> }
      </div>
    );
  }
}

export default Platforms;
