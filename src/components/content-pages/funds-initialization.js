import React, { useState, useEffect } from "react";

import { Button, Modal, Tabs, Slider, Input, Form, Divider } from "antd";

import { splitURI } from "../../utils/users-utils";

import channelClient from "../../services/channelServices";
import nodeInfoClient from "../../services/nodeInfoServices";

import { NotificationManager } from "react-notifications";
import "./funds-initialization.css";

/**
 * This component represents the modal responsible for showing the dialog to help you bootstrap your wallet and lightning channels.
 * @param {*} props The global variables.
 * @returns The Modal JSX.
 */
const FundsInitialization = (props) => {
  const [key, setKey] = useState("1");
  const url = window.localStorage.getItem("url");
  const rtl_link = `https://${url}/rtl/lnd/onchain/receive/utxos`;
  const mainnetURI =
    "028cdd87b6f8f38d98c8a6b9bafedcd2907f68943991a4a3e7b9877887252cb692@62.38.75.208:9735";
  const testnetURI =
    "0355e471ad1cd9f9df398a47f18a5bf2f4548f4086d50c7e0ceb7b81ba931fb7ad@62.38.75.208:19735";
  const defaultAmount = 50000;
  const defaultPushAmount = Math.floor(50000 * 0.03);
  const minChannelAmount = 20000;

  const [loading, setLoading] = useState(false);

  const [mode, setMode] = useState("auto");
  const [lightningAddress, setLightningAddress] = useState("");
  const [amount, setAmount] = useState(defaultAmount);
  const [pushAmount, setPushAmount] = useState(defaultPushAmount);
  const [minimumInputConfirmations, setMinimumInputConfirmations] = useState(1);
  const [targetConfirmationBlocks, setTargetConfirmationBlocks] = useState(3);

  /**
   * Dynamically updates the push amount depending on current selected channel amount.
   */
  useEffect(() => {
    setPushAmount(Math.floor(amount * 0.03));
  }, [amount]);

  /**
   * Returns the address for channel openning depending on user selected options on the modal.
   * @returns The string representing the address.
   */
  const getAddress = () => {
    switch (mode) {
    case "auto":
      return props.chainInfo?.network === "testnet" ? testnetURI : mainnetURI;
    case "basic":
      return lightningAddress;
    case "advanced":
      return lightningAddress;
    }
  };

  /**
   * Opens a channel with selected address and options.
   * @param {*} address The address to open a channel with.
   */
  const openChannel = (address) => {
    const amtMsat = amount * 1000;
    const pushAmtMsat = pushAmount * 1000;
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
          setLoading(false);
          NotificationManager.error(err.message);
        }
        if (res) {
          console.log(res);
          setLightningAddress("");
          setAmount(defaultAmount);
          setPushAmount(defaultPushAmount);
          setMinimumInputConfirmations(1);
          setTargetConfirmationBlocks(3);
          props.setVisible(false);
          setLoading(false);
          NotificationManager.success("Channel pending to open");
        }
      }
    );
  };

  return (
    <div>
      <Modal
        title="Welcome to c13n"
        visible={props.visible}
        okText={key === "1" ? "Next" : "Open Channel"}
        cancelText={"Don't show again"}
        onCancel={() => {
          props.setVisible(false);
        }}
        cancelButtonProps={{
          onClick: () => {
            props.setDisabled(true);
            props.setVisible(false);
          },
        }}
        okButtonProps={{
          disabled: loading,
        }}
        onOk={() => {
          if (key === "1") {
            setKey("2");
          } else {
            setLoading(true);
            const addr = getAddress();
            const split = splitURI(addr);
            const address = split.address;
            const hostport = split.hostport;
            nodeInfoClient().connectNode(
              {
                address: address,
                hostport: hostport,
              },
              (err, res) => {
                if (err) {
                  console.log(err);
                  NotificationManager.error(err.message);
                  setLoading(false);
                }
                if (res) {
                  console.log(res);
                  NotificationManager.success("Connected to Peer");
                  openChannel(address);
                }
              }
            );
          }
        }}
      >
        <Tabs
          key={key}
          defaultActiveKey={key}
          onChange={(e) => {
            setKey(e);
          }}
        >
          <Tabs.TabPane tab="Buy Bitcoin" key="1">
            Before anything else, you must add some bitcoin to your wallet.
            <br />
            <br />
            <b>Step 1: Generate a receiving address</b>
            <br />
            Login to your{" "}
            <a href={rtl_link} target="_blank">
              RTL wallet
            </a>
            , select <b>On-Chain</b>, click <b>Generate Address</b> and copy it.
            <br />
            <br />
            <b>Step 2: Get some bitcoin.</b>
            <br />
            Use the copied address in one of the following services to buy
            bitcoin.
            <br />
            {props.chainInfo?.network === "mainnet" ? (
              <span>
                <a href="https://buy.moonpay.com" target="_blank">
                  MoonPay
                </a>
                <br />
                <a href="https://www.kraken.com" target="_blank">
                  Kraken
                </a>
              </span>
            ) : (
              <span>
                <a href="https://testnet-faucet.mempool.co/" target="_blank">
                  Mempool Faucet
                </a>
                <br />
                <a href="https://bitcoinfaucet.uo1.net/" target="_blank">
                  Uo1 Faucet
                </a>
              </span>
            )}
            <br />
            <br />
            You will see the funds almost immediately but you will be able to
            use them after 10-30 minutes.
          </Tabs.TabPane>

          <Tabs.TabPane tab="Open Channel" key="2">
            To enable instant messages and low-fee transactions you need to use
            some of your funds to open a Lightning Payment Channel.
            <br />
            <br />
            This is your financial relationship with another node on the
            Lightning Network. It is implemented using multi-signature Bitcoin
            transactions that share control over the commited bitcoin between
            you and that node. This relationship offers everyone security and
            privacy for both messages and payments.
            <br />
            <br />
            The funds dedicated to a channel still belong to you and you are
            able to spend them instantly and with very low fees.
            <br />
            <br />
            <Button
              type="secondary"
              className="funds-initialization-btn"
              style={{
                borderBottom:
                  mode === "auto" ? "1px solid white" : "1px solid gray",
                fontWeight: mode === "auto" ? "bold" : "normal",
              }}
              onClick={() => {
                setMode("auto");
              }}
            >
              Connect to c13n
            </Button>
            <Button
              type="secondary"
              className="funds-initialization-btn"
              style={{
                borderBottom:
                  mode !== "auto" ? "1px solid white" : "1px solid gray",
                fontWeight: mode !== "auto" ? "bold" : "normal",
              }}
              onClick={() => {
                setMode("basic");
              }}
            >
              Connect manually
            </Button>
            <Tabs
              style={{
                display:
                  key === "2" ? (mode !== "auto" ? "inherit" : "none") : "none",
              }}
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
              <Tabs.TabPane key="1" tab="Basic" />
              <Tabs.TabPane key="2" tab="Advanced" />
            </Tabs>
            <Form
              style={{
                display: key === "2" ? "inherit" : "none",
              }}
              layout="vertical"
            >
              <Form.Item
                style={{
                  display: mode !== "auto" ? "inherit" : "none",
                }}
              >
                <Divider orientation="left">Node URI</Divider>
                <Input
                  value={lightningAddress}
                  onChange={(e) => {
                    setLightningAddress(e.target.value);
                  }}
                  className="funds-initialization-input"
                />
              </Form.Item>
              <Form.Item>
                <Divider orientation="left">Amount (sat)</Divider>
                <Slider
                  min={minChannelAmount}
                  max={props.balance?.walletConfirmedSat}
                  defaultValue={defaultAmount}
                  onChange={(e) => {
                    setAmount(e);
                  }}
                />
                <Input
                  value={amount}
                  onChange={(e) => {
                    setAmount(parseFloat(e.target.value));
                  }}
                  className="funds-initialization-input"
                />
              </Form.Item>
              <Form.Item
                style={{
                  display: mode === "advanced" ? "inherit" : "none",
                }}
              >
                <Divider orientation="left">Push Amount (sat)</Divider>
                <Input
                  value={pushAmount.toString()}
                  onChange={(e) => {
                    setPushAmount(parseFloat(e.target.value));
                  }}
                  className="funds-initialization-input"
                />
              </Form.Item>
              <Form.Item
                style={{
                  display: mode === "advanced" ? "inherit" : "none",
                }}
              >
                <Divider orientation="left">
                  Minimum Input Confirmations
                </Divider>
                <Input
                  value={minimumInputConfirmations.toString()}
                  onChange={(e) => {
                    setMinimumInputConfirmations(parseFloat(e.target.value));
                  }}
                  className="funds-initialization-input"
                />
              </Form.Item>
              <Form.Item
                style={{
                  display: mode === "advanced" ? "inherit" : "none",
                }}
              >
                <Divider orientation="left">Target Confirmation Blocks</Divider>
                <Input
                  value={targetConfirmationBlocks.toString()}
                  onChange={(e) => {
                    setTargetConfirmationBlocks(parseFloat(e.target.value));
                  }}
                  className="funds-initialization-input"
                />
              </Form.Item>
            </Form>
          </Tabs.TabPane>
        </Tabs>
        <span
          className="funds-initialization-suggested"
          style={{
            display: mode === "advanced" ? "inline" : "none",
          }}
        >
          (suggested)
        </span>
      </Modal>
    </div>
  );
};

export default FundsInitialization;
