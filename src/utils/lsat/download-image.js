import messageClient from "../../services/messageServices";
import { appendToChatHistory } from '../../utils/discussion-utils';

const axios = require('axios').default;

let cachedImages = {};

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

const downloadImage = async (props, fullUrl) => {
  if(cachedImages[fullUrl]) {
    return cachedImages[fullUrl];
  }
  console.log('Downloading file from LSAT server');
  await axios.get(
    fullUrl,
    {
      timeout: 4000
    }
  ).then((res) => {
  }).catch((err) => {
    let header = (err?.response?.headers['www-authenticate']);
    console.log(header);
    if (header) {
      lsat = headerToLsat(header);
    }
  });
  if (lsat.invoice) {
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
          appendToChatHistory(props, res.sentMessage);
          props.selectedDiscussion.lastMsgId = res.sentMessage.id;
          props.selectedDiscussion.lastReadMsgId = res.sentMessage.id;
          props.updateCurrentFunds();
          props.setLastFundChange(`-${Number(res.sentMessage.amtMsat / 1000 + res.sentMessage.totalFeesMsat / 1000)}`);
          preimage = res.sentMessage.preimage;
          axios.get(
            fullUrl,
            {
              responseType: 'arraybuffer',
              headers: {
                'Authorization': `LSAT ${lsat.macaroon}:${preimage}`,
              },
            }
          ).then((res) => {
            const image64 = Buffer.from(res.data, 'binary').toString('base64');
            cachedImages[fullUrl] = "data:image/png;base64, " + image64;
          }).catch((err) => {
            console.log(err);
          });
        }
        if (err) {
          console.log(err);
        }
      });
  }

};

export {
  downloadImage,
  cachedImages,
};
