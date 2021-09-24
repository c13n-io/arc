import React, { useState } from "react";
import { Modal } from "antd";

/**
 * This component represents the chat history image.
 * @param {*} props The global variables.
 */
const ChatHistoryImage = React.memo((props) => {
  const [focus, setFocus] = useState(false);
  return props.automaticImageLoading ? (
    <div
      onClick={() => {
        setFocus(!focus);
      }}
      style={{
        width: "25vw",
        transition: props.smoothAnimations ? "0.5s" : "0s",
      }}
    >
      <img src={props.src} width="100%" />
      <Modal
        title=""
        cancelButtonProps={{ style: { display: "none" } }}
        visible={!!focus}
        width="90vw"
        bodyStyle={{
          backgroundImage: `url("${props.src}")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize:
            screen.height > screen.width ? "100% auto" : "auto 100%",
          height: "75vh",
        }}
      ></Modal>
    </div>
  ) : (
    <div>
      (Image)
      <a href={props.src} target="_blank">
        {props.src}
      </a>
    </div>
  );
});

export default ChatHistoryImage;
