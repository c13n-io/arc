import React, { useState, useEffect } from "react";
import {
  List,
  Divider,
  Modal,
  Layout,
  Button,
  Tooltip,
  Dropdown,
  Menu,
} from "antd";
import {
  LoadingOutlined,
  ExclamationCircleOutlined,
  DownCircleOutlined,
  SafetyOutlined,
  CloseCircleOutlined,
  CheckOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

import MessageInfo from "./message-info";
import ChatHistoryInput from "./chat-history-input";
import ChatHistoryStatistics from "./chat-history-statistics";
import UserPreview from "./user-preview";
import generateIdenticon from "../../utils/identicon.js";
import { findUserByAddress } from "../../utils/users-utils.js";
import { payloadToDom } from "../../payload-protocol/parsers";

import discussionClient from "../../services/discussionServices";
import { DoubleRightOutlined } from "@ant-design/icons";

import {
  concatUserNames,
  concatUserAddresses,
  routesToAddresses,
  populateChatHistoryMetadata,
} from "../../utils/discussion-utils";
import theme from "../../style/theme";
import "./chat-history.css";

const { GetDiscussionHistoryResponse } = require("../../rpc/rpc_pb");
const cryptoUtils = require("../../utils/crypto-utils");

/**
 * This component represents the chat history page.
 * This page contains all functionalities responsible for chatting.
 * @param {*} props The global variables.
 */
const ChatHistory = (props) => {
  const messagesPerBlock = 15;
  const [oldListHeight, setOldListHeight] = useState(0);
  const [lastMessageSeen, setLastMessageSeen] = useState(0);
  const [noMoreHistory, setNoMoreHistory] = useState(false);

  const [anonymousActive, setAnonymousActive] = useState(false);

  const [feeModalVisible, setFeeModalVisible] = useState(false);
  const [statisticsModalVisible, setStatisticsModalVisible] = useState(false);
  const [messageInfoModalVisible, setMessageInfoModalVisible] = useState(false);
  const [rawMessageInfoModalVisible, setRawMessageInfoModalVisible] = useState(false);
  const [userPreviewVisible, setUserPreviewVisible] = useState(false);
  const [userPreviewUser, setUserPreviewUser] = useState();

  const [selectedMessage, setSelectedMessage] = useState();

  const [pageLoaded, setPageLoaded] = useState(false);

  const [anonymousBucket, setAnonymousBucket] = useState(false);

  const chatHistoryHeaderProps = {
    anonymousBucket,
    setAnonymousBucket,
  };

  const chatHistoryIcon = (
    <>
      {props.selectedDiscussion.participantsList.length > 1
        ? generateIdenticon(
          concatUserAddresses(props, [
            props.selfInfo.address,
            ...props.selectedDiscussion.participantsList,
          ]),
          50
        )
        : generateIdenticon(
          concatUserAddresses(props, [
            props.selectedDiscussion.participantsList,
          ]),
          50
        )}
    </>
  );

  const chatHistoryUsrName = (
    <>
      {anonymousBucket
        ? "Anonymous Messages"
        : concatUserNames(props, props.selectedDiscussion.participantsList)}
    </>
  );

  /**
   * Updates the last seen message of the currently selected discussion to the last message of the current chat history.
   * @param {*} history The current chat history. Used to retrieve the last message's id.
   */
  const updateLastMessageSeen = (history) => {
    discussionClient().updateDiscussionLastRead(
      {
        discussionId: props.selectedDiscussion.id,
        lastReadMsgId: history[history.length - 1].id,
      },
      (err, res) => {
        if (err) {
          console.log(err);
        }
        if (res) {
          if (!document.hidden) {
            setLastMessageSeen(history[history.length - 1].id);
            props.selectedDiscussion.lastReadMsgId =
              history[history.length - 1].id;
          } else {
          }
        }
      }
    );
  };

  /**
   * Calculates alignment for message text based on the current loaded chatLayout setting.
   * @param {*} item The chat history message object.
   * @returns The align direction.
   */
  const calculateTextAlign = (item) => {
    switch (props.chatLayout) {
    case "normal":
      return findSenderName(item) === props.selfInfo.alias ? "right" : "left";
    case "left":
      return "left";
    case "right":
      return "right";
    }
  };

  /**
   * Calculates the chat bubble direction based on the current loaded chatLayout setting.
   * @param {*} item The chat history message object.
   * @returns The flex-row direction.
   */
  const calculateFlexRowDirection = (item) => {
    switch (props.chatLayout) {
    case "normal":
      return findSenderName(item) === props.selfInfo.alias
        ? "row-reverse"
        : "row";
    case "left":
      return "row";
    case "right":
      return "row-reverse";
    }
    return findSenderName(item) === props.selfInfo.alias
      ? "row-reverse"
      : "row";
  };

  /**
   * Calculates the message header's color to indicate unread status.
   * @param {*} item The chat history message object.
   * @returns The color of the header.
   */
  const calculateChatHistoryMessageColor = (item) => {
    if (pageLoaded === false) {
      return item.id > props.selectedDiscussion.lastReadMsgId &&
        item.sender !== props.selfInfo.address
        ? "cyan"
        : "inherit";
    } else {
      return item.id > lastMessageSeen && item.sender !== props.selfInfo.address
        ? "cyan"
        : "inherit";
    }
  };

  /**
   * Calculates the display status for the message failure indicator.
   * @param {*} item The chat history message object.
   * @returns The display status of the indicator.
   */
  const calculatePartialFailureIndicatorDisplay = (item) => {
    return item.sender === props.selfInfo.address
      ? routesToAddresses(item.paymentRoutesList).length ===
        props.selectedDiscussion.participantsList.length
        ? "none"
        : "inline"
      : "none";
  };

  const atBottom = () => {
    let elem = document.getElementById("chatHistoryListId");
    if (elem?.scrollHeight - elem?.scrollTop > elem?.clientHeight + 120) {
      return false;
    } else {
      return true;
    }
  };

  /**
   * This function is called anytime the selected discussion changes.
   */
  useEffect(async () => {
    if (props.selectedDiscussion) {
      props.setChatHistory([]);
      loadHistory(true, props.selectedDiscussion.id);
      let elem = document.getElementById("chatHistoryListId");
      setAnonymousActive(false);
      setPageLoaded(false);
      setNoMoreHistory(false);
      if (props.selectedDiscussion.participantsList[0] === "") {
        props.setAnonymousBucket(true);
      } else {
        props.setAnonymousBucket(false);
      }
    }
  }, [props.selectedDiscussion]);

  /**
   * This function is called anytime the current chat history changes.
   */
  useEffect(() => {
    if (props.chatHistory.length !== 0) {
      if (pageLoaded) {
        if (atBottom()) {
          updateChatScroll();
          updateLastMessageSeen(props.chatHistory);
        }
      } else {
        setPageLoaded(true);
        updateLastMessageSeen(props.chatHistory);
        setChatScroll();
        setTimeout(function () {
          setChatScroll();
        }, 750);
      }
    }
  }, [props.chatHistory]);

  /**
   * This function fetches the history of the currently selected discussion.
   * It stores the response in the chatHistory variable.
   */
  async function loadHistory(fresh, discussionId) {
    let reverse = true;
    /**
     * If lastId == 0 then discussion is either empty, or contains only
     * one message with id == 0. In case the discussion has only one
     * message with id == 0, we need to declare reverse = true in order
     * for backend to normally return the response
     */
    if (props.selectedDiscussion.lastMsgId == 0) {
      reverse = false;
    }
    let async_selectedDiscusion;
    await props.setSelectedDiscussion((oldValue) => {
      async_selectedDiscusion = oldValue;
      return oldValue;
    });
    let chatHistory = [];
    let previousId = !fresh ? props.chatHistory[0].id - 1 : 0;
    if (previousId < 0) {
      previousId = 0;
    }
    return await discussionClient()
      .getDiscussionHistoryById({
        id: props.selectedDiscussion.id,
        pageOptions: {
          reverse: reverse,
          lastId: fresh ? props.selectedDiscussion.lastMsgId : previousId,
          pageSize: fresh ? 50 : messagesPerBlock,
        },
      })
      .on("data", (res) => {
        chatHistory.push(
          GetDiscussionHistoryResponse.toObject(true, res).message
        );
      })
      .on("end", () => {
        if (async_selectedDiscusion.id === discussionId) {
          if (chatHistory.length === 0) {
            setNoMoreHistory(true);
          }
          props.setChatHistory((oldHistory) => {
            let res = [...oldHistory];
            res.unshift(...chatHistory);
            populateChatHistoryMetadata(res);
            return res;
          });
        }
      })
      .on("error", (e) => {
        if (e.code == 13) {
          setNoMoreHistory(true);
        }
        console.log("err", e);
      })
      .on("status", () => {});
  }

  /**
   * This function scrolls to the bottom of the chat history with respect to animations.
   */
  const updateChatScroll = () => {
    let element = document.getElementById("chatHistoryListId");
    if (element && !document.hidden) {
      element.scroll({
        top: element.scrollHeight,
        behavior: props.smoothAnimations ? "smooth" : "auto",
      });
    }
  };

  /**
   * This function scrolls to the bottom of the chat history without animations.
   */
  const setChatScroll = () => {
    let element = document.getElementById("chatHistoryListId");
    if (element) {
      element.scroll({
        top: element.scrollHeight,
        behavior: "auto",
      });
    }
  };

  /**
   * This function returns a message object's sender's name.
   * @param {*} item The message object.
   */
  const findSenderName = (item) => {
    let lookup;
    if (props.contacts) {
      lookup = props.contacts.find((elem) => {
        return elem.user.address === item.sender;
      });
    }
    if (lookup) {
      return lookup.displayName;
    } else if (item.sender === props.selfInfo.address) {
      return props.selfInfo.alias;
    } else {
      let userLookup = findUserByAddress(props, item.sender);
      return userLookup ? userLookup.alias : "Unknown";
    }
  };

  /**
   * The JSX element for the payment info modal footer.
   * @returns The JSX of the footer.
   */
  const totalFeesFooter = () => {
    return (
      <div>
        {selectedMessage?.sender == props.selfInfo.address
          ? "Total Fees Paid:"
          : ""}
        <b>
          {`${cryptoUtils.msatToCurrentCryptoUnit(
            props,
            selectedMessage ? selectedMessage.totalFeesMsat : 0
          )}`}
        </b>
        {`${props.selectedCryptoUnit}`}
        <b>
          {`  /  ${cryptoUtils.msatAmtToFiat(
            props,
            selectedMessage ? selectedMessage.totalFeesMsat : 0
          )}`}
        </b>
        {` ${props.selectedFiatUnit}`}
      </div>
    );
  };

  /**
   * Month index to month string.
   */
  const monthToStr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  /**
   * Returns a string representing a unix timestamp date representation
   * @param {*} unix The unix timestamp
   * @return {string} The date string
   */
  const unixToDate = (unix) => {
    const date = new Date(unix * 1000);
    const now = new Date();
    let format;
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    if (
      now.getMonth() === date.getMonth() &&
      now.getDate() === date.getDate()
    ) {
      format = hours + ":" + minutes.substr(-2);
    } else {
      format = monthToStr[date.getMonth()] + "-" + date.getDate();
      if (now.getUTCFullYear() !== date.getUTCFullYear()) {
        format += "-" + date.getFullYear();
      }
      format += " " + hours + ":" + minutes.substr(-2);
    }

    return format;
  };

  /**
   * The chat history JSX
   */
  return (
    <>
      <div className="chat-history">
        <div
          className="chat-hIstory-header"
          style={{
            backgroundColor: theme.menuDarkLite,
          }}
        >
          <DoubleRightOutlined
            className="chatHistoryArrow"
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
          <div className="chat-history-header-UserIcon">{chatHistoryIcon}</div>
          <div className="chat-history-header-UserName">
            {" "}
            {chatHistoryUsrName}
          </div>
          <Dropdown
            className="chat-history-dropdοwn"
            trigger="click"
            overlay={
              <Menu>
                <Menu.Item
                  onClick={() => {
                    setStatisticsModalVisible(true);
                  }}
                >
                  Discussion Statistics
                </Menu.Item>
              </Menu>
            }
          >
            <Button className="chat-history-btn">
              <EllipsisOutlined />
            </Button>
          </Dropdown>
        </div>
        <div className="chat-history-content">
          <Layout className="chat-history-layout">
            <Layout.Content
              className="contentBody"
              onMouseDown={(e) => {
                if (window.innerWidth > window.innerHeight) {
                  e.preventDefault();
                  document.getElementById("messageInputArea")?.focus();
                }
              }}
            >
              <div
                className="chatHistoryList"
                id="chatHistoryListId"
                style={{
                  backgroundColor:
                    anonymousActive || props.anonymousBucket
                      ? "rgb(35, 35, 35)"
                      : "rgb(45, 45, 65)",
                }}
              >
                <div
                  className="chat-history-arrowMore"
                  style={{
                    left: props.sideSquashed ? "calc(50%)" : "calc(50% + 50px)",
                    bottom: atBottom() ? "-1000px" : "50px",
                    opacity: atBottom() ? "0" : "100",
                  }}
                >
                  <DownCircleOutlined
                    style={{
                      color: props.chatHistory.length
                        ? props.chatHistory[props.chatHistory.length - 1].id ===
                          lastMessageSeen
                          ? "white"
                          : "cyan"
                        : "white",
                    }}
                    onClick={() => {
                      updateChatScroll();
                      if (props.chatHistory.length !== 0) {
                        updateLastMessageSeen(props.chatHistory);
                      }
                    }}
                  />
                </div>
                <div>
                  <Button
                    className="chat-history-DownCircleOutlined-button"
                    style={{
                      display:
                        props.chatHistory.length >= 10 && !noMoreHistory
                          ? "inherit"
                          : "none",
                    }}
                    onClick={() => {
                      let elem = document.getElementById("chatHistoryListId");
                      setOldListHeight(elem.scrollHeight);
                      loadHistory(false, props.selectedDiscussion.id);
                    }}
                  >
                    Load More Messages
                  </Button>
                  <List
                    dataSource={props.chatHistory}
                    locale={{
                      emptyText: (
                        <div>
                          <LoadingOutlined
                            className="chat-history-loadingOutlined"
                            style={{
                              display: pageLoaded ? "none" : "inherit",
                            }}
                            spin
                          />
                          <h2
                            style={{
                              display: pageLoaded ? "inherit" : "none",
                            }}
                          >
                            {props.anonymousBucket
                              ? "No anonymous messages received"
                              : "Send your first message!"}
                          </h2>
                        </div>
                      ),
                    }}
                    renderItem={(item) => {
                      return (
                        <List.Item className="chat-history-listItem">
                          <div
                            className="chatHistoryFlexWrapper"
                            style={{
                              flexDirection: calculateFlexRowDirection(item),
                              textAlign: calculateTextAlign(item),
                            }}
                          >
                            <div
                              className="chatHistoryFlexWrapperAfter"
                              style={{
                                display: props.chatIdenticons
                                  ? "inherit"
                                  : "none",
                                opacity: item["merge"] ? "0" : "1",
                              }}
                              onClick={() => {
                                setUserPreviewUser(
                                  findUserByAddress(props, item.sender)
                                );
                                setUserPreviewVisible(true);
                              }}
                            >
                              {generateIdenticon(item.sender, 25)}
                            </div>
                            <div
                              className="chatHistoryMessageWrapper"
                              style={{
                                marginTop: item["merge"] ? "0px" : "5px",
                              }}
                            >
                              <div
                                style={{
                                  display:
                                    item["merge"] === true &&
                                    item.payload &&
                                    item.amtMsat < 15000
                                      ? "none"
                                      : "flex",
                                  flexDirection:
                                    calculateFlexRowDirection(item),
                                  fontSize: "13px",
                                }}
                              >
                                <div className="chatHistoryMessageWrapperDiv">
                                  <b
                                    className="chat-history-interlocutorsName"
                                    style={{
                                      color:
                                        calculateChatHistoryMessageColor(item),
                                    }}
                                    onClick={() => {
                                      setUserPreviewUser(
                                        findUserByAddress(props, item.sender)
                                      );
                                      setUserPreviewVisible(true);
                                    }}
                                  >
                                    {findSenderName(item) !==
                                    props.selfInfo.alias
                                      ? findSenderName(item)
                                      : "You"}
                                  </b>
                                </div>
                                <Divider type="vertical" />
                                <div className="chatHistoryMessageWrapperDivider">
                                  {unixToDate(item.sentTimestamp.seconds)}
                                </div>
                                <Divider type="vertical" />
                                <span className="chatHistoryCost">
                                  <span
                                    className="chat-history-spanAfterDivider"
                                    style={{
                                      color:
                                        findSenderName(item) !==
                                        props.selfInfo.alias
                                          ? "green"
                                          : "red",
                                      paddingLeft: item.payload ? "0px" : "5px",
                                    }}
                                    onClick={() => {
                                      setSelectedMessage(item);
                                      setFeeModalVisible(true);
                                    }}
                                  >
                                    {`${cryptoUtils.msatToCurrentCryptoUnit(
                                      props,
                                      parseInt(item.amtMsat) +
                                        parseInt(item.totalFeesMsat)
                                    )}`}
                                  </span>
                                  <span>{props.selectedCryptoUnit}</span>
                                  <span
                                    className="chat-history-padding"
                                    style={{
                                      display: item.payload
                                        ? "none"
                                        : "inherit",
                                    }}
                                  >
                                    {findSenderName(item) !==
                                    props.selfInfo.alias
                                      ? "from"
                                      : "to"}
                                    <span className="chat-history-padding">
                                      {props.selectedDiscussion.participantsList
                                        .length > 1
                                        ? findSenderName(item) !==
                                          props.selfInfo.alias
                                          ? findSenderName(item)
                                          : "everyone"
                                        : concatUserNames(props, [
                                          props.selectedDiscussion
                                            .participantsList[0],
                                        ])}
                                    </span>
                                  </span>
                                </span>
                                <Divider type="vertical" />
                                <span
                                  style={{
                                    color: item.senderVerified
                                      ? "green"
                                      : "red",
                                  }}
                                >
                                  <Tooltip
                                    title={
                                      item.senderVerified
                                        ? "Verified Message"
                                        : "Unverified Message"
                                    }
                                  >
                                    {item.senderVerified ? (
                                      item.sender === props.selfInfo.address ? (
                                        <CheckOutlined />
                                      ) : (
                                        <SafetyOutlined />
                                      )
                                    ) : (
                                      <CloseCircleOutlined />
                                    )}
                                  </Tooltip>
                                </span>
                                <span
                                  className="chat-history-setSelectedMessage"
                                  style={{
                                    display:
                                      calculatePartialFailureIndicatorDisplay(
                                        item
                                      ),
                                  }}
                                  onClick={() => {
                                    setSelectedMessage(item);
                                    setFeeModalVisible(true);
                                  }}
                                >
                                  <Tooltip title="Some users did not receive the message / payment">
                                    <ExclamationCircleOutlined />
                                  </Tooltip>
                                </span>
                              </div>
                              <div
                                className="chatHistoryMessage"
                                style={{
                                  backgroundColor:
                                    findSenderName(item) ===
                                    props.selfInfo.alias
                                      ? props.myMessageColor
                                      : props.otherMessageColor,
                                  display: item.payload
                                    ? "inline-block"
                                    : "none",
                                  maxWidth:
                                    props.chatLayout === "normal"
                                      ? "60%"
                                      : "80%",
                                }}
                              >
                                {payloadToDom(
                                  props,
                                  item.payload,
                                  item.sender === props.selfInfo.address,
                                  item.amtMsat
                                )}
                              </div>
                            </div>
                          </div>
                        </List.Item>
                      );
                    }}
                  />
                </div>
              </div>
            </Layout.Content>
            <footer
              className="chat-history-footer"
              style={{
                backgroundColor: theme.menuDarkLite,
                display:
                  props.selectedPage === "chatHistory" && !props.anonymousBucket
                    ? "block"
                    : "none",
              }}
            >
              <ChatHistoryInput
                {...props}
                updateLastMessageSeen={updateLastMessageSeen}
                updateChatScroll={updateChatScroll}
                anonymousActive={anonymousActive}
                setAnonymousActive={setAnonymousActive}
              />
            </footer>
          </Layout>

          <Modal
            visible={!!feeModalVisible}
            title={
              selectedMessage?.sender == props.selfInfo.address ? (
                <div className="chat-history-feeModal">
                  <p className="chat-history-feeModal-text">
                    Received by{" "}
                    {concatUserNames(
                      props,
                      routesToAddresses(selectedMessage?.paymentRoutesList)
                    )}
                  </p>
                  <Button
                    className="chat-history-feeModal-button"
                    type="default"
                    onClick={() => {
                      setRawMessageInfoModalVisible(true);
                    }}
                  >
                    Raw Message
                  </Button>
                </div>
              ) : (
                <div className="chat-history-feeModal">
                  <p className="chat-history-feeModal-text">Received by you</p>
                  <Button
                    className="chat-history-feeModal-button"
                    type="default"
                    onClick={() => {
                      setRawMessageInfoModalVisible(true);
                    }}
                  >
                    Raw Message
                  </Button>
                </div>
              )
            }
            footer={[
              <span key="" className="chat-history-footer-span">
                {`Total Amount ${
                  selectedMessage
                    ? selectedMessage.sender === props.selfInfo.address
                      ? "Sent: "
                      : "Received: "
                    : ""
                }`}
                <b>
                  {`${cryptoUtils.msatToCurrentCryptoUnit(
                    props,
                    selectedMessage ? selectedMessage.amtMsat : 0
                  )}`}
                </b>
                {`${props.selectedCryptoUnit}`}
                <b>
                  {`  /  ${cryptoUtils.msatAmtToFiat(
                    props,
                    selectedMessage ? selectedMessage.amtMsat : 0
                  )}`}
                </b>
                {` ${props.selectedFiatUnit}`}
                <br />
                {selectedMessage?.sender === props.selfInfo.address
                  ? totalFeesFooter()
                  : ""}
              </span>,
              <Button
                key="ok"
                onClick={() => {
                  setFeeModalVisible(false);
                }}
              >
                OK
              </Button>,
            ]}
            onOk={() => {
              setFeeModalVisible(false);
            }}
            onCancel={() => {
              setFeeModalVisible(false);
            }}
            cancelButtonProps={{ style: { display: "none" } }}
          >
            {selectedMessage?.sender === props.selfInfo.address ? (
              <MessageInfo {...props} selectedMessage={selectedMessage} />
            ) : (
              "You can not retrieve payment information for received messages"
            )}
          </Modal>
          <Modal
            title={"Message information"}
            visible={rawMessageInfoModalVisible}
            onOk={() => {
              setRawMessageInfoModalVisible(false);
            }}
            onCancel={() => {
              setRawMessageInfoModalVisible(false);
            }}
          >
            Raw data of the arc message
            <JSONPretty id="json-pretty" data={selectedMessage ? JSON.parse(selectedMessage.payload) : {}}></JSONPretty>
          </Modal>
          <UserPreview
            {...props}
            visible={userPreviewVisible}
            setVisible={setUserPreviewVisible}
            user={userPreviewUser}
          />
          <Modal
            title={"Discussion Statistics"}
            visible={statisticsModalVisible}
            onOk={() => {
              setStatisticsModalVisible(false);
            }}
            onCancel={() => {
              setStatisticsModalVisible(false);
            }}
            cancelButtonProps={{ style: { display: "none" } }}
          >
            <ChatHistoryStatistics {...props} />
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ChatHistory;
