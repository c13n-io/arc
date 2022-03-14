import ReactMarkdown from "react-markdown";
import C13nImage from "../components/content-pages/markdown/c13n-image";
import c13nLink from "../components/content-pages/markdown/c13n-link";
import c13nLinkRef from "../components/content-pages/markdown/c13n-link-ref";
import c13nText from "../components/content-pages/markdown/c13n-text";
import c13nInlineCode from "../components/content-pages/markdown/c13n-inline-code";

import { checkMyPayreq, checkPayreq, registerPaidPayreq } from "../utils/payreq/payreq-tracker";
import { appendToChatHistory } from "../utils/discussion-utils";

import { NotificationManager } from "react-notifications";

import { Button, List, Popconfirm } from "antd";
import { CheckOutlined, CopyOutlined } from "@ant-design/icons";

import messageClient from "../services/messageServices";

import React from "react";

const cryptoUtils = require("../utils/crypto-utils");
const lightningPayReq = require('bolt11');

/**
 * The markdown renderers.
 */
const renderers = (props) => {
  return {
    image: (mdProps) =>
      <C13nImage
        src={mdProps.src}
        automaticImageLoading={props.automaticImageLoading}
        smoothAnimations={props.smoothAnimations}
      />
    ,
    link: c13nLink,
    linkReference: c13nLinkRef,
    text: c13nText,
    inlineCode: c13nInlineCode,
  };
};

/**
 * This function generates the JSX to represent the message inside the chat bubble.
 * @param {} props The global variables.
 * @param {string} payload The message data.
 * @param {boolean} myMessage Flag indicating if message was sent by this wallet.
 * @param {number} amtMsat The msat amount delivered by the message.
 * @returns The JSX representing the message.
 */
const payloadToDom = (props, payload, myMessage, amtMsat, discussionId) => {
  let payloadObj;
  try {
    payloadObj = JSON.parse(payload);
  } catch (err) {
    payloadObj = payload;
  }
  if (payloadObj.n === undefined) {
    return payload;
  }
  if (payloadObj.t === undefined) {
    return payload;
  }
  switch (payloadObj.n) {
  case "c13n-mp":
    return c13nMpToDom(props, payloadObj, myMessage, amtMsat);
  case "c13n-pp":
    return c13nPpToDom(props, payloadObj, myMessage, discussionId);
  default:
    return payload;
  }
};


const c13nMpToDom = (props, payloadObj, myMessage, amtMsat) => {
  switch (payloadObj.t) {
  case "message":
    return [
      (payloadObj.c ?
        <div>
          <ReactMarkdown
            source={payloadObj.c}
            renderers={renderers(props)}
            disallowedTypes={["paragraph"]}
            unwrapDisallowed={!!true}
          />
        </div>
        :
        <div
          style={{
            fontSize: '20px',
            border: '2px solid gray',
            borderRadius: '5px',
            padding: '15px'
          }}
        >
          {
            `You ${myMessage ? 'sent' : 'received'} `
          }
          <span
            style={{
              color: myMessage ? 'red' : 'green'
            }}
          >
            {`${cryptoUtils.msatToCurrentCryptoUnit(props, amtMsat)}`}
          </span>
          <span>
            {`${props.selectedCryptoUnit}`}
          </span>
        </div>),
      (<div>
        <List
          style={{
            display: payloadObj.attL ? 'inherit' : 'none'
          }}
          dataSource={payloadObj.attL}
          renderItem={(item) => {
            switch (item.t) {
            case 'image':
              return (
                <ReactMarkdown
                  source={`![](${item.u})`}
                  renderers={renderers(props)}
                  disallowedTypes={["paragraph"]}
                  unwrapDisallowed={!!true}
                  key={`${Date.now()}${Math.random()}`}
                />
              );
            case 'file':
              return (
                <a href={item.u}>File</a>
              );
            }
          }}
        />
      </div>)];
  default:
    break;
  }
};


