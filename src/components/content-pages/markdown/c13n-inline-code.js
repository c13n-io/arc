import React from "react";
import "./c13n-inline-code.css";

/**
 * This component represents the markdown inline-code rendering process.
 * @param {*} props The markdown object containing syntax information.
 */
const c13nInlineCode = (props) => {
  return <code className="chatHistoryMessageCodeSection">{props.value}</code>;
};

export default c13nInlineCode;
