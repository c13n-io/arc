import { payreqPayToPayload } from "../../payload-protocol/parsers";
import messageClient from "../../services/messageServices";
import { appendToChatHistory } from "../discussion-utils";

const sendPayreqPay = (props, payreqObj) => {
  console.log('Paying ', payreqObj);
  messageClient().sendMessage(
    {
      discussionId: props.selectedDiscussion.id,
      payload: payreqPayToPayload(payreqObj.id),
      amtMsat: parseInt(payreqObj.amtMsat)
    }, (err, res) => {
      if (err) {
        console.log(err);
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
    }
  );
};

export {
  sendPayreqPay
};