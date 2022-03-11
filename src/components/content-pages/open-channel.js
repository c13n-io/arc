import React, { useState } from "react";

import { Form, Divider, Modal, Input, Tabs } from "antd";

import { splitURI } from "../../utils/users-utils";

import channelClient from "../../services/channelServices";
import nodeInfoClient from "../../services/nodeInfoServices";

import { NotificationManager } from "react-notifications";

import "./open-channel.css";

const cryptoUtils = require("../../utils/crypto-utils");

/**
 * This component represents the modal for openning channels.
 * @param {*} props The global variables.
 * @returns The JSX of the modal.
 */
const OpenChannel = (props) => {
  // Modal related variables
  const [mode, setMode] = useState("basic");
  const [lightningAddress, setLightningAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [pushAmount, setPushAmount] = useState(0);
  const [minimumInputConfirmations, setMinimumInputConfirmations] = useState(1);
  const [targetConfirmationBlocks, setTargetConfirmationBlocks] = useState(3);

  /**
   * Opens a channel to the specific address with current selected options.
   * @param {*} address
   */
  const openChannel = (address) => {
    const amtMsat = cryptoUtils.currentCryptoAmtToMsat(props, amount);
    const pushAmtMsat = cryptoUtils.currentCryptoAmtToMsat(props, pushAmount);
    channelClient().openChannel(
      {
        address: address,
        amtMsat: amtMsat,
        pushAmtMsat: pushAmtMsat,
        minInputConfs: minimumInputConfirmations,
        targetConfirmationBlocks: targetConfirmationBlocks,
      },
      (err, res) => {
        if (err) {
          console.log(err);
          NotificationManager.error(err.message);
        }
        if (res) {
          console.log(res);
          setLightningAddress("");
          setAmount(0);
          setPushAmount(0);
          setMinimumInputConfirmations(1);
          setTargetConfirmationBlocks(3);
          props.setVisible(false);
          NotificationManager.success("Channel pending to open");
        }
      }
    );
  };

  return (
    <div>
      <Modal
        title="Open Channel"
        visible={props.visible}
        okText="Open"
        onCancel={() => {
          props.setVisible(false);
        }}
        onOk={async () => {
          const split = splitURI(lightningAddress);
          const address = split.address;
          const hostport = split.hostport;
          await nodeInfoClient().connectNode(
            {
              address: address,
              hostport: hostport,
            },
            (err, res) => {
              if (err) {
                console.log(err);
                NotificationManager.error(err.message);
              }
              if (res) {
                console.log(res);
                NotificationManager.success("Connected to Peer");
                openChannel(address);
              }
            }
          );
        }}
      >
        <Tabs
          defaultActiveKey="1"
          onChange={(e) => {
            switch (e) {
            case "1":
              setMode("basic");
              break;
            case "2":
              setMode("advanced");
              break;
            }
          }}
        >
          <Tabs.TabPane key="1" tab="Basic">
            <Form layout="vertical">
              <Form.Item>
                <div className="open-channel-item">
                  <Divider
                    orientation="left"
                    className="open-channel-item-text"
                  >
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
              <Form.Item>
                <div className="open-channel-item">
                  <Divider
                    orientation="left"
                    className="open-channel-item-text"
                  >
                    Amount ({props.selectedCryptoUnit})
                  </Divider>
                  <Input
                    value={amount.toString()}
                    onChange={(e) => {
                      setAmount(parseFloat(e.target.value));
                    }}
                    className="open-channel-item-input"
                  />
                </div>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="Advanced">
            <Form layout="vertical">
              <Form.Item>
                <div className="open-channel-item">
                  <Divider
                    orientation="left"
                    className="open-channel-item-text"
                  >
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
              <Form.Item>
                <div className="open-channel-item">
                  <Divider
                    orientation="left"
                    className="open-channel-item-text"
                  >
                    Amount ({props.selectedCryptoUnit})
                  </Divider>
                  <Input
                    value={amount.toString()}
                    onChange={(e) => {
                      setAmount(parseFloat(e.target.value));
                    }}
                    className="open-channel-item-input"
                  />
                </div>
              </Form.Item>
              <Form.Item>
                <div className="open-channel-item">
                  <Divider
                    orientation="left"
                    className="open-channel-item-text"
                  >
                    Push Amount
                  </Divider>
                  <Input
                    value={pushAmount.toString()}
                    onChange={(e) => {
                      setPushAmount(parseFloat(e.target.value));
                    }}
                    className="open-channel-item-input"
                  />
                </div>
              </Form.Item>
              <Form.Item>
                <div className="open-channel-item">
                  <Divider
                    orientation="left"
                    className="open-channel-item-text"
                  >
                    Minimum Input Confirmations
                  </Divider>
                  <Input
                    value={minimumInputConfirmations.toString()}
                    onChange={(e) => {
                      setMinimumInputConfirmations(parseFloat(e.target.value));
                    }}
                    className="open-channel-item-input"
                  />
                </div>
              </Form.Item>
              <Form.Item>
                <div className="open-channel-item">
                  <Divider
                    orientation="left"
                    className="open-channel-item-text"
                  >
                    Target Confirmation Blocks
                  </Divider>
                  <Input
                    value={targetConfirmationBlocks.toString()}
                    onChange={(e) => {
                      setTargetConfirmationBlocks(parseFloat(e.target.value));
                    }}
                    className="open-channel-item-input"
                  />
                </div>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    </div>
  );
};

export default OpenChannel;
