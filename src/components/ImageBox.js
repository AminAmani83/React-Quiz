import React from "react";
import ConditionalDisplay from "./ConditionalDisplay";
import { PropTypes } from "prop-types";

const ImageBox = (props) => {
  return (
    <>
      <div className="row bg-info pt-2 pb-2">
        <div className="col-12 pt-1 text-center image-box">
          <ConditionalDisplay isVisible={props.isLoading}>
            Loading...
          </ConditionalDisplay>

          <ConditionalDisplay isVisible={props.fetchError}>
            API Error:
            <br />
            {props.fetchErrorMessage}
          </ConditionalDisplay>

          <ConditionalDisplay isVisible={!props.fetchError && !props.isLoading}>
            <img
              src={props.imageURL}
              alt="quiz-question"
              className="img-fluid"
            />
          </ConditionalDisplay>
        </div>
      </div>
    </>
  );
};

ImageBox.propTypes = {
  imageURL: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool.isRequired,
  fetchErrorMessage: PropTypes.string.isRequired,
};

export default ImageBox;
