import React from "react";
import { List } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { NotificationManager } from "react-notifications";
import { concatUserNames } from "../../utils/discussion-utils";
import "./message-info.css";

const cryptoUtils = require("../../utils/crypto-utils");

/**
 * This component represents the info window for a chat history message.
 * @param {*} props The global variables.
 * @returns The JSX of the info component.
 */
const MessageInfo = (props) => {
  /**
   * Prepend self to hops for a given message's hops array.
   * @param {*} hops The hops array.
   */
  const prepareHopsArray = (hops) => {
    let temp = [...hops];
    temp.unshift({ hopAddress: props.selfInfo.address, feeMsat: 0 });
    temp[temp.length - 1]["isLast"] = true;
    return temp;
  };

  /**
   * Creates the list containing the route hops for a specific route.
   * @param {*} route The route to calculate hops for.
   * @returns The JSX list representing the hops list.
   */
  const routeHopsList = (route) => {
    return (
      <List
        className="message-info-routeHopsList"
        dataSource={
          props.selectedMessage ? prepareHopsArray(route.hopsList) : []
        }
        renderItem={(item) => {
          return (
            <List.Item>
              <CopyOutlined
                className="message-info-routeHopsList-Outilined"
                onClick={() => {
                  let copyText = document.getElementById(
                    "hopAddressText" + item.hopAddress
                  );
                  copyText.select();
                  copyText.setSelectionRange(0, 99999);
                  document.execCommand("copy");
                  NotificationManager.info("Copied to clipboard");
                }}
              />
              <input
                id={"hopAddressText" + item.hopAddress}
                className="message-info-routeHopsList-input"
                value={item.hopAddress}
                onChange={() => {}}
              />
              <b>{`${item.hopAddress.substring(
                0,
                5
              )}...${item.hopAddress.substring(
                item.hopAddress.length - 5,
                item.hopAddress.length
              )}:  `}</b>
              {item.hopAddress === props.selfInfo.address ? "(You)" : ""}
              {item.isLast
                ? `(${concatUserNames(props, [item.hopAddress])})`
                : ""}
              <span className="message-info-routeHopsList-span">
                {item.hopAddress === props.selfInfo.address ? "-" : "+"}
                {`${
                  item.hopAddress === props.selfInfo.address
                    ? cryptoUtils.msatToCurrentCryptoUnit(
                      props,
                      parseInt(route.routeAmtMsat ? route.routeAmtMsat : 0) +
                      parseInt(
                        route.routeFeesMsat ? route.routeFeesMsat : 0
                      )
                    )
                    : item.isLast
                      ? cryptoUtils.msatToCurrentCryptoUnit(
                        props,
                        parseInt(route.routeAmtMsat)
                      )
                      : item.feeMsat
                        ? cryptoUtils.msatToCurrentCryptoUnit(
                          props,
                          parseInt(item.feeMsat)
                        )
                        : 0
                }
                              ${props.selectedCryptoUnit}`}
              </span>
            </List.Item>
          );
        }}
      />
    );
  };

  return (
    <div>
      {props.selectedMessage ? (
        props.selectedMessage.sender === props.selfInfo.address ? (
          <div>
            <b>Transaction Paths</b>
            <List
              dataSource={props.selectedMessage.paymentRoutesList}
              renderItem={(item) => {
                return <div>{routeHopsList(item)}</div>;
              }}
            />
          </div>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default MessageInfo;
