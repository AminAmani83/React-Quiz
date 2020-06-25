import React, { useEffect } from "react";

const Callback = (props) => {
  // Processing information sent by Auth0 from the URL
  useEffect(() => {
    // console.log(props.location.hash);
    if (/id_token|access_token|error/.test(props.location.hash)) {
      props.auth.handleAuthentication();
    } else {
      throw new Error("Invalid Callback URL.");
    }
  }, [props.auth, props.location.hash]);

  return (
    <>
      <h1>Loading...</h1>
    </>
  );
};

export default Callback;
