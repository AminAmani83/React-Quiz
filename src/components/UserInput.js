import React from "react";
import utils from "../utils";
import ConditionalDisplay from "./ConditionalDisplay";
import PrevButton from "./PrevButton";
import NextButton from "./NextButton";
import AnswerDisplay from "./AnswerDisplay";
import TextField from "./TextField";
import useInputState from "./useInputState";
import { PropTypes } from "prop-types";

const UserInput = (props) => {
  // Our Custom Hook
  const {
    userInputTextClasses,
    inputText,
    inputTextClass,
    setInputText,
  } = useInputState(props.answer);

  const inputChanged = (event) => {
    setInputText({ data: event.target.value });
  };

  const buttonClicked = (event) => {
    // hitting enter on the input field counts as Next Button Click
    event.preventDefault();
    props.formSubmitted(
      event.target.name,
      utils.validateAnswer(inputText, props.answer)
    ); // informing the parent about the correctness of the answer
    setInputText({ data: "" }); // reseting the input field, preparing for the next question
  };

  return (
    <>
      <div className="row bg-warning pt-2">
        <div className="col pt-3">
          <form>
            <div className="form-row">
              <NextButton
                buttonClicked={buttonClicked}
                disabled={props.gameStatus === "notStarted"}
              />

              <ConditionalDisplay isVisible={props.gameStatus === "notStarted"}>
                <TextField
                  inputText={inputText}
                  inputTextClass={inputTextClass}
                  inputChanged={inputChanged}
                  disabled={true}
                  placeholder="Press Start When Ready"
                />
              </ConditionalDisplay>

              <ConditionalDisplay isVisible={props.gameStatus === "active"}>
                {props.status === "available" ? (
                  <TextField
                    inputText={inputText}
                    inputTextClass={inputTextClass}
                    inputChanged={inputChanged}
                    disabled={false}
                    placeholder="Type Your Guess"
                  />
                ) : (
                  <AnswerDisplay
                    answer={props.answer}
                    answerClass={userInputTextClasses.correct}
                  />
                )}
              </ConditionalDisplay>

              <ConditionalDisplay isVisible={props.gameStatus === "ended"}>
                {props.status === "available" ? (
                  <AnswerDisplay
                    answer={props.answer}
                    answerClass={userInputTextClasses.wrong}
                  />
                ) : (
                  <AnswerDisplay
                    answer={props.answer}
                    answerClass={userInputTextClasses.correct}
                  />
                )}
              </ConditionalDisplay>

              <PrevButton
                buttonClicked={buttonClicked}
                disabled={props.gameStatus === "notStarted"}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

UserInput.propTypes = {
  gameStatus: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  formSubmitted: PropTypes.func.isRequired,
};

export default UserInput;
