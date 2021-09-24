import version from "./version";
import ReactMarkdown from "react-markdown";
import C13nImage from "../components/content-pages/markdown/c13n-image";
import c13nLink from "../components/content-pages/markdown/c13n-link";
import c13nLinkRef from "../components/content-pages/markdown/c13n-link-ref";
import c13nText from "../components/content-pages/markdown/c13n-text";
import c13nInlineCode from "../components/content-pages/markdown/c13n-inline-code";

import ChatHistoryImage from "../components/content-pages/chat-history-image";

import { issuePayreq, checkPayreq, satisfyPayreq } from "../utils/payreq/payreq-tracker";

import { Button, List } from "antd";
import { CheckOutlined } from "@ant-design/icons";

import { downloadImage, cachedImages } from "../utils/lsat/download-image";
import React from "react";
import { sendPayreqPay } from "../utils/payreq/utils";

const cryptoUtils = require("../utils/crypto-utils");

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
 * @param {boolean} myMessage Flag indicating if message was send by this wallet.
 * @param {number} amtMsat The msat amount delivered by the message.
 * @returns The JSX representing the message.
 */
const payloadToDom = (props, payload, myMessage, amtMsat) => {
  let payloadObj;
  try {
    payloadObj = JSON.parse(payload);
  } catch (err) {
    payloadObj = payload;
  }
  if (payloadObj.type === undefined) {
    return payload;
  }
  switch (payloadObj.type) {
  case "message":
    return payloadObj.content ?
      <div>
        <ReactMarkdown
          source={payloadObj.content}
          renderers={renderers(props)}
          disallowedTypes={["paragraph"]}
          unwrapDisallowed={!!true}
        />
        <List
          style={{
            display: payloadObj.attachmentList ? 'inherit' : 'none'
          }}
          dataSource={payloadObj.attachmentList}
          renderItem={(item) => {
            return (
              <div>
                <span
                  style={{
                    display: cachedImages[item.uri] ? "none" : "inherit",
                  }}
                >
                  <h4>
                    <b>LSAT Image</b>
                  </h4>
                  <Button
                    type="primary"
                    onClick={() => {
                      downloadImage(props, item.uri);
                    }}
                  >
                      Pay & Show
                  </Button>
                  <br />
                  <a>{item.uri}</a>
                </span>
                <ChatHistoryImage {...props} src={cachedImages[item.uri]} />
              </div>
            );
          }}
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
      </div>
    ;
  case "image":
    return (
      <div>
        <span
          style={{
            display: cachedImages[payloadObj.content] ? "none" : "inherit",
          }}
        >
          <h3>
            <b>LSAT Image</b>
          </h3>
          <Button
            type="primary"
            onClick={() => {
              downloadImage(props, payloadObj.content);
            }}
          >
              Pay & Show
          </Button>
          <br />
          <a>{payloadObj.content}</a>
        </span>
        <ChatHistoryImage {...props} src={cachedImages[payloadObj.content]} />
      </div>
    );
  case "payreq":
    issuePayreq(payloadObj.id);
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
          } <b>{cryptoUtils.msatToCurrentCryptoUnit(props, payloadObj.amtMsat)} {props.selectedCryptoUnit}</b></h3>
        {
          myMessage ? checkPayreq(payloadObj.id)
            ?
            <h2 style={{ color: 'green' }}><b>Paid <CheckOutlined /></b></h2>

            :
            <h2><b>Pending</b></h2>


            : checkPayreq(payloadObj.id) ?
              <div>
                <h2 style={{ color: 'green' }}><b>Paid <CheckOutlined /></b></h2>
              </div>
              :
              <div>
                <Button
                  type="primary"
                  onClick={() => {
                    sendPayreqPay(props, payloadObj);
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
          <b>ID</b>
          <span>{payloadObj.id}</span>
        </span>
      </div>
    );
  case "payreq_pay":
    satisfyPayreq(payloadObj.id);
    return (
      <div
        style={{
          border: '2px solid green',
          borderRadius: '5px',
          padding: '10px',
        }}
      >
        <span
          style={{
            fontSize: '25px',
            color: 'green'
          }}
        >

        </span>
          Paid request {payloadObj.id}
        <CheckOutlined
          style={{
            fontSize: '30px',
            color: 'green'
          }}
        />
      </div>
    );
  }
};

/**
 * Parses the entered message string to an object with respect to the payload protocol.
 * @param {*} message The entered message string.
 * @returns The message object.
 */
const messageToPayload = (message, attachmentList) => {
  let messageObj = {
    v: version,
    type: "message",
    content: message,
    attachmentList: attachmentList
  };
  try {
    return JSON.stringify(messageObj);
  } catch (err) {
    return message;
  }
};

const payreqToPayload = (amtMsat, description) => {
  let messageObj = {
    v: version,
    type: "payreq",
    amtMsat: amtMsat,
    description: description,
    id: Date.now()
  };
  try {
    return JSON.stringify(messageObj);
  } catch (err) {
    return '';
  }
};

const payreqPayToPayload = (id) => {
  let messageObj = {
    v: version,
    type: "payreq_pay",
    id: id
  };
  try {
    return JSON.stringify(messageObj);
  } catch (err) {
    return '';
  }
};

export {
  payloadToDom,
  messageToPayload,
  payreqToPayload,
  payreqPayToPayload
};
