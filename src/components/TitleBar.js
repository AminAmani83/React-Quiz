import React from "react";
import ConditionalDisplay from "./ConditionalDisplay";
import { PropTypes } from "prop-types";

const TitleBar = (props) => {
  return (
    <>
      <div className="row bg-info pt-3 pb-2">
        <div className="col-6 p-1 pl-4">
          <h2 className="text-left">
            <strong>{props.topic}</strong>
          </h2>
        </div>
        <div className="col-2 text-center p-1">
          <ConditionalDisplay isVisible={props.gameStatus === "notStarted"}>
            <button
              name="btn-start"
              className="btn btn-warning"
              onClick={props.startGame}
              disabled={props.fetchError || props.isLoading}
            >
              Start
            </button>
          </ConditionalDisplay>
          <ConditionalDisplay isVisible={props.gameStatus === "active"}>
            <button
              name="btn-start"
              className="btn btn-warning"
              onClick={props.endGame}
            >
              Give Up
            </button>
          </ConditionalDisplay>
          <ConditionalDisplay isVisible={props.gameStatus === "ended"}>
            <strong>{props.endGameMessage}</strong>
            <br />
            <a
              href="/"
              onClick={props.playAgain}
              title="Play Again"
              className="text-light"
            >
              Play Again
            </a>
          </ConditionalDisplay>
        </div>
        <div className="col-2 text-center p-1">
          <strong>Score</strong>
          <br />
          {props.score}/{props.maxScore}
        </div>
        <div className="col-2 text-center p-1">
          <strong>Time</strong>
          <br />
          <span className={props.secondsLeft < 10 ? "text-danger" : ""}>
            {parseInt(props.secondsLeft / 60)}:
            {("0" + (props.secondsLeft % 60)).slice(-2)}
          </span>
        </div>
      </div>
    </>
  );
};

TitleBar.propTypes = {
  gameStatus: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool.isRequired,
  startGame: PropTypes.func.isRequired,
  endGame: PropTypes.func.isRequired,
  playAgain: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  maxScore: PropTypes.number.isRequired,
  secondsLeft: PropTypes.number.isRequired,
  endGameMessage: PropTypes.string.isRequired,
};

export default TitleBar;
