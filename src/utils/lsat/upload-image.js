import { messageToPayload } from "../../payload-protocol/parsers";
import { createAttachment } from "../../payload-protocol/utils";

import messageClient from "../../services/messageServices";

import { appendToChatHistory } from '../../utils/discussion-utils';

const axios = require('axios').default;

let lsatUrl = 'https://kenovios.space:3001';
let preimage = "";
let lsat = {};

const headerToLsat = (header) => {
  const macaroonStr = header.split(' ')[1];
  const invoiceStr = header.split(' ')[2];
  const macaroon = macaroonStr.slice(10, -2);
  const invoice = invoiceStr.slice(9, -1);
  return {
    invoice: invoice,
    macaroon: macaroon
  };
};

const uploadImage = async (props) => {
  console.log('Uploading file to LSAT server');
  await axios.post(
    lsatUrl + '/upload',
  ).then((res) => {
  }).catch((err) => {
    let header = (err?.response?.headers['www-authenticate']);
    console.log(header);
    if (header) {
      lsat = headerToLsat(header);
    }
  });
  if (lsat?.invoice) {
    messageClient().sendMessage(
      {
        payReq: lsat.invoice,
        payload: "",
        options: {
          anonymous: true
        }
      },
      async (err, res) => {
        if (res) {
          console.log(res);
          preimage = res.sentMessage.preimage;
          const fileElem = document.getElementById('fileInput');
          const file = fileElem.files[0];
          let formData = new FormData();
          formData.append('file', file);

          axios.post(
            lsatUrl + '/upload',
            formData,
            {
              headers: {
                'Authorization': `LSAT ${lsat.macaroon}:${preimage}`,
              },
            }
          ).then((res) => {
            console.log(res);
            let filename = res?.data?.filename;
            let fullUrl = `${lsatUrl}/download?name=${filename}`;
            messageClient().sendMessage(
              {
                payload: messageToPayload("", [createAttachment("image", fullUrl, "lsat", true)]),
                amtMsat: 1000,
              }, (err, res) => {
                if (err) {
                  console.log(err);
                }
                if (res) {
                  props.selectedDiscussion.lastMsgId = res.sentMessage.id;
                  props.selectedDiscussion.lastReadMsgId = res.sentMessage.id;
                  appendToChatHistory(props, res.sentMessage);
                  props.updateCurrentFunds();
                  props.setLastFundChange(`-${Number(res.sentMessage.amtMsat / 1000 + res.sentMessage.totalFeesMsat / 1000)}`);
                }
              });
          }).catch((err) => {
            console.log(err.response);
          });
        }
        if (err) {
          console.log(err);
        }
      });
  }

};

export default uploadImage;
