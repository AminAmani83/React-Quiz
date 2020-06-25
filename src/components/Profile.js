import React, { useState, useEffect } from "react";

const Profile = ({ auth }) => {
  const [userProfile, setUserProfile] = useState([]);

  useEffect(() => {
    auth.getProfile((profile, err) => {
      //   console.log(profile);
      if (err) {
        setUserProfile([""]);
      } else {
        setUserProfile(profile);
      }
    });
  }, [auth]);

  return (
    <>
      <main>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-10 col-lg-8 pt-5 pb-5">
              <div className="row bg-info pt-3 pb-2" id="title-bar">
                <div className="col-12 p-1 pl-4">
                  <h2 className="text-left">
                    <strong>Profile Info</strong>
                  </h2>
                </div>
              </div>

              <div className="row bg-warning pt-2" id="intro">
                <div className="col pt-2 pb-3 text-center">
                  <strong>You can see your profile information below:</strong>
                </div>
              </div>

              <div
                className="row bg-info p-3 pt-4 pb-2 justify-content-center Profile-box"
                id="Profile-box"
              >
                <div className="col pt-2 pb-3 text-left">
                  <p>
                    <img
                      src={userProfile.picture}
                      style={{ maxWidth: 50, maxHeight: 50 }}
                      alt="Profile Icon"
                    />
                  </p>
                  <p>Nickname: {userProfile.nickname}</p>
                  <pre>{JSON.stringify(userProfile, null, 2)}</pre>
                </div>
              </div>

              <div
                className="row bg-warning p-3 justify-content-center"
                id="instructions"
              >
                <div className="col-10">
                  <strong>Note:</strong> These information are only available to
                  users.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
