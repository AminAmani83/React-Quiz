import auth0 from "auth0-js";

// private variables stored outside class (private starts with _)
// eslint-disable-next-line
let _idToken = null;
let _accessToken = null;
let _scopes = null;
let _expiresAt = null;
let _role = null;

class Auth {
  // TODO: Convert to a functional component
  constructor(history) {
    this.history = history;
    this.userProfile = null;
    this.requestedScopes = "openid profile email";
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENTID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      responseType: "token id_token",
      scope: this.requestedScopes,
    });
  }

  /**
   * Log In using the Auth0 dialog
   * Saves the page URL where the login request was made, to return to the same page after login
   */
  logIn = () => {
    localStorage.setItem(
      "redirect_on_login",
      JSON.stringify(this.history.location)
    );
    this.auth0.authorize();
  };

  /**
   * When returning from the Login dialog, this method is called from the callback page,
   * to check for errors and parse the access_token data from URL
   */
  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      // parsing the URL
      const redirectUrl =
        localStorage.getItem("redirect_on_login") === "undefined"
          ? "/"
          : JSON.parse(localStorage.getItem("redirect_on_login"));
      if (authResult && authResult.accessToken && authResult.idToken) {
        // console.log(authResult.accessToken);
        // debugger;
        this.setSession(authResult);
        this.history.push(redirectUrl);
      } else if (err) {
        this.history.push(redirectUrl);
        alert(`Error: ${err.error}, please check the console for more info.`);
        console.log(err);
      }
      localStorage.removeItem("redirect_on_login");
    });
  };

  /**
   * Save the above parsed information in the memory
   * Call a function to renew the token before it expires
   */
  setSession = (authResult) => {
    _expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    _scopes = authResult.scopes || this.requestedScopes || "";
    _role = authResult.idTokenPayload["http://localhost:3000/roles"];
    _accessToken = authResult.accessToken;
    _idToken = authResult.idToken;
    this.scheduleTokenRenewal();
    localStorage.setItem("session_alive", "true"); // for performance tweak: used in app.js
  };

  /**
   * Check if the user session is still not expired
   * returns boolean
   */
  isLoggedIn = () => {
    return new Date().getTime() < _expiresAt;
  };

  /**
   * Send the logout request to Auth0
   */
  logOut = () => {
    localStorage.removeItem("session_alive");
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENTID,
      returnTo: process.env.REACT_APP_AUTH0_LOGOUT_URL,
    });
  };

  /**
   * Get the saved access token from memory
   */
  getAccessToken = () => {
    if (!_accessToken) {
      throw new Error("No access token found.");
    }
    return _accessToken;
  };

  /**
   * Get the user profile information from Auth0 the first time, and load it from memory after that
   */
  getProfile = (cb) => {
    // cb : callback function
    if (this.userProfile) return cb(this.userProfile);
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      // only runs the first time
      if (profile) this.userProfile = profile;
      cb(profile, err);
    });
  };

  /**
   * Check if the user has the requested scope or not
   * Checks whether the scopes argument (array of strings) are all included in the granted scopes
   */
  userHasScopes = (scopes) => {
    const grantedScopes = (_scopes || "").split(" ");
    return scopes.every((scope) => grantedScopes.includes(scope)); // check if all values are in grantedScopes
  };

  /**
   * Checks if the user has the requested role (arg: string)
   */
  userHasRole = (role) => {
    return Array.isArray(_role) && _role.includes(role);
  };

  /**
   * Keeps the log in session alive between Tabs or after closing and opening a tab
   */
  renewToken = (cb) => {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        console.log(`Error: ${err.error} - ${err.error_description}`);
      } else {
        this.setSession(result);
      }
      if (cb) {
        cb(err, result);
      }
    });
  };

  /**
   * When the token expires, it requests a new one
   */
  scheduleTokenRenewal = () => {
    const delay = _expiresAt - Date.now();
    if (delay > 0) {
      setTimeout(() => {
        this.renewToken();
      }, delay);
    }
  };
}

export default Auth;
