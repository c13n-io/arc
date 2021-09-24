import React, { useState } from "react";
import { List, Button, Input, Radio, Menu, Dropdown, Modal } from "antd";
import {
  SearchOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import discussionClient from "../services/discussionServices";

import { version } from "../config/version";
import generateIdenticon from "../utils/identicon.js";
import { findUserByAddress } from "../utils/users-utils.js";
import c13nLogo from "../media/C13N_Logo.png";

import { NotificationManager } from "react-notifications";

import theme from "../style/theme";

import {
  concatUserAddresses,
  concatUserNames,
} from "../utils/discussion-utils";

import "./side.css";

const cryptoUtils = require("../utils/crypto-utils");

/**
 * This component represents the left side panel of the application.
 * It contains the user's info and options on the top left area, as
 * well as the discussions panel.
 * @param {*} props The global variables.
 */
const Side = (props) => {
  // Discussion Filtering Variables
  const [
    stringToSearch,
    SetStringToSearch
  ] = useState("");
  const [
    selectedSearchOption,
    setSelectedSearchOption
  ] = useState("Name");
  const [
    selectedSideDiscussion,
    setSelectedSideDiscussion
  ] = useState();

  const [
    deleteDiscussionModalActive,
    setDeleteDiscussionModalActive
  ] =
    useState(false);

  /**
   * Calculates if there exist unread messages in a given discussion.
   * @param {*} item The discussion object.
   * @returns The unread status.
   */
  const calculateUnreadStatus = (item) => {
    return item.lastReadMsgId !== item.lastMsgId;
  };

  /**
   * Calculates the number of discussions that contain unread messages in order to update the tab title.
   */
  const titleNotificationChecker = () => {
    if (props.discussions) {
      let messageCounter = 0;
      const res = props.discussions.forEach((disc) => {
        if (disc.lastMsgId !== disc.lastReadMsgId) {
          messageCounter++;
        }
      });
      if (messageCounter == 0) {
        document.title = "c13n";
      } else {
        document.title = `*(${messageCounter}) c13n`;
      }
    }
  };

  /**
   * Calculates the discussions that pass the currently selected filter options.
   * @returns The discussions array.
   */
  const discussionsToShow = () => {
    titleNotificationChecker();
    if (props.discussions) {
      const res = props.discussions
        .filter((item) => {
          let name = concatUserNames(props, item.participantsList);
          let address = concatUserAddresses(props, item.participantsList);
          if (selectedSearchOption === "Name") {
            return name.toLowerCase().includes(stringToSearch.toLowerCase());
          }
          if (selectedSearchOption === "Address") {
            return address.toLowerCase().includes(stringToSearch.toLowerCase());
          }
        })
        .sort((a, b) => {
          return a.lastMsgId > b.lastMsgId ? -1 : 1;
        });
      return res;
    } else {
      return undefined;
    }
  };

  /**
   * The side panel JSX.
   */
  return (
    <div
      className={`sidePanel ${props.sideSquashed ? props.sideActivated ? "sidePanel-mobile" : "" : ""} `}
    >
      <Dropdown
        trigger="click"
        overlay={
          <Menu>
            <Menu.Item
              onClick={() => {
                props.setSelectedDiscussion();
                props.setSelectedPage("userSettings");
                props.setSideActivated(false);
              }}
            >
              Settings
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                props.updateCurrentFunds();
                props.setSelectedDiscussion();
                props.setSelectedPage("userFunds");
                props.setSideActivated(false);
              }}
            >
              Funds
            </Menu.Item>
            <Menu.Item
              className="fullscreen"
              onClick={() => {
                document.body.requestFullscreen();
              }}
            >
              Go Fullscreen
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                props.setFundsInitVisible(true);
                props.setFundsInitDisabled(false);
              }}
            >
              Show Welcome Dialog
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                props.setLoadAccount(0);
                window.localStorage.removeItem("url");
                window.localStorage.removeItem("httpUsername");
                window.localStorage.removeItem("httpPassword", "");
                window.location.reload(true);
              }}
            >
              Disconnect
            </Menu.Item>
          </Menu>
        }
      >
        <div
          className="side-user-info"
          style={{
            color: props.backendStatus ? "white" : "gray",
          }}
        >
          <div className="side-user-info-icon">
            {props.backendStatus && props.selfInfo.address ?
              generateIdenticon(props.selfInfo.address, 60)
              :
              <LoadingOutlined spin />
            }
          </div>
          <span className="side-user-info-name">
            <span
              className="side-user-info-name-text"
              style={{
                color: props.msgStreamActive ? "inherit" : "gray",
              }}
            >
              {props.selfInfo ? props.selfInfo.alias : "You"}
            </span>
          </span>
          <div id="currentFundsWrapper" className="currentFundsWrapper">
            <span id="sideLastFundChange">
              {cryptoUtils.parseLastFundChange(props)}
            </span>
            <span className="currentFundsWrapperSpan">
              {props.selectedCryptoUnit && props.lastFundChange !== 0
                ? props.selectedCryptoUnit
                : ""}
            </span>
            <div className="currentFundsWrapperSatoshis">
              {` ${cryptoUtils.parseCurrentFunds(props)}`}
            </div>
            <span className="currentFundsWrapperSatoshisLogo">
              {props.selectedCryptoUnit ? props.selectedCryptoUnit : ""}
            </span>
            <div className="currentFundsWrapperEuro">
              {cryptoUtils.parseCurrentFiatAmount(props)}
            </div>
            <span className="currentFundsWrapperEuroLogo">
              {props.selectedFiatUnit}
            </span>
          </div>
        </div>
      </Dropdown>
      <div className="side-buttons-wrapper">
        <Button
          className="side-button-homePage"
          onClick={() => {
            props.changePage("contacts", "hide");
          }}
        >
          <img src={c13nLogo} className="c13nLogo" />
          <span className="logoSpan">Home</span>
        </Button>
        <Button
          className="side-button-searchUsers"
          onClick={() => {
            props.changePage("searchUsers", "hide");
          }}
        >
          <SearchOutlined className="sideSearchOutlined" />
          <span className="sideSearchOutlinedSpan">Search</span>
        </Button>
        <Button
          className="side-button-groupChat"
          onClick={() => {
            props.changePage("groupChat", "hide");
          }}
        >
          <PlusOutlined className="sidePlusOutlined" />
          <span className="sidePlusOutlinedSpan">Group Discussion</span>
        </Button>
      </div>
      <div
        className="side-contacts-wrapper"
        style={{
          backgroundColor: theme.menuDark,
        }}
      >
        <List
          className="discussionsList"
          style={{
            scrollbarColor: `${theme.menuNormal} ${theme.menuDark}`,
            // maxHeight: 'min(50vh, 750px)',
          }}
          locale={{
            emptyText: "No Discussions",
          }}
          dataSource={discussionsToShow()}
          itemLayout="horizontal"
          renderItem={(item) => {
            const userLookup = findUserByAddress(
              props,
              item.participantsList[0]
            );
            return (
              <List.Item
                className="userContainer"
                style={{
                  backgroundColor:
                    props.selectedDiscussion === item ? theme.menuNormal : "",
                }}
              >
                <div
                  className="SideListItem"
                  onClick={() => {
                    props.changePage("chatHistory", "hide");
                    props.setSelectedDiscussion(item);
                  }}
                >
                  {item.participantsList.length > 1
                    ? generateIdenticon(
                      concatUserAddresses(props, [
                        props.selfInfo.address,
                        ...item.participantsList,
                      ]),
                      30
                    )
                    : generateIdenticon(
                      concatUserAddresses(props, [item.participantsList]),
                      30
                    )}
                </div>
                <div
                  className="sideContactUserWrapper"
                  onClick={() => {
                    props.changePage("chatHistory", "hide");
                    props.setSelectedDiscussion(item);
                  }}
                >
                  <b
                    className="sideContactUserWrapperB"
                    style={{
                      color: calculateUnreadStatus(item) ? "cyan" : "inherit",
                    }}
                  >
                    {concatUserNames(props, item.participantsList).length > 0
                      ? concatUserNames(props, item.participantsList)
                      : "Anonymous"}
                  </b>
                  <br />
                  <div className="sideContactUserWrapperDiv">
                    {item.participantsList.length == 1
                      ? userLookup
                        ? `${userLookup.address.substring(
                          0,
                          5
                        )}...${userLookup.address.substring(61, 66)}`
                        : ""
                      : "Group Discussion"}
                  </div>
                </div>

                <Dropdown
                  trigger="click"
                  overlay={
                    <Menu>
                      <Menu.Item disabled>Rename</Menu.Item>
                      <Menu.Item
                        onClick={() => {
                          setDeleteDiscussionModalActive(true);
                        }}
                      >
                        Delete
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <div
                    className="sideDropdown"
                    onClick={() => {
                      setSelectedSideDiscussion(item);
                    }}
                  >
                    <div>...</div>
                  </div>
                </Dropdown>
              </List.Item>
            );
          }}
        />
        <div className="side-filter">
          <Input
            placeholder="Filter..."
            className="side-input-filter"
            onChange={(e) => {
              SetStringToSearch(e.target.value);
            }}
          />
          <Radio.Group
            onChange={(e) => {
              setSelectedSearchOption(e.target.value);
            }}
            value={selectedSearchOption}
            optionType="button"
            size="small"
          >
            <Radio.Button value="Name" className="side-input-filter">
              Name
            </Radio.Button>
            <Radio.Button value="Address" className="side-input-filter">
              Address
            </Radio.Button>
          </Radio.Group>
        </div>
        <div className="side-input-version">
          {`Version ${version} | ${props.chainInfo?.chain} ${props.chainInfo?.network}`}
        </div>
      </div>
      <Modal
        visible={!!deleteDiscussionModalActive}
        onOk={() => {
          discussionClient().removeDiscussion(
            {
              id: selectedSideDiscussion.id,
            },
            (err, res) => {
              if (err) {
                console.log(err);
              }
              if (res) {
                NotificationManager.success("Discussion Deleted");
                props.setSelectedPage("logo");
                props.setDiscussions((oldDiscussions) => {
                  let res = oldDiscussions.filter((elem) => {
                    return elem.id !== selectedSideDiscussion.id;
                  });
                  return res;
                });
              }
            }
          );
          setDeleteDiscussionModalActive(false);
        }}
        onCancel={() => {
          setDeleteDiscussionModalActive(false);
        }}
        okButtonProps={{ type: "default" }}
      >
        <h3>Delete discussion?</h3>
      </Modal>
    </div>
  );
};

export default Side;