const c13nPpToDom = (props, payloadObj, myMessage) => {
  switch (payloadObj.t) {
  case "payreq":
    let invoiceObj = {};
    if (payloadObj.c) {
      try{
        invoiceObj = lightningPayReq.decode(payloadObj?.c);
      } catch (e) {}
    }
    let invoiceTimeLeft = (invoiceObj?.timeExpireDate - Math.round(Date.now() / 1000));
    let invoicePaid = myMessage ? checkMyPayreq(payloadObj.c) : checkPayreq(payloadObj.c);
    return (
      <div
        style={{
          border: '1px solid gray',
          borderRadius: '5px',
          padding: '10px'
        }}
      >
        <h3> Request to
          {
            myMessage ? ' receive' : ' pay'
          } <b>{cryptoUtils.msatToCurrentCryptoUnit(props, invoiceObj?.millisatoshis)} {props.selectedCryptoUnit}</b></h3>
        {
          myMessage ? checkMyPayreq(payloadObj.c)
            ?
            <h2 style={{ color: 'green' }}><b>Paid <CheckOutlined /></b></h2>
            :
            <h2><b>Pending</b></h2>
            : checkPayreq(payloadObj.c) ?
              <div>
                <h2 style={{ color: 'green' }}><b>Paid <CheckOutlined /></b></h2>
              </div>
              :
              <div>
                <Popconfirm
                  placement="topLeft"
                  title={"Send payment?"}
                  onConfirm={() => {
                    messageClient().sendMessage(
                      {
                        payload: createC13nPpMessage(
                          "payreq_pay",
                          payloadObj.c
                        ),
                        payReq: payloadObj.c
                      },
                      (err, res) => {
                        if(err) {
                          console.log(err);
                        }
                        if(res) {
                          console.log(res);
                          props.selectedDiscussion.lastMsgId = res.sentMessage.id;
                          props.selectedDiscussion.lastReadMsgId = res.sentMessage.id;
                          appendToChatHistory(props, res.sentMessage);
                        }
                      }
                    );
                  }}
                  style={{
                    fontSize: "15px",
                    border: "5px solid red"
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    type="primary"
                    onClick={() => {
                    }}
                    style={{
                      margin: "15px",
                      fontSize: '20px',
                      width: '90%',
                      height: '75%'
                    }}
                  >
                    Pay
                  </Button>
                </Popconfirm>
                <br />
              </div>
        }
        <span
          style={{
            display: payloadObj.description ? "inherit" : "none"
          }}
        >
          <b>Description</b>
          <br />
          <span>{payloadObj.description}</span>
          <br />
          <br />
        </span>
        <span
          style={{
            fontSize: '10px'
          }}
        >
          <b>Payreq: </b>
          <b>
            {`${payloadObj?.c?.substring(
              0,
              5
            )}...${payloadObj?.c?.substring(
              payloadObj?.c?.length - 5,
              payloadObj?.c?.length
            )}:  `}
          </b>
          <CopyOutlined
            className="message-info-routeHopsList-Outilined"
            onClick={() => {
              let copyText = document.getElementById(
                "payreq" + payloadObj.c
              );
              copyText.select();
              copyText.setSelectionRange(0, 99999);
              document.execCommand("copy");
              NotificationManager.info("Copied to clipboard");
            }}
          />
          <input
            id={"payreq" + payloadObj.c}
            className="message-info-routeHopsList-input"
            value={payloadObj.c}
            onChange={() => {}}
          />
        </span>
        <br />
        <span
          style={{
            fontSize: '10px',
            display: invoicePaid ? 'none' : 'inherit'
          }}
        >
          <b>Expiry in: </b>
          {invoiceTimeLeft > 0 ? secondsToDhms(invoiceTimeLeft) : (<b style={{fontSize: "12px", color: "red"}}>EXPIRED</b>)}
        </span>
      </div>
    );
  case "payreq_pay":
    registerPaidPayreq(payloadObj.c);
    return(
      <div
        style={{
          fontSize: '16px',
          border: '2px solid gray',
          borderRadius: '5px',
          padding: '15px'
        }}
      >
        Paid
        <b
          style={{
            paddingLeft: "5px",
            fontSize: "14px"
          }}
        >
          {`${payloadObj?.c?.substring(
            0,
            5
          )}...${payloadObj?.c?.substring(
            payloadObj?.c?.length - 5,
            payloadObj?.c?.length
          )}`}
        </b>
      </div>
    );
  }
};

/**
 * Parses the entered message string to an object with respect to the payload protocol.
 * @param {*} message The entered message string.
 * @returns The message object.
 */
const createC13nMpMessage = (message, attachmentList) => {
  let messageObj = {
    n: "c13n-mp",
    v: "0.0.1c",
    t: "message",
    c: message,
    attL: attachmentList
  };
  try {
    return JSON.stringify(messageObj);
  } catch (err) {
    return message;
  }
};

const secondsToDhms = (seconds) => {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600*24));
  var h = Math.floor(seconds % (3600*24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ?  d + "d " : "";
  var hDisplay = h > 0 ? h + "h " : "";
  var mDisplay = m > 0 ? m + "m " : "";
  return dDisplay + hDisplay + mDisplay;
};

const createC13nPpMessage = (type, payreq, description) => {
  let messageObj = {
    n: "c13n-pp",
    v: "0.0.1a",
    t: type,
    c: payreq,
    description: description
  };
  try {
    return JSON.stringify(messageObj);
  } catch (err) {
    return '';
  }
};

export {
  payloadToDom,
  createC13nMpMessage,
  createC13nPpMessage
};
