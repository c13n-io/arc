import React from "react";
import "./c13n-text.css";

/**
 * This component represents the markdown image rendering process.
 * @param {*} props The markdown object containing syntax information.
 */
const c13nText = (props) => {
  return <span className="c13n-text">{props.value}</span>;
};

export default c13nText;
