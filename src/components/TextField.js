import React from "react";
import { PropTypes } from "prop-types";

const TextField = (props) => {
  return (
    <>
      <div className="col-6 form-group text-center order-2">
        <input
          type="text"
          size="50"
          ref={(input) => input && input.focus()} // always in focus
          placeholder={props.placeholder}
          className={"form-control " + props.inputTextClass}
          value={props.inputText}
          onChange={props.inputChanged}
          disabled={props.disabled}
        />
      </div>
    </>
  );
};

TextField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  inputTextClass: PropTypes.string.isRequired,
  inputText: PropTypes.string.isRequired,
  inputChanged: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default TextField;
