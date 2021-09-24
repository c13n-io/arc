import React, { useState } from "react";

import { Form, Divider, Modal, Input } from "antd";

import { splitURI } from "../../utils/users-utils";
import nodeInfoClient from "../../services/nodeInfoServices";

import { NotificationManager } from "react-notifications";

import "./chat-history.css";

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
                }
                if (res) {
                  console.log(res);
                  NotificationManager.success("Connected to Peer");
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
            <Divider orientation="left">Node URI</Divider>
            <Input
              value={lightningAddress}
              onChange={(e) => {
                setLightningAddress(e.target.value);
              }}
              className="connect-peer-input"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ConnectPeer;
