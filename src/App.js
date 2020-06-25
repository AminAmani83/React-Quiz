import React, { useState, createContext, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Game from "./components/Game";
import Admin from "./components/Admin";
import Auth from "./components/Auth/Auth";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Callback from "./components/Callback";
import Categories from "./components/Categories";
import Profile from "./components/Profile";
import PageNotFound from "./components/PageNotFound";
import About from "./components/About";

export const ConfigContext = createContext();

// Config Vars
const gameConfig = {
  settings: {
    numberOfQuestions: 6,
    secondsPerQuestion: 10,
    placeHolderImage: "./img/question-placeholder.jpg",
  },
  messages: {
    win: "You Won!",
    timeOut: "Time Out",
    gameOver: "Game over", // = give up message
  },
  userInputTextClasses: {
    default: "text-dark", // used when game is active
    correct: "text-success", // used when game is active or over
    wrong: "text-danger", // used when the game is over
  },
  paginatorImageClasses: {
    default: "bg-dark",
    correct: "bg-success",
    wrong: "bg-danger",
  },
};

function App(props) {
  // props includes history, bcs App is wrapped with Routher in index.js
  const [gameKey, setGameKey] = useState(1); // used to start a new game
  const [auth] = useState(new Auth(props.history));
  const [tokenRenewalCompleted, setTokenRenewalCompleted] = useState(false);

  useEffect(() => {
    // For session consistency between tabs
    if (localStorage.getItem("session_alive")) {
      // user is logged in and opens a new tab
      auth.renewToken(() => {
        setTokenRenewalCompleted(true);
      });
    } else {
      setTokenRenewalCompleted(true);
    }
  }, [auth]);

  if (!tokenRenewalCompleted) {
    return "Loading...";
  }

  return (
    <>
      <ConfigContext.Provider value={gameConfig}>
        <Header />
        <Navigation auth={auth} />

        <Switch>
          <Route exact path="/" render={(props) => <Categories {...props} />} />

          <Route
            path="/callback"
            render={(props) => <Callback auth={auth} {...props} />}
          />

          {/* Not used in the Navbar, but required by Auth0 as a route */}
          <Route
            path="/login"
            render={() => {
              return auth.logIn();
            }}
          />

          <Route
            exact
            path="/game"
            render={(props) => {
              if (!auth.isLoggedIn()) {
                return auth.logIn();
              }
              if (!props.location.topicId || !props.location.topic) {
                return <Redirect to="/" />;
              } // If topicId or topic is not provided in URL query/state
              return (
                <Game
                  key={gameKey}
                  newGame={() => setGameKey((gameKey) => gameKey + 1)}
                  auth={auth}
                  {...props}
                />
              );
            }}
          />

          {/* Only for users with an 'admin' role */}
          <Route
            path="/admin"
            render={(props) => {
              if (!auth.isLoggedIn()) {
                return auth.logIn();
              }
              return <Admin auth={auth} {...props} />;
            }}
          />

          {/* Only for logged in users */}
          <Route
            path="/profile"
            render={(props) => {
              if (!auth.isLoggedIn()) {
                return auth.logIn();
              }
              return <Profile auth={auth} {...props} />;
            }}
          />

          <Route path="/about" component={About} />

          <Route component={PageNotFound} />
        </Switch>

        <Footer />
      </ConfigContext.Provider>
    </>
  );
}

export default App;
