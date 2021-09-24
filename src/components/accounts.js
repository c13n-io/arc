import { List, Modal, Button, Form, Input } from "antd";
import { DeleteOutlined, LoginOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { NotificationManager } from "react-notifications";

import nodeInfoClient from "../services/nodeInfoServices";
import { version } from "../config/version";

import { addToAccounts, removeFromAccounts } from "../utils/accounts-utils";

import "./accounts.css";

const { Version } = require("../rpc/rpc_pb.js");

/**
 * This component represents the account selection screen.
 * @param {*} props The global variables.
 */
const Accounts = (props) => {
  // Modal related variables
  const [
    addAccountModalVisible,
    setAddAccountModalVisible
  ] = useState(false);
  const [
    deleteAccountModalVisible,
    setDeleteAccountModalVisible
  ] =
    useState(false);
  const [
    editAccountModalVisible,
    setEditAccountModalVisible
  ] = useState(false);
  const [
    credentialsModalVisible,
    setCredentialsModalVisible
  ] = useState(false);
  const [
    usernameToUse,
    setUsernameToUse
  ] = useState("");
  const [
    passwordToUse,
    setPasswordToUse
  ] = useState("");
  const [
    urlToAdd,
    setUrlToAdd
  ] = useState("");
  const [
    selectedAccount,
    setSelectedAccount
  ] = useState();

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
    <div className="accountsScreen">
      <h3>Select an account</h3>
      <List
        className="accountsList"
        locale={{
          emptyText: "No Accounts",
        }}
        dataSource={props.accounts}
        renderItem={(item) => {
          return (
            <List.Item className="accountsListItem">
              <Form className="accountsForm">
                <Form.Item label="URL" className="accountsFormItem">
                  {item.url !== "" ?
                    item.url
                    :
                    <span className="accountsFormItemError">
                      No URL provided
                    </span>
                  }
                </Form.Item>
              </Form>
              <br />
              <br />
              <div className="accountsDiv">
                <Button
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
                </Button>
                {/* <Button
                  style={{
                    display: 'inline-block',
                    float: 'right'
                  }}
                  onClick={() => {
                    setSelectedAccount(item)
                    setUrlToAdd(item.url)
                    setEditAccountModalVisible(true)
                  }}
                >
                  <EditOutlined />
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
        className="accountsButtonModalTrue"
        onClick={() => {
          setAddAccountModalVisible(true);
        }}
      >
        Add New Account
      </Button>
      <Modal
        visible={!!addAccountModalVisible}
        title="Adding new account"
        onOk={() => {
          if (urlToAdd !== "") {
            addToAccounts(props, { url: urlToAdd });
            setUrlToAdd("");
            setAddAccountModalVisible(false);
          }
        }}
        onCancel={() => {
          setAddAccountModalVisible(false);
        }}
        okButtonProps={{ type: "default" }}
      >
        <Input
          placeholder="Public IP Address"
          value={urlToAdd}
          className="accountsInput"
          onChange={(e) => {
            setUrlToAdd(e.target.value);
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
