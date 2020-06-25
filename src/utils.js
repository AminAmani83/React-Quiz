import { useEffect, useRef } from 'react';

const utils = {
    validateAnswer: (userInput, answer) => {
        const cleanUpString = (str) => {
            return str.replace(/\W+/g, '').toLowerCase(); // Remove non-alphanumeric chars and convert to lowercase
        }
        return cleanUpString(userInput) === cleanUpString(answer)
    },

    useInterval: (callback, delay) => { // src: https://overreacted.io/making-setinterval-declarative-with-react-hooks
        const savedCallback = useRef();
        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);
        // Set up the interval.
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }
}

export default utils;