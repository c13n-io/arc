import React, { useState } from "react";

import ChatHistory from "./content-pages/chat-history";
import UserSettings from "./content-pages/user-settings";
import UserFunds from "./content-pages/user-funds";
import SearchUsers from "./content-pages/search-users";
import Contacts from "./content-pages/contacts";
import Logo from "./content-pages/logo";
import Accounts from "./accounts";
import VersionScreen from "./content-pages/version-error";
import ConnectionScreen from "./content-pages/connection-screen";
import GroupChat from "./content-pages/group-chat";

import "./contents.css";
/**
 * This component represents the main area of the application.
 * It returns the corresponding page based on props.selectedPage.
 *
 * @param {*} props The global variables.
 */
const Contents = (props) => {
  // Variable to indicate if current discussion is the anonymous received messages discussion
  const [
    anonymousBucket,
    setAnonymousBucket
  ] = useState(false);

  const contentsProps = {
    anonymousBucket,
    setAnonymousBucket,
  };

  /**
   * This function returns the corresponding page for the currently selected page.
   * The returned page is loaded in the body of this component.
   */
  const getContentPage = () => {
    let page;
    switch (props.selectedPage) {
    case "chatHistory":
      page = <ChatHistory {...props} {...contentsProps} />;
      break;
    case "userSettings":
      page = <UserSettings {...props} />;
      break;
    case "searchUsers":
      page = <SearchUsers {...props} />;
      break;
    case "contacts":
      page = <Contacts {...props} />;
      break;
    case "logo":
      page = <Logo {...props} />;
      break;
    case "accounts":
      page = <Accounts {...props} />;
      break;
    case "userFunds":
      page = <UserFunds {...props} />;
      break;
    case "versionError":
      page = <VersionScreen {...props} />;
      break;
    case "connectionScreen":
      page = <ConnectionScreen />;
      break;
    case "groupChat":
      page = <GroupChat {...props} />;
    }
    return page;
  };

  /**
   * The contents page JSX.
   */
  return (
    <div
      className="content-body"
      onClick={() => {
        if (props.sideActivated === true) {
          props.setSideActivated(false);
        }
      }}
    >
      {getContentPage()}
    </div>
  );
};

export default Contents;
