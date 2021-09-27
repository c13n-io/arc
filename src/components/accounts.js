import { List, Modal, Button, Form, Input } from "antd";
import { DeleteOutlined, LoginOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { NotificationManager } from "react-notifications";

import nodeInfoClient from "../services/nodeInfoServices";
import { version } from "../config/version";

import { addToAccounts, removeFromAccounts } from "../utils/accounts-utils";

import "./accounts.css";
import c13nLogo from "../media/C13N_Logo.png";

const { Version } = require("../rpc/rpc_pb.js");

/**
 * This component represents the account selection screen.
 * @param {*} props The global variables.
 */
const Accounts = (props) => {
  // Modal related variables
  const [addAccountModalVisible, setAddAccountModalVisible] = useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    useState(false);
  const [editAccountModalVisible, setEditAccountModalVisible] = useState(false);
  const [credentialsModalVisible, setCredentialsModalVisible] = useState(false);
  const [usernameToUse, setUsernameToUse] = useState("");
  const [passwordToUse, setPasswordToUse] = useState("");
  const [urlToAdd, setUrlToAdd] = useState("");
  const [selectedAccount, setSelectedAccount] = useState();

  /**
   * This function is called once when the component loads.
   * It checks for previously selected account in order to connect automatically on the same account.
   */
  useEffect(() => {
    if (props.loadAccount === 0) {
      let url = window.localStorage.getItem("url");
      if (url !== "" && url !== "undefined" && url !== null) {
        console.log("Selected:", url);
        props.setSelectedPage("connectionScreen");
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 1);
        nodeInfoClient().getVersion(
          {},
          { deadline: deadline.getTime() },
          (err, res) => {
            if (err) {
              if (Date.now() < deadline) {
                NotificationManager.error(err.message);
                console.log(err);
              } else {
                NotificationManager.error(err.message);
              }
              window.localStorage.setItem("url", "");
              window.localStorage.setItem("httpUsername", "");
              window.localStorage.setItem("httpPassword", "");
              props.setSelectedPage("accounts");
            }
            if (res) {
              if (res.version) {
                props.setSelectedPage("logo");
                props.setBackendVersion(res.version);
                console.log(res);
                let backendMajor = res.version.split(".")[0];
                let guiMajor = version.split(".")[0];
                if (backendMajor !== guiMajor) {
                  props.setSelectedPage("versionError");
                } else {
                  props.setLoadAccount(1);
                }
              } else {
                console.log(res);
                NotificationManager.error("Unknown backend error!");
                window.localStorage.setItem("url", "");
                window.localStorage.setItem("httpUsername", "");
                window.localStorage.setItem("httpPassword", "");
                props.setSelectedPage("accounts");
              }
            }
          }
        );
      }
    }
  }, []);

  /**
   * Performs a login with current credentials.
   */
  const credentialsModalLogin = () => {
    if (usernameToUse && passwordToUse) {
      console.log("Logging:", selectedAccount);
      window.localStorage.setItem("httpUsername", usernameToUse);
      window.localStorage.setItem("httpPassword", passwordToUse);
      window.localStorage.setItem("url", selectedAccount.url);
      window.location.reload(true);
      setCredentialsModalVisible(false);
    }
  };

  /**
   * The accounts page JSX.
   */
  return (
    <div className="login-page">
      <div className="login-page-logo-container">
        <img src={c13nLogo} className="login-page-logo" />
      </div>
      <h3 className="login-page-select">Select a c13n Node</h3>
      <List
        className="login-page-accountsList"
        locale={{
          emptyText: "No Accounts",
        }}
        dataSource={props.accounts}
        renderItem={(item) => {
          return (
            <List.Item className="accountsListItem">
              <Form className="accountsForm">
                <Form.Item
                  label="URL"
                  className="accountsFormItem"
                  onClick={() => {
                    if (item.url !== "") {
                      setSelectedAccount(item);
                      setCredentialsModalVisible(true);
                    }
                  }}
                >
                  {item.url !== "" ? (
                    item.url
                  ) : (
                    <span className="accountsFormItemError">
                      No URL provided
                    </span>
                  )}
                </Form.Item>
              </Form>
              <div className="accountsButtons">
                {/* <Button
                  className="accountsButton"
                  onClick={() => {
                    if (item.url !== "") {
                      setSelectedAccount(item);
                      setCredentialsModalVisible(true);
                    }
                  }}
                >
                  Connect
                  <LoginOutlined />
                </Button> */}
                <Button
                  className="accountsButton"
                  onClick={() => {
                    setSelectedAccount(item);
                    setDeleteAccountModalVisible(true);
                  }}
                >
                  <DeleteOutlined />
                </Button>
              </div>
            </List.Item>
          );
        }}
      />
      <Button
        className="login-page-addButton"
        onClick={() => {
          setAddAccountModalVisible(true);
        }}
      >
        <div className="login-page-addButton-Text">+ Add New Node</div>
      </Button>
      <Modal
        visible={!!addAccountModalVisible}
        onOk={() => {
          if (urlToAdd !== "") {
            addToAccounts(props, { url: urlToAdd });
            setUrlToAdd("");
            setAddAccountModalVisible(false);
            credentialsModalLogin();
          }
        }}
        onCancel={() => {
          setAddAccountModalVisible(false);
        }}
        okButtonProps={{ type: "default" }}
      >
        <div className="login-page-modal-logo-container">
          <img src={c13nLogo} className="login-page-modal-logo" />
        </div>
        <Input
          placeholder="Node Address"
          value={urlToAdd}
          className="accountsInput"
          onChange={(e) => {
            setUrlToAdd(e.target.value);
          }}
        />
        <Input
          placeholder="Username"
          className="accountsInputCred"
          value={usernameToUse}
          onChange={(e) => {
            setUsernameToUse(e.target.value);
          }}
        />
        <Input
          placeholder="Password"
          className="accountsInputCred"
          type="password"
          value={passwordToUse}
          onChange={(e) => {
            setPasswordToUse(e.target.value);
          }}
          onKeyDown={(e) => {
            return e.key === "Enter"
              ? e.shiftKey
                ? undefined
                : credentialsModalLogin()
              : undefined;
          }}
        />
      </Modal>
      <Modal
        visible={!!deleteAccountModalVisible}
        onOk={() => {
          removeFromAccounts(props, selectedAccount);
          setDeleteAccountModalVisible(false);
        }}
        onCancel={() => {
          setDeleteAccountModalVisible(false);
        }}
        okButtonProps={{ type: "default" }}
      >
        Delete Account?
      </Modal>
      <Modal
        visible={!!credentialsModalVisible}
        onOk={() => {
          credentialsModalLogin();
        }}
        onCancel={() => {
          setCredentialsModalVisible(false);
        }}
        okButtonProps={{ type: "default" }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className="login-page-modal-logo-container">
          <img src={c13nLogo} className="login-page-modal-logo" />
        </div>
        <Input
          placeholder="Username"
          className="accountsInputCred"
          value={usernameToUse}
          onChange={(e) => {
            setUsernameToUse(e.target.value);
          }}
        />
        <Input
          placeholder="Password"
          className="accountsInputCred"
          type="password"
          value={passwordToUse}
          onChange={(e) => {
            setPasswordToUse(e.target.value);
          }}
          onKeyDown={(e) => {
            return e.key === "Enter"
              ? e.shiftKey
                ? undefined
                : credentialsModalLogin()
              : undefined;
          }}
        />
      </Modal>
      <Modal
        title="Editing Account"
        visible={!!editAccountModalVisible}
        onOk={() => {
          removeFromAccounts(props, selectedAccount);
          addToAccounts(props, { url: urlToAdd });
          // setUrlToAdd('')
          setEditAccountModalVisible(false);
        }}
        onCancel={() => {
          setUrlToAdd("");
          setEditAccountModalVisible(false);
        }}
        okButtonProps={{ type: "default" }}
      >
        <Input
          placeholder="Address:Port"
          value={urlToAdd}
          className="accountsInput"
          onChange={(e) => {
            setUrlToAdd(e.target.value);
          }}
        />
      </Modal>
    </div>
  );
};

export default Accounts;
