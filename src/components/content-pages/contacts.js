import React, { useState } from "react";
import { Button, List, Modal } from "antd";
import { UserDeleteOutlined, MessageOutlined } from "@ant-design/icons";
import { NotificationManager } from "react-notifications";

import contactClient from "../../services/contactServices";
import discussionClient from "../../services/discussionServices";
import "./contacts.css";
import theme from "../../style/theme";
import { DoubleRightOutlined } from "@ant-design/icons";

/**
 * This component represents the contacts page.
 * This page manages the user's contacts.
 * @param {*} props The global variables.
 */
const Contacts = (props) => {
  const [contactRemoveModalActive, setContactRemoveModalActive] =
    useState(false);
  const [userSelected, setUserSelected] = useState();

  /**
   * Deletes the currently selected user (userSelected) from contacts.
   */
  const deleteContact = () => {
    contactClient().removeContactByAddress(
      {
        address: userSelected.address,
      },
      (err, res) => {
        if (err) {
          console.log(err);
          NotificationManager.warning("Failed to remove contact");
        }
        if (res) {
          NotificationManager.info("Contact Removed");
        }
      }
    );
    props.setContacts(
      props.contacts.filter((item) => {
        return item.user.address !== userSelected.address;
      })
    );
    setContactRemoveModalActive(false);
  };

  /**
   * The contacts page JSX.
   */
  return (
    <>
      <div className="contacts">
        <div
          className="contacts-header"
          style={{
            backgroundColor: theme.menuDarkLite,
          }}
          onClick={() => {
            if (props.sideActivated === true) {
              props.setSideActivated(false);
            }
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
          <div className="contacts-header-text">Contacts</div>
        </div>
        <div
          className="contacts-body"
          onClick={() => {
            props.setSideActivated(false);
          }}
        >
          <List
            locale={{
              emptyText: "No Contacts",
            }}
            className="contacts-list"
            placeholder=""
            dataSource={props.contacts || undefined}
            itemLayout="horizontal"
            renderItem={(item) => {
              let inDiscussion =
                props.discussions.length !== 0
                  ? props.discussions.find((elem) => {
                    return (
                      elem.participantsList.includes(item.user.address) &&
                        elem.participantsList.length === 1
                    );
                  })
                  : false;
              return (
                <List.Item className="userSearchContainer">
                  <div className="userSearchContainerAfter">
                    {`${item.displayName ? item.displayName : ""} (${
                      item.user.alias
                    })`}
                  </div>
                  Address:
                  <div className="userSearchContainerAddress">
                    {` ${item.user.address}`}
                  </div>
                  <br />
                  <Button
                    className="userSearchContainerButton"
                    onClick={() => {
                      setUserSelected(item.user);
                      setContactRemoveModalActive(true);
                    }}
                  >
                    {<UserDeleteOutlined className="userDeleteOutlined" />}
                  </Button>
                  <Button
                    className="userDeleteOutlinedButton"
                    onClick={() => {
                      if (inDiscussion) {
                        console.log("already in discussion");
                        props.setSelectedDiscussion(inDiscussion);
                        props.setSelectedPage("chatHistory");
                      } else {
                        console.log("creating discussion:", item.user.address);
                        discussionClient().addDiscussion(
                          {
                            discussion: {
                              participants: [item.user.address],
                              options: {
                                anonymous: false,
                              },
                            },
                          },
                          (err, res) => {
                            if (err) {
                              console.log(err);
                              NotificationManager.warning(
                                "Failed to add discussion"
                              );
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
                      }
                    }}
                  >
                    <MessageOutlined />
                  </Button>
                </List.Item>
              );
            }}
          />
          <Modal
            visible={!!contactRemoveModalActive}
            title="Deleting Contact"
            onOk={() => {
              deleteContact();
            }}
            onCancel={() => {
              setContactRemoveModalActive(false);
            }}
            okButtonProps={{ type: "default" }}
          >
            You are removing
            {` ${userSelected ? userSelected.alias : "Unknown"} `}
            from contacts.
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Contacts;
