import React from "react";

import { Modal } from "antd";

import { NotificationManager } from "react-notifications";

import { findAlias, findContactName } from "../../utils/discussion-utils";
import generateIdenticon from "../../utils/identicon.js";

import "./user-preview.css";

/**
 * This component represents the modal for previewing a user.
 * @param {*} props The global variables.
 * @returns The JSX of the component.
 */
const UserPreview = (props) => {
  return (
    <div>
      <Modal
        visible={props.visible}
        title={
          <div>
            <span className="user-preview-modal">
              {generateIdenticon(props.user?.address, 45)}
            </span>
            {`${findContactName(props, props.user?.address)} (${findAlias(
              props,
              props.user?.address
            )})`}
          </div>
        }
        onOk={() => {
          props.setVisible(false);
        }}
        cancelButtonProps={{ style: { display: "none" } }}
        onCancel={() => {
          props.setVisible(false);
        }}
      >
        <input
          id={"userPreviewAddress"}
          value={props.user?.address}
          onChange={() => {}}
        />
        Address:
        <br />
        <span
          className="user-preview-address"
          onClick={() => {
            let copyText = document.getElementById("userPreviewAddress");
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            document.execCommand("copy");
            NotificationManager.info("Copied to clipboard");
          }}
        >
          {props.user?.address}
        </span>
      </Modal>
    </div>
  );
};

export default UserPreview;
