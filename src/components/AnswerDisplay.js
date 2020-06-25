import React from "react";

const AnswerDisplay = (props) => {
  return (
    <>
      <div className={"col-6 text-center pt-2 order-2 " + props.answerClass}>
        <strong>{props.answer}</strong>
      </div>
    </>
  );
};

export default AnswerDisplay;
