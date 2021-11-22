import React, { useState } from "react";

import { Form, Divider, Modal, Input } from "antd";

import { splitURI } from "../../utils/users-utils";
import nodeInfoClient from "../../services/nodeInfoServices";

import { NotificationManager } from "react-notifications";

import "./chat-history.css";
import "./open-channel.css";

/**
 * This component represents the modal responsible for connecting to other peers on the network.
 * @param {*} props The global variables
 * @returns
 */
const ConnectPeer = (props) => {
  const [lightningAddress, setLightningAddress] = useState("");
  return (
    <div>
      <Modal
        title="Connect to Peer"
        visible={props.visible}
        okText="Connect"
        onCancel={() => {
          props.setVisible(false);
        }}
        onOk={() => {
          console.log(lightningAddress);
          const params = splitURI(lightningAddress);
          if (params.error === "") {
            nodeInfoClient().connectNode(
              {
                address: params["address"],
                hostport: params["hostport"],
              },
              (err, res) => {
                if (err) {
                  console.log(err);
                  NotificationManager.error("Failed to connect to peer");
                }
                if (res) {
                  console.log(res);
                  NotificationManager.success("Connected to peer");
                  props.setVisible(false);
                  setLightningAddress("");
                }
              }
            );
          } else {
            NotificationManager.error("Invalid URI format");
          }
        }}
      >
        <Form layout="vertical">
          <Form.Item>
            <div className="open-channel-item">
              <Divider orientation="left" className="open-channel-item-text">
                Node URI
              </Divider>
              <Input
                value={lightningAddress}
                onChange={(e) => {
                  setLightningAddress(e.target.value);
                }}
                className="open-channel-item-input"
              />
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ConnectPeer;
