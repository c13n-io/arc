import React, { useState, useEffect } from "react";

import { Button, Modal, Tabs, Slider, Input, Form, Divider, Dropdown, Select } from "antd";

import { splitURI } from "../../utils/users-utils";

import channelClient from "../../services/channelServices";
import nodeInfoClient from "../../services/nodeInfoServices";

import { NotificationManager } from "react-notifications";
import "./funds-initialization.css";

const axios = require('axios').default;

/**
 * This component represents the modal responsible for showing the dialog to help you bootstrap your wallet and lightning channels.
 * @param {*} props The global variables.
 * @returns The Modal JSX.
 */
const FundsInitialization = (props) => {

  const mainnetNodes = [
    {
      value: "WalletOfSatoshi.com",
      address: "035e4ff418fc8b5554c5d9eea66396c227bd429a3251c8cbc711002ba215bfc226",
      uri: "035e4ff418fc8b5554c5d9eea66396c227bd429a3251c8cbc711002ba215bfc226@170.75.163.209:9735"
    },
    {
      value: "ACINQ",
      address: "03864ef025fde8fb587d989186ce6a4a186895ee44a926bfc370e2c366597a3f8f",
      uri: "03864ef025fde8fb587d989186ce6a4a186895ee44a926bfc370e2c366597a3f8f@3.33.236.230:9735"
    },
    {
      value: "LNBIG.com",
      address: "034ea80f8b148c750463546bd999bf7321a0e6dfc60aaf84bd0400a2e8d376c0d5",
      uri: "034ea80f8b148c750463546bd999bf7321a0e6dfc60aaf84bd0400a2e8d376c0d5@46.229.165.151:9735"
    },
    {
      value: "CoinGate",
      address: "0242a4ae0c5bef18048fbecf995094b74bfb0f7391418d71ed394784373f41e4f3",
      uri: "0242a4ae0c5bef18048fbecf995094b74bfb0f7391418d71ed394784373f41e4f3@3.124.63.44:9735"
    },
    {
      value: "Boltz",
      address: "026165850492521f4ac8abd9bd8088123446d126f648ca35e60f88177dc149ceb2",
      uri: "026165850492521f4ac8abd9bd8088123446d126f648ca35e60f88177dc149ceb2@104.196.200.39:9735"
    }
  ];

  const testnetNodes = [
    {
      value: "aranguren.org",
      address: "038863cf8ab91046230f561cd5b386cbff8309fa02e3f0c3ed161a3aeb64a643b9",
      uri: "038863cf8ab91046230f561cd5b386cbff8309fa02e3f0c3ed161a3aeb64a643b9@203.132.94.196:9735"
    },
    {
      value: "Coingate",
      address: "0277622bf4c497475960bf91bd3c673a4cb4e9b589cebfde9700c197b3989cc1b8",
      uri: "0277622bf4c497475960bf91bd3c673a4cb4e9b589cebfde9700c197b3989cc1b8@35.158.243.90:9735"
    }
  ];

  const defaultAmount = 50000;
  const defaultPushAmount = Math.floor(50000 * 0.03);
  const minChannelAmount = 20000;

  const [key, setKey] = useState("1");
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
      return props.chainInfo?.network === "testnet" ? lightningAddress : lightningAddress;
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
    console.log("Openning channel to", address, ", with selected amount ", amount);
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
        title="Welcome to arc"
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
            console.log("Connecting to peer ", address, ":", hostport);
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
                  NotificationManager.success("Connected to peer");
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
            Login to your{" "} wallet, go to the <b>On-chain</b> section and generate a wallet address.
            <br />
            <br />
            <b>Step 2: Get some bitcoin.</b>
            <br />
            You can use the generated address to receive money from the bitcoin network.
            If you want to buy bitcoin, use your address in one of the following services.
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
            some of your funds to open a <b>Lightning Payment Channel</b>.
            <br />
            <br />
            It is implemented using multi-signature Bitcoin
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
              Connect to famous node
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
                <div className="funds-initialization-info">
                  <Divider
                    className="funds-initialization-info-divider"
                    orientation="left"
                  >
                    Node URI
                  </Divider>
                  <Input
                    className="funds-initialization-info-input"
                    value={lightningAddress}
                    onChange={(e) => {
                      setLightningAddress(e.target.value);
                    }}
                    className="funds-initialization-info-input"
                  />
                </div>
              </Form.Item>
              <Form.Item
                style={{
                  display: (mode == "auto") ? "inherit" : "none",
                }}
              >
                <div className="funds-initialization-info">
                  <Divider
                    className="funds-initialization-info-divider"
                    orientation="left"
                  >
                    Node
                  </Divider>
                  <Select
                    options={props.chainInfo?.network === "testnet" ? testnetNodes : mainnetNodes }
                    onChange={(value) => {
                      let node;
                      switch(props.chainInfo?.network){
                      case "testnet":
                        node = testnetNodes.find((e) => e.value == value);
                        setLightningAddress(node.uri);
                        break;
                      case "mainnet":
                        node = mainnetNodes.find((e) => e.value == value);
                        setLightningAddress(node.uri);
                        break;
                      }
                    }}
                  />
                </div>
              </Form.Item>

              <Form.Item>
                <div className="funds-initialization-amount">
                  <Divider
                    className="funds-initialization-amount-divider"
                    orientation="left"
                  >
                    Amount (sat)
                  </Divider>
                  <span
                    style={{
                      display: props.balance?.walletConfirmedSat
                        ? props.balance?.walletConfirmedSat < minChannelAmount
                          ? "inherit"
                          : "none"
                        : "none",
                      color: "red",
                      fontSize: "13px"
                    }}
                  >
                    Not enough funds, minimum required 20000 sat, you have {props.balance?.walletConfirmedSat} sat on-chain
                  </span>
                  <Slider
                    className="funds-initialization-amount-slider"
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
                    className="funds-initialization-amount-input"
                  />
                </div>
              </Form.Item>
              <Form.Item
                style={{
                  display: mode === "advanced" ? "inherit" : "none",
                }}
              >
                <div className="funds-initialization-info">
                  <Divider
                    className="funds-initialization-info-divider"
                    orientation="left"
                  >
                    Push Amount (sat)
                  </Divider>
                  <Input
                    value={pushAmount.toString()}
                    onChange={(e) => {
                      setPushAmount(parseFloat(e.target.value));
                    }}
                    className="funds-initialization-info-input"
                  />
                </div>
              </Form.Item>
              <Form.Item
                style={{
                  display: mode === "advanced" ? "inherit" : "none",
                }}
              >
                <div className="funds-initialization-info">
                  <Divider
                    className="funds-initialization-info-divider"
                    orientation="left"
                  >
                    Minimum Input Confirmations
                  </Divider>
                  <Input
                    value={minimumInputConfirmations.toString()}
                    onChange={(e) => {
                      setMinimumInputConfirmations(parseFloat(e.target.value));
                    }}
                    className="funds-initialization-info-input"
                  />
                </div>
              </Form.Item>
              <Form.Item
                style={{
                  display: mode === "advanced" ? "inherit" : "none",
                }}
              >
                <div className="funds-initialization-info">
                  <Divider
                    className="funds-initialization-info-divider"
                    orientation="left"
                  >
                    Target Confirmation Blocks
                  </Divider>
                  <Input
                    value={targetConfirmationBlocks.toString()}
                    onChange={(e) => {
                      setTargetConfirmationBlocks(parseFloat(e.target.value));
                    }}
                    className="funds-initialization-info-input"
                  />
                </div>
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
