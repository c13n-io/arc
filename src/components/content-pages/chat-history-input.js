import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Tooltip,
  Switch,
  Input,
  Dropdown,
  Menu,
  Divider,
} from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  FileImageOutlined,
  SmileOutlined,
  FormOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import Picker from "emoji-picker-react";
import { NotificationManager } from "react-notifications";

import messageClient from "../../services/messageServices";
import { appendToChatHistory } from "../../utils/discussion-utils";
import theme from "../../style/theme";
import uploadImage from "../../utils/lsat/upload-image";
import sleep from "../../utils/system";

import {
  messageToPayload,
  payreqToPayload,
} from "../../payload-protocol/parsers";
import "./chat-history-input.css";
import ChatButton from "../../media/arrow-right.svg";

const cryptoUtils = require("../../utils/crypto-utils");

const ChatHistoryInput = (props) => {
  const [selectedInput, setSelectedInput] = useState("text");
  const [currentFee, setCurrentFee] = useState(-1);
  const [messageToSend, setMessageToSend] = useState("");
  const [emojiPickerActive, setEmojiPickerActive] = useState(false);
  const [amount, setAmount] = useState("");
  const [fileDialogActive, setFileDialogActive] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [payreqModalActive, setPayreqModalActive] = useState(false);
  const [payreqAmount, setPayreqAmount] = useState(0);
  const [payreqDescription, setPayreqDescription] = useState("");

  /**
   * This function sends a payload and the currently entered payload to the current discussion.
   * @param {string} text The payload to send.
   */
  const sendMessage = async (text) => {
    const amtMsat = cryptoUtils.currentCryptoAmtToMsat(props, amount);
    const msg = {
      discussionId: props.selectedDiscussion.id,
      amtMsat:
        amtMsat === ""
          ? 1000
          : parseInt(amtMsat) > 1000
            ? parseInt(amtMsat)
            : 1000,
      payload: text,
      options: {
        anonymous: props.anonymousActive,
      },
    };
    setMessageToSend("");
    setAmount(cryptoUtils.retrieveDefaultCryptoAmount(props));
    messageClient().sendMessage(msg, (err, res) => {
      if (err) {
        console.log(err);
        NotificationManager.warning(err.message);
      }
      if (res) {
        console.log(res.sentMessage);
        props.selectedDiscussion.lastMsgId = res.sentMessage.id;
        props.selectedDiscussion.lastReadMsgId = res.sentMessage.id;
        appendToChatHistory(props, res.sentMessage);
        props.updateCurrentFunds();
        props.setLastFundChange(
          `-${Number(
            res.sentMessage.amtMsat / 1000 +
              res.sentMessage.totalFeesMsat / 1000
          )}`
        );
      }
    });
  };

  /**
   * Calculates the fee for a specific discussion and currently entered msat amount.
   * @param {*} discussion The discussion.
   */
  const calculateFee = (discussion) => {
    const amtMsat = cryptoUtils.currentCryptoAmtToMsat(props, amount);
    const msg = {
      discussionId: discussion.id,
      amtMsat:
        amtMsat === ""
          ? 1000
          : parseInt(amtMsat) > 1000
            ? parseInt(amtMsat)
            : 1000,
      payload: "fee_calculation",
    };
    messageClient().estimateMessage(msg, (err, res) => {
      if (err) {
        NotificationManager.warning(err.message);
      }
      if (res) {
        setCurrentFee(
          cryptoUtils.msatToCurrentCryptoUnit(props, res.message.totalFeesMsat)
        );
      }
    });
  };

  /**
   * the fucntion selects all the text in the amount input and highlight it in order to change on focus.
   */

  const selectAmountInputText = () => {
    const input = document.getElementById("cryptoAmountInput");
    input.focus();
    input.select();
  };

  const selectPayreqAmountInputText = () => {
    const input = document.getElementById("payreqAmountInput");
    input.focus();
    input.select();
  };

  /**
   * Hook to perform discussion related actions when the selected discussion changes.
   */
  useEffect(() => {
    calculateFee(props.selectedDiscussion);
    setCurrentFee();

    setMessageToSend("");
    setAmount(cryptoUtils.retrieveDefaultCryptoAmount(props));
    document.getElementById("messageInputArea").focus();
  }, [props.selectedDiscussion]);

  return (
    <div
      onBlur={() => {
        setSelectedInput("text");
      }}
      className="chat-history-footer-container"
    >
      <Dropdown
        trigger="click"
        overlay={
          <Menu className="chat-history-input-dropdown">
            <Menu.Item
              onClick={() => {
                setFileDialogActive(true);
              }}
            >
              <FileImageOutlined
                className="chat-history-input-fileImageOutlined"
                style={{ fontSize: "25px" }}
              />
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                setPayreqModalActive(true);
              }}
            >
              <FormOutlined style={{ fontSize: "25px" }} />
            </Menu.Item>
            <Menu.Item onClick={() => {}}>
              <Tooltip title="Anonymous Mode" placement="top">
                <Switch
                  onChange={(value) => {
                    props.setAnonymousActive(value);
                  }}
                  checkedChildren={<EyeInvisibleOutlined />}
                  unCheckedChildren={<EyeOutlined />}
                  disabled={
                    props.selectedDiscussion.participantsList.length > 1
                  }
                />
              </Tooltip>
            </Menu.Item>
          </Menu>
        }
      >
        <PlusOutlined className="chat-history-footer-addMedia" />
      </Dropdown>
      <div className="chat-history-footer-messageMoney">
        <Input.TextArea
          id="messageInputArea"
          value={messageToSend}
          onFocus={(e) => {
            if (props.chatHistory.length !== 0) {
              props.updateLastMessageSeen(props.chatHistory);
              props.updateChatScroll();
              setSelectedInput("text");
            }
          }}
          onChange={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            } else {
              setMessageToSend(e.target.value);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage(messageToPayload(e.target.value));
            }
          }}
          placeholder={`Enter ${
            props.anonymousActive ? "anonymous " : ""
          }message`}
          style={{
            display: "inline-block",
            width:
              selectedInput === "text"
                ? "calc(100% - 100px)"
                : "calc(100% - 150px)",
            resize: "none",
            height:
              document.getElementById("messageInputArea")?.scrollHeight > 45
                ? messageToSend.length === 0
                  ? "35px"
                  : document.getElementById("messageInputArea")?.scrollHeight
                : "35px",
            maxHeight: "100px",
            borderRadius: "15px",
            border: "2px solid gray",
            borderColor: selectedInput === "text" ? "white" : "gray",
          }}
        />
        <div className="chat-history-footer-emoticons">
          <div className="chat-history-footer-emoticonsSmile">
            <SmileOutlined
              onClick={() => {
                setEmojiPickerActive(!emojiPickerActive);
              }}
              onBlur={() => {
                setEmojiPickerActive(false);
              }}
            />
          </div>
        </div>
        <div className="chat-history-footer-input-addAmount">
          <div
            className="chat-history-footer-input-currency"
            style={{
              width: selectedInput === "crypto" ? "130px" : "80px",
              marginLeft: selectedInput === "crypto" ? "20px" : "",
            }}
          >
            {cryptoUtils.selectedCryptoToVerbose(props.selectedCryptoUnit)}
          </div>
          <Tooltip
            title={`${cryptoUtils.currentCryptoAmtToFiat(props, amount)} ${
              props.selectedFiatUnit
            }`}
            placement="top"
            visible={selectedInput === "crypto"}
          >
            <Input
              id="cryptoAmountInput"
              type="number"
              value={amount}
              onBlur={() => {
                if (
                  amount <
                  parseFloat(cryptoUtils.retrieveDefaultCryptoAmount(props))
                ) {
                  setAmount(
                    parseFloat(cryptoUtils.retrieveDefaultCryptoAmount(props))
                  );
                }
                if (amount > 1000000) {
                  setAmount(1000000);
                }
              }}
              min={1}
              max={1000000}
              onFocus={() => {
                setSelectedInput("crypto");
                selectAmountInputText();
              }}
              className="chat-history-footer-input-addAmount-amount"
              style={{
                width: selectedInput === "crypto" ? "130px" : "80px",
                borderColor: selectedInput === "crypto" ? "white" : "gray",
                color: amount === "1" ? "gray" : "white",
              }}
              onChange={(e) => {
                const numCast = parseFloat(e.target.value);
                if (isNaN(numCast)) {
                  setAmount(amount);
                } else {
                  setAmount(e.target.value);
                }
                if (e.target.value === "") {
                  setAmount(cryptoUtils.retrieveDefaultCryptoAmount(props));
                }
              }}
              placeholder={cryptoUtils.retrieveDefaultCryptoAmount(props)}
            />
          </Tooltip>
        </div>
      </div>

      <div
        className="chat-history-footer-emojiPicker"
        style={{
          display: emojiPickerActive ? "inherit" : "none",
        }}
      >
        <Picker
          onEmojiClick={(e, emoji) => {
            e.preventDefault();
            setMessageToSend(messageToSend.concat(emoji.emoji));
          }}
          pickerStyle={{
            backgroundColor: "#656585",
            width: "250px",
          }}
          disableSearchBar
          disableAutoFocus
          disableSkinTonePicker
        />
      </div>
      <div
        className="chat-history-footer-sendButtonContainer"
        style={{
          backgroundColor: theme.menuLight,
        }}
      >
        <div className="chat-history-footer-feeContainer">
          <span className="chat-history-footer-feeText">
            {`Fee ${currentFee || 0} ${props.selectedCryptoUnit}`}
          </span>
        </div>

        <Button
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          onClick={() => {
            sendMessage(messageToPayload(messageToSend));
          }}
          className="chat-history-footer-sendButton"
        >
          <img src={ChatButton} className="chat-history-footer-sendButtonSvg" />
        </Button>
      </div>
      <Modal
        visible={!!fileDialogActive}
        onOk={async () => {
          setUploadLoading(true);
          switch (imageURL.length) {
          case 0:
            uploadImage(props);
            break;
          default:
            sendMessage(messageToPayload(`![](${imageURL})`));
          }
          await sleep(1500);
          setImageURL("");
          setFileDialogActive(false);
          setUploadLoading(false);
        }}
        onCancel={() => {
          setFileDialogActive(false);
        }}
        okButtonProps={{ type: "default", disabled: !!uploadLoading }}
        okText={uploadLoading ? <LoadingOutlined spin /> : "Send"}
      >
        <Divider orientation="left">Choose image file</Divider>
        <input
          disabled
          id="fileInput"
          type="file"
          accept="image/png, image/jpeg"
        />
        <Divider>OR</Divider>
        <Divider orientation="left">Paste image link:</Divider>
        <Input
          value={imageURL}
          onChange={(e) => {
            setImageURL(e.target.value);
          }}
        />
      </Modal>
      <Modal
        visible={!!payreqModalActive}
        title="Request Payment"
        onOk={() => {
          console.log(
            "Requesting: ",
            cryptoUtils.currentCryptoAmtToMsat(props, payreqAmount),
            "msat"
          );
          messageClient().sendMessage(
            {
              discussionId: props.selectedDiscussion.id,
              payload: payreqToPayload(
                cryptoUtils.currentCryptoAmtToMsat(props, payreqAmount),
                payreqDescription
              ),
              amtMsat: 1000,
            },
            (err, res) => {
              if (err) {
                NotificationManager.error("Could not send message");
                console.log(err);
              }
              if (res) {
                setPayreqAmount(0);
                setPayreqDescription("");
                setPayreqModalActive(false);
                props.selectedDiscussion.lastMsgId = res.sentMessage.id;
                props.selectedDiscussion.lastReadMsgId = res.sentMessage.id;
                appendToChatHistory(props, res.sentMessage);
                props.updateCurrentFunds();
                props.setLastFundChange(
                  `-${Number(
                    res.sentMessage.amtMsat / 1000 +
                      res.sentMessage.totalFeesMsat / 1000
                  )}`
                );
              }
            }
          );
        }}
        onCancel={() => {
          setPayreqModalActive(false);
        }}
        okButtonProps={{ type: "default" }}
        okText={"Request"}
      >
        Description:
        <Input
          value={payreqDescription}
          onChange={(e) => {
            setPayreqDescription(e.target.value);
          }}
        />
        <br />
        Amount ({props.selectedCryptoUnit}):
        <Input
          id="payreqAmountInput"
          type="number"
          value={payreqAmount}
          onBlur={() => {
            if (
              amount <
              parseFloat(cryptoUtils.retrieveDefaultCryptoAmount(props))
            ) {
              setAmount(
                parseFloat(cryptoUtils.retrieveDefaultCryptoAmount(props))
              );
            }
            if (amount > 1000000) {
              setAmount(1000000);
            }
          }}
          onFocus={() => {
            selectPayreqAmountInputText();
          }}
          onChange={(e) => {
            const numCast = parseFloat(e.target.value);
            if (isNaN(numCast)) {
              setPayreqAmount(amount);
            } else {
              setPayreqAmount(e.target.value);
            }
            if (e.target.value === "") {
              setPayreqAmount(cryptoUtils.retrieveDefaultCryptoAmount(props));
            }
          }}
        />
      </Modal>
    </div>
  );
};

export default ChatHistoryInput;
