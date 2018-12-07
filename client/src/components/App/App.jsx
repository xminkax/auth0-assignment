import React from 'react';
import Platforms from '../Platforms';
import Header from '../Header';
import Footer from '../Footer';
import auth0 from 'auth0-js';

var webAuth = new auth0.WebAuth({
  domain: "minka.eu.auth0.com",
  clientID: "fy28an-jAzG1mrLQCAK_F7mabpuCqa4x",
  redirectUri: "http://localhost:3000",
  responseType: 'token id_token',
  scope: 'openid',
  leeway: 60
});

const setSession = (authResult) => {
  // Set the time that the access token will expire at
  var expiresAt = JSON.stringify(
    authResult.expiresIn * 1000 + new Date().getTime()
  );
  localStorage.setItem('access_token', authResult.accessToken);
  localStorage.setItem('id_token', authResult.idToken);
  localStorage.setItem('expires_at', expiresAt);
}

const isAuthenticated = () => {
  // Check whether the current time is past the
  // access token's expiry time
  const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  return new Date().getTime() < expiresAt;
}

const logout= () => {
  // Remove tokens and expiry time from localStorage
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
  // displayButtons();
  if (isAuthenticated()) {
    console.log('auth');
  } else {
    console.log('nope');
  }
};

const handleAuthentication = () => {
  webAuth.parseHash((err, authResult) => {
    if (authResult && authResult.accessToken && authResult.idToken) {
      window.location.hash = '';
      setSession(authResult);
      // loginBtn.style.display = 'none';
      // homeView.style.display = 'inline-block';
    } else if (err) {
      // homeView.style.display = 'inline-block';
      console.log(err);
      alert(
        'Error: ' + err.error + '. Check the console for further details.'
      );
    }
    // displayButtons();
    if (isAuthenticated()) {
      console.log('auth');
    } else {
      console.log('nope');
    }
  });
}

handleAuthentication();

const authorize = () => {
  webAuth.authorize();
};

const App = () => (
  <div>
    <Header />
    <button onClick={authorize}>
      Log In
    </button>
    <button onClick={logout}>
      Log out
    </button>

    <Platforms />
    <Footer />
  </div>
);

export default App;
