import React, { useState } from "react";
import { Button, Form, Divider, Switch, Select, Collapse } from "antd";
import { GithubPicker } from "react-color";
import "./user-settings.css";
import theme from "../../style/theme";
import { DoubleRightOutlined } from "@ant-design/icons";

import {
  saveAutomaticImageLoadingSetting,
  saveSmoothAnimationsSetting,
  saveSelectedCryptoUnit,
  saveSelectedFiatUnit,
  saveChatIdenticonsSetting,
  saveChatLayoutSetting,
  saveMyMessageColor,
  saveOtherMessageColor,
  saveDeveloperLogsSetting,
} from "../../utils/settings";

const messageColorsArray = [
  "black",
  "darkslategray",
  "brown",
  "darkblue",
  "darkgreen",
  "darkslateblue",
  "darkslategrey",
  "indigo",
  "olivedrab",
  "sienna",
  "saddlebrown",
  "teal",
  "steelblue",
  "seagreen",
  "#232425",
  "#245559",
  "#552424"
];

/**
 * This component represents the user settings page, containing user and connection information.
 * @param {*} props The global variables.
 */
const UserSettings = (props) => {
  // Current account related variables
  const [url] = useState(window.localStorage.getItem("url"));
  /**
   * The user settings page JSX.
   */
  return (
    <>
      <div className="user-settings">
        <div
          className="user-settings-header"
          style={{
            backgroundColor: theme.menuDarkLite,
          }}
        >
          <DoubleRightOutlined
            className="chatHistoryExpandForMobile"
            style={{
              display: props.sideSquashed
                ? props.sideActivated
                  ? "none"
                  : "inherit"
                : "none",
            }}
            onClick={() => {
              props.setSideActivated(true);
            }}
          />
          <div className="user-settings-header-text">Settings</div>
        </div>
        <div className="user-settings-main">
          <Form className="user-settings-form">
            <Collapse>
              <Collapse.Panel header="View Settings">
                <Form.Item>
                  <Switch
                    checked={!!props.automaticImageLoading}
                    className="user-settings-collapse"
                    onChange={(value) => {
                      saveAutomaticImageLoadingSetting(props.setAutomaticImageLoading, value);
                    }}
                  />
                  Allow automatic loading of externally linked images
                </Form.Item>
                <Form.Item>
                  <Switch
                    checked={!!props.smoothAnimations}
                    className="user-settings-collapse"
                    onChange={(value) => {
                      saveSmoothAnimationsSetting(props.setSmoothAnimations, value);
                    }}
                  />
                  Enable smooth animations and transitions
                </Form.Item>
                <Form.Item>
                  <Switch
                    checked={!!props.chatIdenticons}
                    className="user-settings-collapse"
                    onChange={(value) => {
                      saveChatIdenticonsSetting(props.setChatIdenticons, value);
                    }}
                  />
                  Show user icons in chat messages
                </Form.Item>
                <Form.Item>
                  <Select
                    defaultValue={`${props.chatLayout}`}
                    className="user-settings-formSelect"
                    onChange={(e) => {
                      saveChatLayoutSetting(props.setChatLayout, e);
                    }}
                  >
                    <Select.Option value="normal">Normal</Select.Option>
                    <Select.Option value="left">Left Side</Select.Option>
                    <Select.Option value="right">Right Side</Select.Option>
                  </Select>
                  Messages Layout
                </Form.Item>

                My Messages Color:
                <Form.Item>
                  <GithubPicker
                    triangle="hide"
                    colors={messageColorsArray}
                    color={props.myMessageColor}
                    onChangeComplete={(color) => {
                      saveMyMessageColor(props.setMyMessageColor, color.hex);
                    }}
                  />
                  <Button
                    onClick={() => {
                      saveMyMessageColor(props.setMyMessageColor, "rgba(0, 0, 0, 0.0)");
                    }}
                  >
                    Transparent
                  </Button>
                </Form.Item>
                Other Messages Color:
                <Form.Item>
                  <GithubPicker
                    className="user-settings-github"
                    triangle="hide"
                    colors={messageColorsArray}
                    color={props.myMessageColor}
                    onChangeComplete={(color) => {
                      saveOtherMessageColor(props.setOtherMessageColor, color.hex);
                    }}
                  />
                  <Button
                    onClick={() => {
                      saveOtherMessageColor(props.setOtherMessageColor, "rgba(0, 0, 0, 0.0)");
                    }}
                  >
                    Transparent
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Switch
                    checked={!!props.developerLogs}
                    className="user-settings-collapse"
                    onChange={(value) => {
                      saveDeveloperLogsSetting(props.setDeveloperLogs, value);
                    }}
                  />
                  Developer Logs (Page refresh required)
                </Form.Item>
              </Collapse.Panel>
              <Collapse.Panel header="Crypto Settings">
                <Form.Item>
                  <Select
                    defaultValue={`${props.selectedCryptoUnit}`}
                    className="user-settings-formSelect"
                    onChange={(e) => {
                      saveSelectedCryptoUnit(props.setSelectedCryptoUnit, e);
                    }}
                  >
                    <Select.Option value="mBTC">mBTC</Select.Option>
                    <Select.Option value="sat">sat</Select.Option>
                    <Select.Option value="msat">msat</Select.Option>
                  </Select>
                  Select crypto unit to display
                </Form.Item>
                <Form.Item>
                  <Select
                    defaultValue={`${props.selectedFiatUnit}`}
                    className="user-settings-formSelect"
                    onChange={(e) => {
                      setSelectedFiatUnit(props.setSelectedFiatUnit, e);
                    }}
                  >
                    <Select.Option value="EUR">EUR</Select.Option>
                    <Select.Option value="USD">USD</Select.Option>
                  </Select>
                  Select fiat unit to display
                </Form.Item>
              </Collapse.Panel>
              <Collapse.Panel header="Account Info">
                <b>
                  <Divider orientation="left">
                    <h2>Self Info</h2>
                  </Divider>
                </b>
                <Form.Item label="Your Alias is:">
                  {props.selfInfo ? props.selfInfo.alias : "Not Found"}
                </Form.Item>
                <Form.Item label="Your Address is:">
                  {props.selfInfo ? props.selfInfo.address : "Not Found"}
                </Form.Item>
                <b>
                  <Divider orientation="left">
                    <h2>Backend Info</h2>
                  </Divider>
                </b>
                <Form.Item label="Address:">{url}</Form.Item>
                <Form.Item label="Version:">{props.backendVersion}</Form.Item>
              </Collapse.Panel>
            </Collapse>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UserSettings;
