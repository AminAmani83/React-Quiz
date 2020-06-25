import { useState, useContext, useReducer } from "react";
import { ConfigContext } from "../App";
import utils from "../utils";

const useInputState = (answer) => {
  const { userInputTextClasses } = useContext(ConfigContext); // only take the userInputClass property
  const [inputTextClass, setInputTextClass] = useState(
    userInputTextClasses.default
  ); // This is automatically set in the reducer

  const InputTextReducer = (state, action) => {
    // 1. set the state
    state = action.data;
    // 2. set the input text color
    if (utils.validateAnswer(action.data, answer)) {
      setInputTextClass(userInputTextClasses.correct);
    } else {
      setInputTextClass(userInputTextClasses.default);
    }
    return action.data;
  };

  const [inputText, setInputText] = useReducer(InputTextReducer, "");

  return { userInputTextClasses, inputText, inputTextClass, setInputText };
};

export default useInputState;
