// src: https://github.com/pkellner
import { useState, useEffect, useReducer } from "react";
import axios from "axios";

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, isError: false };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        fetchError: false,
        fetchErrorMessage: "",
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        fetchError: true,
        fetchErrorMessage: "Data Retrieve Failure: " + action.payload,
      };
    // case "REPLACE_DATA":
    //   // The record passed (state.data) must have the attribute "id"
    //   const newData = state.data.map(rec => {
    //     return rec.id === action.replacerecord.id ? action.replacerecord : rec;
    //   });
    //   return {
    //     ...state,
    //     isLoading: false,
    //     fetchError: false,
    //     fetchErrorMessage: "",
    //     data: newData
    //   };
    default:
      throw new Error();
  }
};

const useAxiosFetch = (initialUrl, initialData, accessToken) => {
  // accessToken is optional
  const [url] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    fetchError: false,
    fetchErrorMessage: "",
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      console.log("Fetching Data from API");
      try {
        let result = accessToken
          ? await axios.get(url, {
              headers: { Authorization: `Bearer ${accessToken}` },
            })
          : await axios.get(url);
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (err) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE", payload: err.message });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [accessToken, url]);

  // const updateDataRecord = record => {
  //   dispatch({
  //     type: "REPLACE_DATA",
  //     replacerecord: record
  //   });
  // };

  // return { ...state, updateDataRecord };
  return { ...state };
};

export default useAxiosFetch;
