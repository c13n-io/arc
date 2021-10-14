import React, { useEffect, useState } from "react";
import { Form, Divider, Collapse, Button } from "antd";

import OpenChannel from "./open-channel";
import ConnectPeer from "./connect-peer";
import nodeInfoClient from "../../services/nodeInfoServices";

import "./user-funds.css";
import theme from "../../style/theme";
import { DoubleRightOutlined } from "@ant-design/icons";

/**
 * This component represents the user funds page. It contains information about on-chain and off-chain balances.
 */
const UserFunds = (props) => {
  // Wallet related variables
  const [walletConfirmedBalance, setWalletConfirmedBalance] = useState(0);
  const [walletUnconfirmedBalance, setWalletUnconfirmedBalance] = useState(0);
  const [channelTotalBalance, setChannelTotalBalance] = useState(0);
  const [pendingChannelBalance, setPendingChannelBalance] = useState(0);
  const [channelRemoteBalance, setChannelRemoteBalance] = useState(0);

  const [connectPeerModalVisible, setConnectPeerModalVisible] = useState(false);
  const [openChannelModalVisible, setOpenChannelModalVisible] = useState(false);

  /**
   * This function is called once when the component loads.
   * It fetches the self balance information from the corresponding endpoint.
   */
  useEffect(() => {
    nodeInfoClient().getSelfBalance({}, (err, res) => {
      if (err) {
        console.log(err);
        NotificationManager.error(err.message);
      }
      if (res) {
        if (res.walletConfirmedSat) {
          setWalletConfirmedBalance(Number(`${res.walletConfirmedSat}`));
        }
        if (res.walletUnconfirmedSat) {
          setWalletUnconfirmedBalance(Number(`${res.walletUnconfirmedSat}`));
        }
        if (res.channelLocalMsat) {
          setChannelTotalBalance(
            Number(`${Math.floor(res.channelLocalMsat / 1000)}`)
          );
        }
        if (res.pendingOpenLocalMsat) {
          setPendingChannelBalance(
            Number(`${Math.floor(res.pendingOpenLocalMsat / 1000)}`)
          );
        }
        if (res.channelRemoteMsat) {
          setChannelRemoteBalance(
            Number(`${Math.floor(res.channelRemoteMsat / 1000)}`)
          );
        }
      }
    });
  }, []);

  /**
   * The user funds page JSX.
   */
  return (
    <div className="user-funds">
      <div
        className="user-funds-header"
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
        <div className="user-funds-header-text">Funds</div>
      </div>
      <div className="users-funds-main">
        <Collapse>
          <Collapse.Panel header="Channels">
            <Button
              onClick={() => {
                setOpenChannelModalVisible(true);
              }}
            >
              Open Channel
            </Button>
          </Collapse.Panel>
          <Collapse.Panel header="Peers">
            <Button
              onClick={() => {
                setConnectPeerModalVisible(true);
              }}
            >
              Connect to Peer
            </Button>
          </Collapse.Panel>
        </Collapse>
        <Form className="user-funds-form" layout="vertical">
          <b>
            <Divider orientation="left">
              <h2>On-chain Funds</h2>
            </Divider>
          </b>
          <Form.Item label="Wallet Confirmed Balance">
            <b>{walletConfirmedBalance} sat</b>
          </Form.Item>
          <Form.Item label="Wallet Unconfirmed Balance">
            <b>{walletUnconfirmedBalance} sat</b>
          </Form.Item>
          <b>
            <Divider orientation="left">
              <h2>Off-chain Funds</h2>
            </Divider>
          </b>
          <Form.Item label="Total Channel balance">
            <b>{channelTotalBalance} sat</b>
          </Form.Item>
          <Form.Item label="Pending Channel Balance">
            <b>{pendingChannelBalance} sat</b>
          </Form.Item>
        </Form>
        <OpenChannel
          {...props}
          visible={openChannelModalVisible}
          setVisible={setOpenChannelModalVisible}
        />
        <ConnectPeer
          {...props}
          visible={connectPeerModalVisible}
          setVisible={setConnectPeerModalVisible}
        />
      </div>
    </div>
  );
};

export default UserFunds;
