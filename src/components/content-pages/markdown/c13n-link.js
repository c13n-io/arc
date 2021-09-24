import React from "react";

/**
 * This component represents the markdown link rendering process.
 * @param {*} props The markdown object containing syntax information.
 */
const c13nLink = (props) => {
  return (
    <a href={props.href} target="_blank">
      {props.href}
    </a>
  );
};

export default c13nLink;
