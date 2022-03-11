import version from "./version";
import ReactMarkdown from "react-markdown";
import C13nImage from "../components/content-pages/markdown/c13n-image";
import c13nLink from "../components/content-pages/markdown/c13n-link";
import c13nLinkRef from "../components/content-pages/markdown/c13n-link-ref";
import c13nText from "../components/content-pages/markdown/c13n-text";
import c13nInlineCode from "../components/content-pages/markdown/c13n-inline-code";

import { issuePayreq, checkPayreq, satisfyPayreq } from "../utils/payreq/payreq-tracker";

import { Button, List } from "antd";
import { CheckOutlined } from "@ant-design/icons";

import React from "react";

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

const messageCore = () => {
  return {
    n: "c13n-cp",
    v: version
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
  if (payloadObj.t === undefined) {
    return payload;
  }
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
            switch(item.t){
            case 'image':
              return (
                <ReactMarkdown
                  source={`![](${item.u})`}
                  renderers={renderers(props)}
                  disallowedTypes={["paragraph"]}
                  unwrapDisallowed={!!true}
                />
              );
            case 'file':
              return(
                <a href={item.u}>File</a>
              );
            }
          }}
        />
      </div>)];
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
                    //TODO tell c13n-go to pay invoice
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
const createC13nMpMessage = (message, attachmentList) => {
  let messageObj = {
    ...messageCore(),
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

const createC13nPpMessage = (payreq, description) => {
  let messageObj = {
    n: "c13n-pp",
    v: "0.0.1a",
    t: "payreq",
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
