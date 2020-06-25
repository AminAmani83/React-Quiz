import React from "react";
import ConditionalDisplay from "./ConditionalDisplay";
import { PropTypes } from "prop-types";

const Thumbnail = (props) => {
  // props: imageIndex, imageURL, imageDivClass, isClickable, thumbnailClicked
  return (
    <>
      <div className={props.imageDivClass}>
        <ConditionalDisplay isVisible={props.isClickable}>
          <a
            href="/"
            onClick={props.thumbnailClicked}
            title={"quiz question" + props.imageIndex}
            id={props.imageIndex}
          >
            <img
              src={props.imageURL}
              alt={"quiz question " + props.imageIndex}
              id={props.imageIndex}
              className="img-fluid"
            />
          </a>
        </ConditionalDisplay>
        <ConditionalDisplay isVisible={!props.isClickable}>
          <img
            src={props.imageURL}
            alt={"quiz question " + props.imageIndex}
            id={props.imageIndex}
            className="img-fluid"
          />
        </ConditionalDisplay>
      </div>
    </>
  );
};

Thumbnail.propTypes = {
  imageURL: PropTypes.string.isRequired,
  imageDivClass: PropTypes.string.isRequired,
  isClickable: PropTypes.bool.isRequired,
  thumbnailClicked: PropTypes.func.isRequired,
};

export default Thumbnail;
