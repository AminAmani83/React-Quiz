import React from "react";
import useAxiosFetch from "./useAxiosFetch";
import ConditionalDisplay from "./ConditionalDisplay";

const Admin = ({ auth }) => {
  // Fetching Data from API
  const url = process.env.REACT_APP_API_URL + "/private/game-settings";
  const accessToken = auth.getAccessToken();
  const {
    data: message,
    isLoading,
    fetchError,
    fetchErrorMessage,
  } = useAxiosFetch(url, [], accessToken);
  // console.log(accessToken);

  return (
    <>
      <main>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-10 col-lg-8 pt-5 pb-5">
              <div className="row bg-info pt-3 pb-2" id="title-bar">
                <div className="col-12 p-1 pl-4">
                  <h2 className="text-left">
                    <strong>Admin Panel</strong>
                  </h2>
                </div>
              </div>

              <div className="row bg-warning pt-2" id="intro">
                <div className="col pt-2 pb-3 text-center">
                  <strong>Please View The Secret Information Below:</strong>
                </div>
              </div>

              <div
                className="row bg-info pt-4 pb-2 justify-content-center category-box"
                id="category-box"
              >
                <ConditionalDisplay isVisible={isLoading}>
                  Loading...
                </ConditionalDisplay>

                <ConditionalDisplay isVisible={fetchError}>
                  API Error:
                  <br />
                  {fetchErrorMessage}
                </ConditionalDisplay>

                <ConditionalDisplay isVisible={!fetchError && !isLoading}>
                  <div className="col pt-2 pb-3 text-left">
                    <ul>
                      {message.map((item) => (
                        <li key={item.id}>
                          {item.setting_key} : {item.setting_value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ConditionalDisplay>
              </div>

              <div
                className="row bg-warning p-3 justify-content-center"
                id="instructions"
              >
                <div className="col-10">
                  <strong>Note:</strong> These information are only available to
                  Administrators (Users who have their role set as "admin").
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Admin;
