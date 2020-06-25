import React from "react";
import TitleBar from "./TitleBar";
import UserInput from "./UserInput";
import ImageBox from "./ImageBox";
import Paginator from "./Paginator";
import useGameState from "./useGameState";

const Game = (props) => {
  const {
    data, // data fetched from API
    fetchError, // fetching status
    fetchErrorMessage, // fetching status
    isLoading, // fetching status
    index, // page number or question number
    context,
    endGameMessage,
    gameStatus,
    secondsLeft,
    answeredQuestions,
    setAnsweredQuestions,
    setIndex,
    startGame,
    endGame,
  } = useGameState(props.location.topicId, props.auth); // Arg = Query sent from CategoryItem "Link to"

  const formSubmitted = (buttonName, answerWasCorrect) => {
    // 1. check the answer
    if (answerWasCorrect) {
      setAnsweredQuestions((prev) => [...prev, index]);
    }
    // 2. display a new question
    if (buttonName === "btn-prev") {
      setIndex({ type: "prev" });
    } else {
      // btn-next or form submitted by enter
      setIndex({ type: "next" });
    }
  };

  const playAgain = (event) => {
    event.preventDefault();
    props.newGame();
  };

  return (
    <>
      <main>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-10 col-lg-8 pt-5 pb-5">
              <TitleBar
                gameStatus={gameStatus}
                isLoading={isLoading} // disables the start button
                fetchError={fetchError} // disables the start button
                startGame={startGame}
                endGame={() => endGame(context.messages.gameOver)}
                playAgain={playAgain}
                score={answeredQuestions.length}
                maxScore={data.length}
                secondsLeft={secondsLeft}
                endGameMessage={endGameMessage}
                topic={props.location.topic}
              />
              <UserInput
                gameStatus={gameStatus}
                answer={data[index].answer}
                status={
                  answeredQuestions.includes(index) ? "answered" : "available"
                }
                formSubmitted={formSubmitted}
              />
              <ImageBox
                imageURL={data[index].image}
                isLoading={isLoading}
                fetchError={fetchError}
                fetchErrorMessage={fetchErrorMessage}
              />
              <Paginator
                data={data}
                index={index}
                gameStatus={gameStatus}
                answeredQuestions={answeredQuestions}
                changeIndexTo={(targetIndex) =>
                  setIndex({ type: "goto", payload: targetIndex })
                }
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Game;
