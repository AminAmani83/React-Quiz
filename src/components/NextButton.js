import React from "react";
import { PropTypes } from "prop-types";

const NextButton = (props) => {
  return (
    <>
      <div className="col-3 form-group text-left order-3">
        <button
          type="submit"
          name="btn-next"
          className="btn btn-info"
          onClick={props.buttonClicked}
          disabled={props.disabled}
        >
          Next <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </>
  );
};

NextButton.prototypes = {
  buttonClicked: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default NextButton;
