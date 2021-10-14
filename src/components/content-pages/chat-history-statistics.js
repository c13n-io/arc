import React, { useEffect, useState } from "react";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

import discussionClient from "../../services/discussionServices";
import "./chat-history-statistics.css";
import { NotificationManager } from "react-notifications";

const cryptoUtils = require("../../utils/crypto-utils");

/**
 * This component represents the chat history statistics window.
 * @param {*} props The global variables.
 */
const ChatHistoryStatistics = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalOutcome, setTotalOutcome] = useState(0);
  const [totalFees, setTotalFees] = useState(0);
  const [totalSent, setTotalSent] = useState(0);
  const [totalReceived, setTotalReceived] = useState(0);

  /**
   * This process is called once on component loading.
   * It fetches the statistics from the correct endpoint.
   */
  useEffect(() => {
    setTotalIncome(0);
    setTotalFees(0);
    setTotalOutcome(0);
    setTotalReceived(0);
    setTotalSent(0);
    setLoaded(false);
    discussionClient().getDiscussionStatistics(
      {
        id: props.selectedDiscussion.id,
      },
      (err, res) => {
        if (err) {
          NotificationManager.error("Failed to fetch statistics");
          console.log(err);
        }
        if (res) {
          if (res.amtMsatReceived) {
            setTotalIncome(res.amtMsatReceived);
          }
          if (res.amtMsatSent) {
            setTotalOutcome(res.amtMsatSent);
          }
          if (res.amtMsatFees) {
            setTotalFees(res.amtMsatFees);
          }
          if (res.messagesSent) {
            setTotalSent(res.messagesSent);
          }
          if (res.messagesReceived) {
            setTotalReceived(res.messagesReceived);
          }
          setLoaded(true);
        }
      }
    );
  }, [props.selectedDiscussion.id]);

  /**
   * The chat history statistics JSX
   */
  return (
    <div className="chatHistoryStatistics">
      {loaded ? (
        <div>
          <span
            style={{
              display: props.selectedDiscussion ? "inline-block" : "none",
            }}
          >
            <span className="contentHeaderTotalAmount">
              <ArrowDownOutlined />
              {`${
                cryptoUtils.msatToCurrentCryptoUnit(props, totalIncome) || 0
              }`}
              <span className="chat-history-statistics-ArrowDownOutlined">
                {`${props.selectedCryptoUnit} `}
                received
              </span>
            </span>
            <br />
            <span className="chat-history-statistics-contentHeaderTotalAmount">
              <ArrowUpOutlined />
              {`${
                cryptoUtils.msatToCurrentCryptoUnit(props, totalOutcome) || 0
              }`}
              <span className="chat-history-statistics-ArrowUpOutlined">
                {`${props.selectedCryptoUnit} `}
                sent
              </span>
            </span>
          </span>
          <br />
          <br />
          Messages Sent: <b>{`${totalSent || 0}`}</b>
          <br />
          <br />
          Messages Received: <b>{`${totalReceived || 0}`}</b>
          <br />
          <br />
          Total Fees Paid:{" "}
          <b>{`${cryptoUtils.msatToCurrentCryptoUnit(props, totalFees) || 0}${
            props.selectedCryptoUnit
          }`}</b>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default ChatHistoryStatistics;
