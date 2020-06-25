import React from "react";
import { PropTypes } from "prop-types";

const PrevButton = (props) => {
  return (
    <>
      <div className="col-3 form-group text-right order-1">
        <button
          type="submit"
          name="btn-prev"
          className="btn btn-info"
          onClick={props.buttonClicked}
          disabled={props.disabled}
        >
          <i className="fas fa-arrow-left"></i> Prev
        </button>
      </div>
    </>
  );
};

PrevButton.prototypes = {
  buttonClicked: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default PrevButton;
