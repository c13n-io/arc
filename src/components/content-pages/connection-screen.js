import React from "react";

import { LoadingOutlined } from "@ant-design/icons";

import "./connection-screen.css";

/**
 * This component represents the connection screen.
 * @returns The connection screen JSX.
 */
const ConnectionScreen = () => {
  return (
    <div className="connection-screen-dv">
      <h2>Connecting</h2>
      <LoadingOutlined spin />
    </div>
  );
};

export default ConnectionScreen;
