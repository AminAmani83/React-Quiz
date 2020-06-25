import {
  useState,
  useEffect,
  useContext,
  useCallback,
  useReducer,
} from "react";
import utils from "../utils";
import { ConfigContext } from "../App";
import useAxiosFetch from "./useAxiosFetch";

const useGameState = (topicId, auth) => {
  const context = useContext(ConfigContext); // Global Game Configurations

  // Fetching Data from API
  const url = `${process.env.REACT_APP_API_URL}/${topicId}/${context.settings.numberOfQuestions}`;
  const initialData = [{ answer: "", image: "" }]; // correct format of API data for 1 object
  const accessToken = auth.getAccessToken();
  const { data, isLoading, fetchError, fetchErrorMessage } = useAxiosFetch(
    url,
    initialData,
    accessToken
  );

  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [gameStatus, setGameStatus] = useState("notStarted"); // or "active" or "ended"
  const [secondsLeft, setSecondsLeft] = useState(
    context.settings.numberOfQuestions * context.settings.secondsPerQuestion
  );
  const [endGameMessage, setEndGameMessage] = useState(""); // win or timeOut or gameOver

  const indexReducer = (state, action) => {
    switch (action.type) {
      case "prev":
        return state === 0 ? data.length - 1 : state - 1; // cycle through pages backwards
      case "next":
        return state === data.length - 1 ? 0 : state + 1; // cycle through pages forwards
      case "goto": // go to an index directly by clicking on thumbnails
        return action.payload;
      default:
        return 0;
    }
  };
  const [index, setIndex] = useReducer(indexReducer, 0); // current question index in the data array

  const startGame = () => {
    setGameStatus("active");
  };

  const endGame = useCallback((message) => {
    // User Gave Up OR Time Out
    setEndGameMessage(message);
    setGameStatus("ended");
  }, []);

  utils.useInterval(
    () => {
      // new timer
      if (gameStatus === "active") {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
      }
    },
    secondsLeft > 0 ? 1000 : null
  );

  // Check for Time Out
  useEffect(() => {
    // runs every time a change in secondsLeft re-renders the component
    if (secondsLeft === 0) {
      endGame(context.messages.timeOut);
    }
  }, [secondsLeft, context.messages.timeOut, endGame]);

  // Check for Win
  useEffect(() => {
    // runs every time a change in answeredQuestions re-renders the component
    if (answeredQuestions.length === data.length) {
      endGame(context.messages.win);
    }
  }, [answeredQuestions, data, context.messages.win, endGame]);

  return {
    data,
    fetchError,
    fetchErrorMessage,
    isLoading,
    index,
    context,
    endGameMessage,
    gameStatus,
    secondsLeft,
    answeredQuestions,
    setAnsweredQuestions,
    setIndex,
    startGame,
    endGame,
  };
};

export default useGameState;
