import React from "react";
import CategoryItem from "./CategoryItem";
import useAxiosFetch from "./useAxiosFetch";
import ConditionalDisplay from "./ConditionalDisplay";

const Categories = () => {
  // Fetching Data from API
  const url = process.env.REACT_APP_API_URL + "/topics";
  const {
    data: categories,
    isLoading,
    fetchError,
    fetchErrorMessage,
  } = useAxiosFetch(url, []);

  return (
    <>
      <main>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-10 col-lg-8 pt-5 pb-5">
              <div className="row bg-info pt-3 pb-2" id="title-bar">
                <div className="col-12 p-1 pl-4">
                  <h2 className="text-left">
                    <strong>Welcome!</strong>
                  </h2>
                </div>
              </div>

              <div className="row bg-warning pt-2" id="intro">
                <div className="col pt-2 pb-3 text-center">
                  <strong>Please Select a Topic Below:</strong>
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
                  {categories.map((catInfo) => (
                    <CategoryItem key={catInfo.id} {...catInfo} />
                  ))}
                </ConditionalDisplay>
              </div>

              <div
                className="row bg-warning p-3 justify-content-center"
                id="instructions"
              >
                <div className="col-10">
                  <strong>Instructions:</strong> Once the game starts, for each
                  picture, you have to type in the right answer and click Next.
                  How many questions can you answer before the timer runs out?
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Categories;
