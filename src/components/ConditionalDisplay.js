import React from "react";

const ConditionalDisplay = (props) => {
  return <>{props.isVisible ? props.children : ""}</>;
};

export default ConditionalDisplay;
