import React, { useState } from "react";
import { Button, Input, List, Modal } from "antd";
import {
  SearchOutlined,
  LoadingOutlined,
  PlusOutlined,
  MinusOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { NotificationManager } from "react-notifications";

import nodeInfoClient from "../../services/nodeInfoServices";
import discussionClient from "../../services/discussionServices";
import "./group-chat.css";
import theme from "../../style/theme";
import { DoubleRightOutlined } from "@ant-design/icons";

/**
 * This component represents the contacts page.
 * This page manages the user's contacts.
 * @param {*} props The global variables.
 */
const GroupChat = (props) => {
  const [aliasToSearch, setAliasToSearch] = useState("");
  const [searchedAlias, setSearchedAlias] = useState();
  const [searchLoading, setSearchLoading] = useState(false);

  const [searchGroupTouched, setSearchGroupTouched] = useState(false);

  const enteredGroupIsValid = aliasToSearch.length >= 4;
  const groupInputIsInvalid = !enteredGroupIsValid && searchGroupTouched;

  const [groupModalVisible, setGroupModalVisible] = useState(false);

  /**
   * Check if given user belongs in the participant list.
   * @param {*} user The user object.
   * @returns Found status.
   */
  const isInParticipants = (user) => {
    let res = props.selectedParticipants.find((elem) => {
      if (elem.address == user.address) {
        return true;
      } else {
        return false;
      }
    });
    return res;
  };

  /**
   * Creates the formed group discussion.
   */
  const createGroupDiscussion = () => {
    if (props.selectedParticipants.length > 1) {
      let addr_list = [];
      props.selectedParticipants.forEach((elem) => {
        addr_list.push(elem.address);
      });
      console.log(addr_list);
      discussionClient().addDiscussion(
        {
          discussion: {
            participants: addr_list,
            options: {
              anonymous: false,
            },
          },
        },
        (err, res) => {
          if (err) {
            console.log(err);
            NotificationManager.warning("Failed to add discussion");
          }
          if (res) {
            console.log(res);
            props.setDiscussions((oldDiscussions) => {
              return oldDiscussions.concat(res.discussion);
            });
            props.setSelectedDiscussion(res.discussion);
            props.setSelectedPage("chatHistory");
          }
        }
      );
      props.setSelectedParticipants([]);
    } else {
      NotificationManager.error("Too few participants");
    }
  };

  /**
   * Searches users based on entered alias.
   */
  const searchUsersByAlias = () => {
    setSearchLoading(true);
    nodeInfoClient().searchNodeByAlias(
      {
        alias: aliasToSearch,
      },
      (err, res) => {
        if (err) {
          console.log(err);
          NotificationManager.warning(err.message);
        }
        if (res) {
          setSearchedAlias(res.nodesList);
        }
        setSearchLoading(false);
      }
    );
  };

  const groupBlurHandler = (event) => {
    setSearchGroupTouched(true);
  };

  let groupFormIsValid = false;

  if (enteredGroupIsValid) {
    groupFormIsValid = true;
  }

  const groupFormSubmissionHandler = (event) => {
    event.preventDefault();

    setSearchGroupTouched(true);

    if (aliasToSearch.length < 4) {
      return;
    }

    setAliasToSearch("");
    setSearchGroupTouched(false);
  };

  /**
   * The group chat page JSX.
   */
  return (
    <>
      <div className="group-chat">
        <div
          className="group-chat-header"
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
          <div className="group-chat-header-text">
            Search Users on the Network
          </div>
        </div>
        <div className="group-chat-main">
          <Button
            onClick={() => {
              setGroupModalVisible(true);
            }}
          >
            Preview Group
          </Button>
          <br />
          <form onSubmit={groupFormSubmissionHandler}>
            <div className="group-chat-searchAlias-wrapper">
              <div className="group-chat-search">
                <Input
                  title="Search by alias"
                  placeholder="Enter Alias"
                  onBlur={groupBlurHandler}
                  value={aliasToSearch}
                  onChange={(e) => {
                    setAliasToSearch(e.target.value);
                  }}
                  onKeyDown={
                    groupFormIsValid
                      ? (e) => {
                        return e.key === "Enter"
                          ? e.shiftKey
                            ? undefined
                            : searchUsersByAlias()
                          : undefined;
                      }
                      : () => (
                        <p className="error-validation">
                            Minimum 4 characters
                        </p>
                      )
                  }
                  className="group-chat-input"
                />
                <Button
                  disabled={!groupFormIsValid}
                  className="group-search-button"
                  onClick={() => {
                    searchUsersByAlias();
                  }}
                >
                  {searchLoading ? (
                    <LoadingOutlined spin />
                  ) : (
                    <SearchOutlined />
                  )}
                </Button>
              </div>
              {groupInputIsInvalid && (
                <p className="error-validation">Minimum 4 characters</p>
              )}
              <List
                locale={{
                  emptyText: "Search Users by Alias",
                }}
                className="usersList"
                placeholder=""
                dataSource={searchedAlias || undefined}
                itemLayout="horizontal"
                renderItem={(item) => {
                  let inContacts;
                  if (props.contacts) {
                    inContacts = props.contacts.find((elem) => {
                      return elem.user.address === item.address;
                    });
                  }
                  let inDiscussion =
                    props.discussions.length !== 0
                      ? props.discussions.find((elem) => {
                        return elem.participantsList.includes(item.address);
                      })
                      : false;
                  return (
                    <List.Item className="userSearchContainer">
                      <div className="userSearchContainerDv">{item.alias}</div>
                      Address:
                      <div className="group-chat-address">{` ${item.address}`}</div>
                      <br />
                      <div className="group-chat-addressDv">
                        <Button
                          onClick={(e) => {
                            props.setSelectedParticipants((oldParticipants) => {
                              let filtered = oldParticipants.filter((elem) => {
                                if (item.address === elem.address) {
                                  return 0;
                                } else {
                                  return 1;
                                }
                              });
                              filtered.push(item);
                              return filtered;
                            });
                          }}
                        >
                          {isInParticipants(item) ? (
                            <CheckOutlined />
                          ) : (
                            <PlusOutlined />
                          )}
                        </Button>
                      </div>
                    </List.Item>
                  );
                }}
              />
            </div>
          </form>
          <Modal
            visible={!!groupModalVisible}
            okText="Create"
            onOk={() => {
              createGroupDiscussion();
              setGroupModalVisible(false);
            }}
            onCancel={() => {
              setGroupModalVisible(false);
            }}
          >
            <div>
              <List
                locale={{
                  emptyText: "No Participants Added",
                }}
                className="usersList"
                placeholder=""
                dataSource={props.selectedParticipants || undefined}
                itemLayout="horizontal"
                renderItem={(item) => {
                  return (
                    <List.Item className="userSearchContainer">
                      <div className="group-chat-containerDv">{item.alias}</div>
                      Address:
                      <div className="group-chat-containerDv-address">
                        {` ${item.address}`}
                      </div>
                      <Button
                        onClick={() => {
                          props.setSelectedParticipants((oldParticipants) => {
                            let filtered = oldParticipants.filter((elem) => {
                              if (item.address === elem.address) {
                                return 0;
                              } else {
                                return 1;
                              }
                            });
                            return filtered;
                          });
                        }}
                      >
                        <MinusOutlined />
                      </Button>
                    </List.Item>
                  );
                }}
              />
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default GroupChat;
