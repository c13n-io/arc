import React from "react";

import { Button, Form } from "antd";

import { version } from "../../config/version";

import "./version-error.css";

const formLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 10 },
};
/**
 * This component represents the error screen for incompatible BE/FE version.
 * @param {} props The global variables.
 * @returns The JSX of the error screen.
 */
const VersionScreen = (props) => {
  return (
    <div className="version-error-versionScreen">
      <h3>Incompatible Backend version</h3>
      <Form {...formLayout}>
        <Form.Item label="Backend Version">{props.backendVersion}</Form.Item>
        <Form.Item label="GUI Version">{version}</Form.Item>
      </Form>
      <Button
        onClick={() => {
          window.localStorage.setItem("url", "");
          window.location.reload(true);
        }}
        className="version-error-button"
      >
        Choose another C13N backend
      </Button>
    </div>
  );
};

export default VersionScreen;
