import React, { useState, useEffect } from "react";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import WindowSizeListener from "react-window-size-listener";

import Contents from "./contents";
import Side from "./side";
import FundsInitialization from "./content-pages/funds-initialization";

import contactClient from "../services/contactServices";
import discussionClient from "../services/discussionServices";
import nodeInfoClient from "../services/nodeInfoServices";
import messageClient from "../services/messageServices";

import getExchangeRates from "../utils/fiat-rates";
import sleep from "../utils/system";
import { addToAccounts, loadAccounts } from "../utils/accounts-utils";
import {
  loadAutomaticImageLoadingSetting,
  loadSmoothAnimationsSetting,
  loadSelectedCryptoUnit,
  loadSelectedFiatUnit,
  loadChatIdenticonsSetting,
  loadChatLayoutSetting,
  loadMyMessageColor,
  loadOtherMessageColor,
  loadDeveloperLogsSetting,
} from "../utils/settings";

import { appendToChatHistory } from "../utils/discussion-utils";

import c13nLogo from "../media/C13N_Logo.png";
import notificationAudio from "../media/notification.mp3";

import { concatUserNames } from "../utils/discussion-utils";
import channelClient from "../services/channelServices";
import "./main.css";

const { GetDiscussionsResponse } = require("../rpc/rpc_pb");
const { SubscribeMessageResponse } = require("../rpc/rpc_pb");

const cryptoUtils = require("../utils/crypto-utils");

/**
 * Root component of the application. Must be nested inside a notification
 * manager wrapper for notifications to work.
 */

