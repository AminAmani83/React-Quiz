import React from "react";

const About = () => {
  return (
    <>
      <main>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-10 col-lg-8 pt-5 pb-5">
              <div className="row bg-info pt-3 pb-2" id="title-bar">
                <div className="col-12 p-1 pl-4">
                  <h2 className="text-left">
                    <strong>About This Project</strong>
                  </h2>
                </div>
              </div>

              <div className="row bg-warning pt-2" id="intro">
                <div className="col pt-2 pb-3 text-center">
                  <strong>Technologies used:</strong> React, Auth0, PHP API and
                  MySQL
                </div>
              </div>

              <div
                className="row bg-info pt-4 pb-2 justify-content-center category-box"
                id="category-box"
              >
                <div className="col-10 pt-4 pb-3 text-justify">
                  <h4>
                    <strong>About the Experience</strong>
                  </h4>
                  <hr />
                  <p>
                    This is the React implementation of the{" "}
                    <a
                      href="https://www.aminamani.net/assets/demo/php-quiz/about.php"
                      target="_blank"
                      className="text-dark"
                      rel="noopener noreferrer"
                    >
                      PHP Quiz website project
                    </a>
                    .
                  </p>

                  <p>
                    The users can view the Home page, where all the available
                    categories are displayed. When they click on a category to
                    start the quiz, they need to log-in first, using the Auth0
                    authentication system that is implemented inside the React
                    app. Anybody can create a free account, or log-in using
                    their Google credentials.
                  </p>
                  <p>
                    Once logged in, the user will be displayed a certain number
                    of images, and they have to guess the title for that image
                    in a short amount of time. If the answer is correct, the
                    text will become green as a hint before submission. The user
                    can navigate to previous/next image or jump to an image
                    using the thumbnails. Users can click the Give-up button or
                    let the timer run out to end the game, in which case all the
                    correct answers along with the user's score will be
                    displayed, and they will be presented with an option to play
                    again.
                  </p>
                  <p>
                    Once you log in, you can view your profile info, and if you
                    are an administrator, you can see the game server settings
                    as well. For the purpose of this demo, any user with a Gmail
                    account is considered to be an administrator.
                  </p>

                  <h4 className="pt-4">
                    <strong>About the Code</strong>
                  </h4>
                  <hr />
                  <p>
                    A PHP API and a MySQL database are used as the backend. The
                    API supports Authentication tokens provided by Auth0. Any
                    request for the Topics is responded publicly, but the
                    requests for game images or server settings need to carry
                    the appropriate authentication token.
                  </p>
                  <p>
                    React Router is used for routing, and requests to
                    non-existent pages will be redirected to a custom 404 page.
                  </p>
                  <p>
                    Custom hooks are used wherever possible to separate concerns
                    and to make the code more readable.
                  </p>
                  <p>
                    The code has been refactored using useReducer, useCallback,
                    useMemo and useContext. Custom hooks for fetching API calls
                    (useAxios) and the game timer (useInterval) have been
                    implemented from online resources, for optimum performance.
                  </p>
                  <p>
                    A "Loading" message will be displayed while the API request
                    is in process, and in case of any API problems, an error
                    message will be shown.
                  </p>
                  <p>
                    Authentication has been implemented by a third-party service
                    (Auth0). When users decide to start the quiz, if they are
                    not logged-in already, they will be redirected to the Auth0
                    website's login page. Upon logging in, the auth0 website
                    will redirect the user back to the Quiz application with an
                    authentication token in the URL. The app will then save this
                    token and send it together with the future API requests.
                    Furthermore, once the user has logged in, the log in session
                    will stay alive between tabs or after closing and opening a
                    tab.
                  </p>
                </div>
              </div>

              <div
                className="row bg-warning p-3 justify-content-center"
                id="instructions"
              >
                <div className="col-10 text-center">
                  <a
                    href="https://github.com/AminAmani83/React-Quiz"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Check out the code on Github
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;
