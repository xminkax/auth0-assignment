import React from 'react';
import Platforms from '../Platforms';
import Header from '../Header';
import Footer from '../Footer';
// import { authorize, logout, isAuthenticated } from '../../login';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const {renewSession} = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {
    const {isAuthenticated} = this.props.auth;
    return (
      <div>
        <Header login={this.login} logout={this.logout} auth={isAuthenticated}/>
        <Platforms/>
        <Footer/>
      </div>
    );
  }
}

export default App;
