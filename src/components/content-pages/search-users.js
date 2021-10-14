import React, { useState, useEffect } from "react";
import { Button, Input, List, Modal } from "antd";
import {
  SearchOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  MessageOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { NotificationManager } from "react-notifications";

import contactClient from "../../services/contactServices";
import nodeInfoClient from "../../services/nodeInfoServices";
import discussionClient from "../../services/discussionServices";

import "./search-users.css";
import theme from "../../style/theme";
import { DoubleRightOutlined } from "@ant-design/icons";

/**
 * This component represents the user searching page.
 * @param {*} props The global variables.
 */
const SearchUsers = (props) => {
  // User searching related variables
  const [aliasToSearch, setaliasToSearch] = useState("");
  const [addressToSearch, setAddressToSearch] = useState("");
  const [searchedAlias, setSearchedAlias] = useState();
  const [searchedAddress, setSearchedAddress] = useState();
  const [userSelected, setUserSelected] = useState();
  const [friendlyName, setFriendlyName] = useState("");
  const [contactAddModalActive, setContactAddModalActive] = useState(false);
  const [contactRemoveModalActive, setContactRemoveModalActive] =
    useState(false);
  const [searchAliasLoading, setSearchAliasLoading] = useState(false);
  const [searchAliasEmptyText, setSearchAliasEmptyText] = useState('Search Users by Alias');
  const [searchAddressLoading, setSearchAddressLoading] = useState(false);
  const [searchAddressEmptyText, setSearchAddressEmptyText] = useState('Search Users by Alias');

  const [enteredAlias, setEnteredAlias] = useState("");
  const [searchAliasTouched, setSearchAliasTouched] = useState(false);
  const [aliasFormValid, setAliasFormValid] = useState(false);

  const [enteredAddress, setEnteredAddress] = useState("");
  const [searchAddressTouched, setSearchAddressTouched] = useState(false);
  const [addressFormValid, setAddressFormValid] = useState(false);


  const enteredAliasIsValid = () => {
    return enteredAlias.length >= 4;
  };
  const aliasInputIsInvalid = () => {
    return !enteredAliasIsValid() && searchAliasTouched;
  };

  const enteredAddressIsValid = () => {
    return enteredAddress.length >= 4;
  };
  const addressInputIsInvalid = () => {
    return !enteredAddressIsValid() && searchAddressTouched;
  };

  useEffect(() => {
    if (enteredAliasIsValid() && aliasFormValid == false) {
      setAliasFormValid(true);
    } else if (!enteredAliasIsValid() && aliasFormValid == true) {
      setAliasFormValid(false);
    }
  }, [enteredAlias]);

  useEffect(() => {
    if (enteredAddressIsValid() && addressFormValid == false) {
      setAddressFormValid(true);
    } else if (!enteredAddressIsValid() && addressFormValid == true) {
      setAddressFormValid(false);
    }
  }, [enteredAddress]);
  /**
   * Creates a new contact based on selected user and (optional) entered friendly name.
   */
  const createContact = () => {
    let req = {
      contact: {
        node: {
          alias: userSelected ? userSelected.alias : "unknown",
          address: userSelected ? userSelected.address : "unknown",
        },
        id: 20,
        displayName: friendlyName !== undefined ? friendlyName : "",
      },
    };
    const parsedContact = {
      user: req.contact.node,
      id: req.contact.id,
      displayName: req.contact.displayName,
    };
    contactClient().addContact(req, (err, res) => {
      if (err) {
        console.log(err);
        NotificationManager.warning("Failed to add contact");
      }
      if (res) {
        console.log(res);
        if (props.contacts) {
          props.setContacts(props.contacts.concat([parsedContact]));
        } else {
          props.setContacts([parsedContact]);
        }
        NotificationManager.info("Contact Added");
      }
      let disc = props.discussions.find((elem) => {
        return elem.participantsList[0] === userSelected.address;
      });
      if (disc === undefined) {
        console.log("Not in discussion, creating...");
        discussionClient().addDiscussion(
          {
            discussion: {
              participants: [userSelected.address],
            },
          },
          (err, res) => {
            if (err) {
              console.log(err);
            }
            if (res) {
              console.log(res);
              props.setDiscussions((oldDiscussions) => {
                return oldDiscussions.concat(res.discussion);
              });
            }
          }
        );
      }
      setContactAddModalActive(false);
    });
  };

  /**
   * Deletes the selected contact.
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
          NotificationManager.success("Removed contact");
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
   * Searches users based on entered alias.
   */
  const searchUsersByAlias = () => {
    setSearchAliasLoading(true);
    setSearchAliasEmptyText('Loading');
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
        setSearchAliasEmptyText('No results');
        setSearchAliasLoading(false);
      }
    );
  };

  /**
   * Searches users based on entered addresses.
   */
  const searchUsersByAddress = () => {
    setSearchAddressLoading(true);
    setSearchAddressEmptyText('Loading');
    nodeInfoClient().searchNodeByAddress(
      {
        address: addressToSearch,
      },
      (err, res) => {
        if (err) {
          console.log(err);
          NotificationManager.warning(err.message);
        }
        if (res) {
          console.log(res);
          setSearchedAddress(res.nodesList);
        }
        setSearchAddressEmptyText('No results');
        setSearchAddressLoading(false);
      }
    );
  };

  /**
   * Validating if the user entered more than 4 characters and touched the inputs
   */

  const aliasInputChangeHandler = (event) => {
    setEnteredAlias(event.target.value);
    setaliasToSearch(event.target.value);
  };

  const aliasInputBlurHandler = (event) => {
    setSearchAliasTouched(true);
  };

  const aliasFormSubmissionHandler = (event) => {
    event.preventDefault();

    setSearchAliasTouched(true);

    if (enteredAlias.length < 4) {
      return;
    }

    setEnteredAlias("");
    setSearchAliasTouched(false);
  };

  const addressInputChangeHandler = (event) => {
    setEnteredAddress(event.target.value);
    setAddressToSearch(event.target.value);
  };

  const addressInputBlurHandler = (event) => {
    setSearchAddressTouched(true);
  };

  const addressFormSubmissionHandler = (event) => {
    event.preventDefault();

    setSearchAddressTouched(true);

    if (enteredAddress.length < 4) {
      return;
    }

    setEnteredAddress("");
    setSearchAddressTouched(false);
  };

  /**
   * The search users page JSX.
   */
  return (
    <>
      <div className="search-users">
        <div
          className="search-users-header"
          style={{
            backgroundColor: theme.menuDarkLite,
          }}
        >
          <div className="chatHistoryExpandForMobile">
            <DoubleRightOutlined
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
          </div>
          <div className="search-users-header-text">
            Search Users on the Network
          </div>
        </div>
        <div className="search-users-contents">
          <h3>Search Users {`(${props.users?.length} found)`}</h3>
          <form onSubmit={aliasFormSubmissionHandler}>
            <div className="search-wrapper">
              <div className="users-search">
                <Input
                  title="Search by alias"
                  className="search-users-input"
                  placeholder="Enter Alias"
                  onChange={aliasInputChangeHandler}
                  onBlur={aliasInputBlurHandler}
                  value={enteredAlias}
                  onKeyDown={
                    aliasFormValid ? (
                      (e) => {
                        return e.key === "Enter"
                          ? e.shiftKey
                            ? undefined
                            : searchUsersByAlias()
                          : undefined;
                      }
                    ) : () => (
                      <p className="error-validation">Minimum 4 characters</p>
                    )
                  }
                />
                <Button
                  className="search-users-button"
                  disabled={!aliasFormValid}
                  onClick={() => {
                    searchUsersByAlias();
                  }}
                >
                  {searchAliasLoading ? (
                    <LoadingOutlined spin />
                  ) : (
                    <SearchOutlined />
                  )}
                </Button>
              </div>
              {aliasInputIsInvalid() && (
                <p className="error-validation">Minimum 4 characters</p>
              )}
              <List
                locale={{
                  emptyText: searchAliasEmptyText,
                }}
                className="search-users-description"
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
                    <List.Item className="search-users-container">
                      <div className="search-users-containerDv">
                        {item.alias}
                      </div>
                      Address:
                      <div className="search-users-containerAddress">
                        {` ${item.address}`}
                      </div>
                      <br />
                      <div className="search-users-container-icons">
                        <Button
                          onClick={() => {
                            if (inDiscussion) {
                              console.log("already in discussion");
                              props.setSelectedDiscussion(inDiscussion);
                              props.setSelectedPage("chatHistory");
                            } else {
                              console.log("creating discussion:", item.address);
                              discussionClient().addDiscussion(
                                {
                                  discussion: {
                                    participants: [item.address],
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
                                      return oldDiscussions.concat(
                                        res.discussion
                                      );
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
                        <Button
                          className="search-users-button"
                          onClick={() => {
                            setUserSelected(item);
                            if (inContacts) {
                              setContactRemoveModalActive(true);
                            } else {
                              setContactAddModalActive(true);
                            }
                          }}
                        >
                          {inContacts ? (
                            <UserDeleteOutlined className="search-users-userDeleteOutlined" />
                          ) : (
                            <UserAddOutlined className="search-users-userAddOutlined" />
                          )}
                        </Button>
                      </div>
                    </List.Item>
                  );
                }}
              />
            </div>
          </form>
          <form onSubmit={addressFormSubmissionHandler}>
            <div className="search-wrapper">
              <div className="users-search">
                <Input
                  placeholder="Enter Address"
                  title="Search by address"
                  onChange={addressInputChangeHandler}
                  onBlur={addressInputBlurHandler}
                  onKeyDown={
                    addressFormValid ? (
                      (e) => {
                        return e.key === "Enter"
                          ? e.shiftKey
                            ? undefined
                            : searchUsersByAddress()
                          : undefined;
                      }
                    ) : () => (
                      <p className="error-validation">Minimum 4 characters</p>
                    )
                  }
                  className="search-users-input"
                />
                <Button
                  className="search-users-button"
                  onClick={() => {
                    searchUsersByAddress();
                  }}
                  disabled={!addressFormValid}
                >
                  {searchAddressLoading ? (
                    <LoadingOutlined spin />
                  ) : (
                    <SearchOutlined />
                  )}
                </Button>
              </div>
              {addressInputIsInvalid() && (
                <p className="error-validation">Minimum 4 characters</p>
              )}
              <List
                locale={{
                  emptyText: searchAddressEmptyText,
                }}
                className="search-users-description"
                placeholder=""
                dataSource={searchedAddress || undefined}
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
                      <div className="search-users-containerDv">
                        {item.alias}
                      </div>
                      Address:
                      <div className="search-users-Address">{` ${item.address}`}</div>
                      <br />
                      <div className="search-users-button">
                        <Button
                          onClick={() => {
                            if (inDiscussion) {
                              console.log("already in discussion");
                              props.setSelectedDiscussion(inDiscussion);
                              props.setSelectedPage("chatHistory");
                            } else {
                              console.log("creating discussion:", item.address);
                              discussionClient().addDiscussion(
                                {
                                  discussion: {
                                    participants: [item.address],
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
                                      return oldDiscussions.concat(
                                        res.discussion
                                      );
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
                        <Button
                          className="search-users-button"
                          onClick={() => {
                            setUserSelected(item);
                            if (inContacts) {
                              setContactRemoveModalActive(true);
                            } else {
                              setContactAddModalActive(true);
                            }
                          }}
                        >
                          {inContacts ? (
                            <UserDeleteOutlined className="search-users-userDeleteOutlined" />
                          ) : (
                            <UserAddOutlined className="search-users-userAddOutlined" />
                          )}
                        </Button>
                      </div>
                    </List.Item>
                  );
                }}
              />
              <Modal
                visible={!!contactAddModalActive}
                title="Enter Friendly name"
                onOk={() => {
                  createContact();
                }}
                onCancel={() => {
                  setContactAddModalActive(false);
                }}
                okButtonProps={{ type: "default" }}
              >
                You are adding
                {` ${userSelected ? userSelected.alias : "Unknown"} `}
                to contacts.
                <Input
                  className="search-users-inputModal"
                  onChange={(e) => {
                    setFriendlyName(e.target.value);
                  }}
                  placeholder="Friendly Name"
                />
              </Modal>
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
          </form>
        </div>
      </div>
    </>
  );
};

export default SearchUsers;
