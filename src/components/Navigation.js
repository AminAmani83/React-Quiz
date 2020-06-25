import React from "react";
import { Link } from "react-router-dom";
import ConditionalDisplay from "./ConditionalDisplay";

const Navigation = ({ auth }) => {
  const logIn = (event) => {
    event.preventDefault();
    auth.logIn();
  };

  const logOut = (event) => {
    event.preventDefault();
    auth.logOut();
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark navbar-expand-md justify-content-center">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarToggler"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <ConditionalDisplay isVisible={auth.isLoggedIn()}>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
            </ConditionalDisplay>

            <ConditionalDisplay isVisible={auth.userHasRole("admin")}>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Admin
                </Link>
              </li>
            </ConditionalDisplay>

            <li className="nav-item">
              {auth.isLoggedIn() ? (
                <a className="nav-link" href="/" onClick={logOut}>
                  Log out
                </a>
              ) : (
                <a className="nav-link" href="/" onClick={logIn}>
                  Log in
                </a>
              )}
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