const Main = () => {
  // Connection Variables
  const [initialConnection, setInitialConnection] = useState(true);
  const [backendStatus, setBackendStatus] = useState(false);
  const [msgRxUp, setMsgRxUp] = useState(0);
  const [msgStreamActive, setMsgStreamActive] = useState(false);
  const [backendVersion, setBackendVersion] = useState("");

  // Node Variables
  const [selfInfo, setSelfInfo] = useState();
  const [chainInfo, setChainInfo] = useState();
  const [contacts, setContacts] = useState();
  const [users, setUsers] = useState([]);
  const [currentFunds, setCurrentFunds] = useState(-1);
  const [lastFundChange, setLastFundChange] = useState(0);

  // Discussion Variables
  const [discussions, setDiscussions] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState();
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  // Account Variables
  const [accounts, setAccounts] = useState([]);
  const [loadAccount, setLoadAccount] = useState(0);

  // View Variables
  const [selectedPage, setSelectedPage] = useState("accounts");
  const [sideSquashed, setSideSquashed] = useState(false);
  const [sideActivated, setSideActivated] = useState(false);

  // Settings Variables
  const [automaticImageLoading, setAutomaticImageLoading] = useState(false);
  const [smoothAnimations, setSmoothAnimations] = useState(false);
  const [selectedCryptoUnit, setSelectedCryptoUnit] = useState();
  const [selectedFiatUnit, setSelectedFiatUnit] = useState();
  const [chatLayout, setChatLayout] = useState();
  const [chatIdenticons, setChatIdenticons] = useState();
  const [myMessageColor, setMyMessageColor] = useState();
  const [otherMessageColor, setOtherMessageColor] = useState();
  const [developerLogs, setDeveloperLogs] = useState();

  // Crypto Variables
  const [exchangeRates, setExchangeRates] = useState();

  // Funds Initialization Variables
  const [fundsInitVisible, setFundsInitVisible] = useState(false);
  const [fundsInitDisabled, setFundsInitDisabled] = useState(false);
  const [balance, setBalance] = useState();

  /**
   * This function loads the static data of the currently active account.
   */
  const fetchAccountData = () => {
    fetchUsers();
    fetchContacts();
    fetchDiscussions();
  };

  /**
   * Loads the application settings from local storage.
   */
  const loadSettings = () => {
    loadAutomaticImageLoadingSetting(setAutomaticImageLoading);
    loadSmoothAnimationsSetting(setSmoothAnimations);
    loadSelectedCryptoUnit(setSelectedCryptoUnit);
    loadSelectedFiatUnit(setSelectedFiatUnit);
    loadChatIdenticonsSetting(setChatIdenticons);
    loadChatLayoutSetting(setChatLayout);
    loadMyMessageColor(setMyMessageColor);
    loadOtherMessageColor(setOtherMessageColor);
    loadDeveloperLogsSetting(setDeveloperLogs);
  };

  /**
   * Changes the active contents page.
   * @param {*} pageName Name of the page.
   * @param {*} sideMenuAction Side bar behavior (if set to 'hide' it will automatically close the side bar on the mobile view).
   */
  const changePage = (pageName, sideMenuAction) => {
    setSelectedDiscussion();
    setSelectedPage(pageName);
    if (sideMenuAction === "hide") {
      setSideActivated(false);
    }
  };

  /**
   * Calculates if the welcome dialog for funds initialization should be displayed.
   */
  const calculateFundsInitialization = () => {
    let modalDisabled;
    setFundsInitDisabled((oldValue) => {
      modalDisabled = oldValue;
      return oldValue;
    });
    nodeInfoClient().getSelfBalance({}, (err, res) => {
      if (err) {
        console.log(err);
      }
      if (res) {
        setBalance(res);
        const channelZero =
          res.channelLocalMsat === 0 && res.pendingOpenLocalMsat === 0;
        if (channelZero && !modalDisabled) {
          setFundsInitVisible(true);
        }
      }
    });
  };

  /**
   * Updates current funds and triggers the balance change indicator.
   */
  const updateCurrentFunds = () => {
    nodeInfoClient().getSelfBalance({}, (err, res) => {
      if (err) {
        console.log(err);
      }
      if (res) {
        if (res.channelLocalMsat) {
          const newAmount = Math.floor(res.channelLocalMsat / 1000);
          let oldAmount = currentFunds;
          setCurrentFunds((oldFunds) => {
            oldAmount = oldFunds;
            return newAmount;
          });
          let fundColor;
          if (oldAmount === -1) {
            fundColor = "white";
          } else if (newAmount > oldAmount) {
            fundColor = "#00FF00";
          } else if (newAmount < oldAmount) {
            fundColor = "#FF0000";
          } else if (newAmount === oldAmount) {
            fundColor = "white";
          }
          let fundsWrapper = document.getElementById("currentFundsWrapper");
          setTimeout(function () {
            fundsWrapper.style.transition = "0s";
            fundsWrapper.style.color = fundColor;
          }, 1);
          setTimeout(function () {
            fundsWrapper.style.transition = smoothAnimations ? "0.4s" : "0s";
            fundsWrapper.style.color = "white";
          }, 200);
          setTimeout(function () {
            setLastFundChange(0);
          }, 4000);
        }
      }
    });
  };

  const mainProps = {
    users,
    setUsers,
    selfInfo,
    setSelfInfo,
    selectedDiscussion,
    setSelectedDiscussion,
    contacts,
    setContacts,
    chatHistory,
    setChatHistory,
    selectedPage,
    setSelectedPage,
    backendStatus,
    setBackendStatus,
    discussions,
    setDiscussions,
    accounts,
    setAccounts,
    fetchAccountData,
    loadAccount,
    setLoadAccount,
    sideSquashed,
    setSideSquashed,
    sideActivated,
    setSideActivated,
    automaticImageLoading,
    setAutomaticImageLoading,
    currentFunds,
    updateCurrentFunds,
    lastFundChange,
    setLastFundChange,
    smoothAnimations,
    setSmoothAnimations,
    selectedCryptoUnit,
    setSelectedCryptoUnit,
    selectedFiatUnit,
    setSelectedFiatUnit,
    exchangeRates,
    backendVersion,
    setBackendVersion,
    chatLayout,
    setChatLayout,
    chatIdenticons,
    setChatIdenticons,
    myMessageColor,
    setMyMessageColor,
    otherMessageColor,
    setOtherMessageColor,
    selectedParticipants,
    setSelectedParticipants,
    msgStreamActive,
    developerLogs,
    setDeveloperLogs,
    changePage,
    chainInfo,
    balance,
    setFundsInitVisible,
    setFundsInitDisabled,
  };

  /**
   * This function runs asynchronously and checks for backend connection status based on fixed interval.
   */
  async function upStatusChecker() {
    while (true) {
      let deadline = new Date();
      deadline.setSeconds(deadline.getSeconds() + 4);
      nodeInfoClient().getSelfInfo(
        {},
        { deadline: deadline.getTime() },
        (err, res) => {
          if (err) {
            console.log(err);
            setBackendStatus(false);
            NotificationManager.error("Server unreachable");
          }
          if (res) {
            let initial = true;
            setInitialConnection((old) => {
              initial = old;
              return old;
            });
            let oldStatus = true;
            setBackendStatus((old) => {
              oldStatus = old;
              return old;
            });
            if (initial) {
              setChainInfo(res.chainsList[0]);
              setSelfInfo(res.info);
              addToAccounts(mainProps, {
                url: localStorage.getItem("url"),
                address: res.info.address,
                lastActive: Date.now(),
              });
              setBackendStatus(true);
            } else {
              if (oldStatus === false) {
                window.location.reload(true);
              }
            }
            setInitialConnection(false);
          }
        }
      );
      calculateFundsInitialization();
      await sleep(8000);
    }
  }

  /**
   * This function fetches the users from backend.
   */
  const fetchUsers = () => {
    console.log("Fetching Nodes...");
    nodeInfoClient().getNodes({}, (err, res) => {
      if (err) {
        console.log(err);
        NotificationManager.error("Failed to fetch network");
      }
      if (res) {
        setUsers(res.nodesList);
      }
      console.log("Done Fetching Nodes...");
    });
  };

  /**
   * This function fetches the contacts from backend.
   */
  const fetchContacts = () => {
    contactClient().getContacts({}, (err, res) => {
      if (err) {
        console.log(err);
        NotificationManager.error("Failed to fetch contacts");
      }
      if (res) {
        const parsedContacts = res.contactsList.map((item) => {
          return {
            user: item.node,
            id: item.id,
            displayName: item.displayName,
          };
        });
        setContacts(parsedContacts);
      }
    });
  };

  /**
   * This function fetches the discussions from the backend.
   */
  async function fetchDiscussions() {
    let discussionsArray = [];
    await discussionClient()
      .getDiscussions({})
      .on("data", (res) => {
        discussionsArray.push(
          GetDiscussionsResponse.toObject(true, res).discussion
        );
      })
      .on("end", () => {
        console.log("Got Discussions:", discussionsArray);
        setDiscussions(discussionsArray);
      })
      .on("error", (e) => {
        console.log("err", e);
      })
      .on("status", () => {});
  }

  const initializeExchangeRates = async () => {
    getExchangeRates(setExchangeRates);
  };

  /**
   * This function sets up the async functions that require a selected account.
   */
  useEffect(() => {
    if (loadAccount !== 0) {
      upStatusChecker();
      loadSettings();
      updateCurrentFunds();
      initializeExchangeRates();
      setInterval(() => {
        getExchangeRates(setExchangeRates);
      }, 300000);
    }
  }, [loadAccount]);

  /**
   * This function is called once when component loads.
   * It loads the saved accounts from local storage to feed them to accounts page.
   */
  useEffect(() => {
    loadAccounts(mainProps);
    if (window.innerWidth < 520) {
      setSideSquashed(true);
    }
  }, []);

  /**
   * Initializes account data and activates message subscription stream when backend status is active.
   */
  useEffect(() => {
    if (backendStatus == true && loadAccount == 1) {
      fetchAccountData();
      setMsgRxUp(true);
    }
  }, [backendStatus]);

  /**
   * This function sets up an RX stream to listen for incoming messages.
   * It is triggered by changes on variable 'msgRxUp', when it is false, it sets up
   * the stream and switches it to true.
   */
  useEffect(async () => {
    let streamValue;
    await setMsgStreamActive((oldValue) => {
      streamValue = oldValue;
      return oldValue;
    });
    if (!streamValue && loadAccount == 1) {
      console.log("Subscribing to messages...");
      let startTime = new Date();
      let deadline = new Date();
      deadline.setHours(deadline.getHours() + 2400);
      await sleep(1000);
      setMsgStreamActive(true);
      messageClient()
        .subscribeMessages({}, { deadline: deadline.getTime() })
        .on("data", (resp) => {
          try {
            const res = SubscribeMessageResponse.toObject(resp, resp);
            setUsers((oldUsers) => {
              mainProps["users"] = oldUsers;
              return oldUsers;
            });
            updateCurrentFunds();
            setLastFundChange(`+${Number(res.receivedMessage.amtMsat / 1000)}`);
            let curPage;
            setSelectedPage((oldPage) => {
              curPage = oldPage;
              return oldPage;
            });
            if (curPage !== "accounts") {
              console.log("Received: ", res);
              let alias;
              let discussion;

              // Attempt to find what discussion the received message is part of
              setDiscussions((oldDiscussions) => {
                discussion = oldDiscussions.find((elem) => {
                  return elem.id === res.receivedMessage.discussionId;
                });
                if (discussion === undefined) {
                  fetchDiscussions();
                }
                return oldDiscussions;
              });

              // Look up the user who sent the message
              setUsers((oldUsers) => {
                let aliasLookup = oldUsers.find((elem) => {
                  return elem.address === res.receivedMessage.sender;
                });
                if (aliasLookup) {
                  alias = aliasLookup.alias;
                } else {
                  alias = "Unknown";
                }
                return oldUsers;
              });

              let directlyToRoom = false;

              setSelectedDiscussion((oldSelectedDiscussion) => {
                if (oldSelectedDiscussion) {
                  if (
                    oldSelectedDiscussion.id ===
                    res.receivedMessage.discussionId
                  ) {
                    directlyToRoom = true;
                  }
                }
                return oldSelectedDiscussion;
              });

              if (directlyToRoom) {
                appendToChatHistory(mainProps, res.receivedMessage);
              }

              if (!document.hasFocus()) {
                let audio = new Audio(notificationAudio);
                audio.play();
                let message = {};
                try {
                  message = JSON.parse(res.receivedMessage.payload);
                } catch (e) {
                  message.content = res.receivedMessage.payload;
                }
                new Notification(
                  `${
                    concatUserNames(mainProps, [res.receivedMessage.sender]) ||
                    "Unknown"
                  }: ${
                    !message.content
                      ? `Sent you ${cryptoUtils.msatToCurrentCryptoUnit(
                        mainProps,
                        res.receivedMessage.amtMsat
                      )}${selectedCryptoUnit}`
                      : message.content.length < 30
                        ? message.content
                        : message.content.substring(0, 25) + "..."
                  }`,
                  {
                    icon: c13nLogo,
                  }
                );
              }

              if (discussion) {
                discussion.lastMsgId = res.receivedMessage.id;
                if (!directlyToRoom) {
                  NotificationManager.info(
                    `${
                      res.receivedMessage.payload === ""
                        ? `Sent you ${cryptoUtils.msatToCurrentCryptoUnit(
                          mainProps,
                          res.receivedMessage.amtMsat
                        )}${selectedCryptoUnit}`
                        : res.receivedMessage.payload.length < 20
                          ? res.receivedMessage.payload
                          : res.receivedMessage.payload.substring(0, 15) + "..."
                    }`,
                    `${alias || "Unknown"}:`,
                    4000,
                    () => {
                      setSelectedPage("chatHistory");
                      setSelectedDiscussion(discussion);
                    }
                  );
                }
              } else {
                NotificationManager.info("", "New Discussion!", 4000);
              }
            }
          } catch (err) {
            console.log("MessageSub err: ", err);
          }
        })
        .on("end", () => {
          console.log("MsgRx Stopped");
          console.log("MsgRxUp: ", msgRxUp);
        })
        .on("error", (e) => {
          setMsgStreamActive(false);
          setMsgRxUp(Date.now());
          console.log(
            "Stream was active for: ",
            new Date().getTime() - startTime.getTime()
          );
          console.log("Stopping Async Rx Function");
          console.log("err", e);
        })
        .on("status", (e) => {
          console.log("Subscription status");
        });
    }
  }, [msgRxUp]);

  // This funciton is used in order to test that the notifications are working as expected.
  const showTestNotification = () => {
    NotificationManager.success("copied", "", 1000);
  };

  /**
   * The main page JSX.
   */
  return (
    <>
      <div
        className="main-page"
        onClick={
          !("Notification" in window)
            ? console.log("This browser does not support notifications.")
            : () => {
              Notification.requestPermission();
            }
        }
      >
        <NotificationContainer
          enterTimeout={smoothAnimations ? 200 : 0}
          leaveTimeout={smoothAnimations ? 200 : 0}
        />
        <WindowSizeListener
          onResize={(size) => {
            let width = size.windowWidth;
            if (selectedPage === "chatHistory") {
              let element = document.getElementById("chatHistoryListId");
              if (element) {
                element.scroll({
                  top: element.scrollHeight,
                  behavior: smoothAnimations ? "smooth" : "auto",
                });
              }
            }
            if (width < 620) {
              setSideSquashed(true);
            } else {
              setSideSquashed(false);
              setSideActivated(false);
            }
          }}
        >
          <Side {...mainProps} />
          <Contents {...mainProps} />
        </WindowSizeListener>
        <FundsInitialization
          {...mainProps}
          visible={fundsInitVisible}
          setVisible={setFundsInitVisible}
          balance={balance}
          setDisabled={setFundsInitDisabled}
        />
      </div>
    </>
  );
};

export default Main;
