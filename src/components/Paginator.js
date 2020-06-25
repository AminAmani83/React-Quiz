import React, { useContext, useMemo } from "react";
import Thumbnail from "./Thumbnail";
import { ConfigContext } from "../App";
import { PropTypes } from "prop-types";

const Paginator = (props) => {
  // props: data, gameStatus, answeredQuestions, index, changeIndexTo

  const { paginatorImageClasses, settings } = useContext(ConfigContext);

  const thumbnailClicked = (event) => {
    event.preventDefault();
    props.changeIndexTo(parseInt(event.target.id));
  };

  const thumbColorChooser = (imageIndex) => {
    if (props.gameStatus === "active") {
      return props.answeredQuestions.includes(imageIndex)
        ? paginatorImageClasses.correct
        : paginatorImageClasses.default;
    }
    if (props.gameStatus === "ended") {
      return props.answeredQuestions.includes(imageIndex)
        ? paginatorImageClasses.correct
        : paginatorImageClasses.wrong;
    } // else, game is not started
    return paginatorImageClasses.default;
  };

  const indexes = useMemo(
    () => [...Array(props.data.length).keys()], // [0,1,2,3,4...]
    [props.data.length]
  ); // only recalculated if props.data.length changes

  return (
    <>
      <div className="row bg-warning pt-2 pb-2" id="thumbs">
        {indexes.map((i) => (
          <div className="col-2 pt-1 pb-2 text-center" key={i}>
            <Thumbnail
              imageIndex={i}
              imageURL={
                props.gameStatus === "notStarted"
                  ? settings.placeHolderImage
                  : props.data[i].image
              }
              imageDivClass={
                thumbColorChooser(i) + (props.index === i ? " active" : "")
              }
              isClickable={
                props.gameStatus === "notStarted" ? false : props.index !== i
              }
              thumbnailClicked={thumbnailClicked}
            />
          </div>
        ))}
      </div>
    </>
  );
};

Paginator.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      answer: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  index: PropTypes.number.isRequired,
  gameStatus: PropTypes.string.isRequired,
  answeredQuestions: PropTypes.arrayOf(PropTypes.number).isRequired,
  changeIndexTo: PropTypes.func.isRequired,
};

export default Paginator;
