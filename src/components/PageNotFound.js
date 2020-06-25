import React from "react";

const PageNotFound = () => {
  return (
    <>
      <main>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-10 col-lg-8 pt-5 pb-5">
              <div className="row bg-info pt-3 pb-2" id="title-bar">
                <div className="col-12 p-1 pl-4">
                  <h2 className="text-left">
                    <strong>404 - Page Not Found</strong>
                  </h2>
                </div>
              </div>

              <div className="row bg-warning pt-2" id="intro">
                <div className="col pt-2 pb-3 text-center">
                  <strong>The page you are looking for, does not exist.</strong>
                </div>
              </div>

              <div
                className="row bg-info pt-4 pb-2 justify-content-center category-box"
                id="category-box"
              >
                Please check the URL, or use the navigation menu above to get
                back to the main page.
              </div>

              <div
                className="row bg-warning p-3 justify-content-center"
                id="instructions"
              >
                <div className="col-10">
                  <strong>Error:</strong> 404 - Page Not Found.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PageNotFound;
