const createAttachment = (type, uri, tags, show) => {
  return {
    t: type,
    u: uri,
    tags: tags ? tags : '',
    show: show ? show : false
  };
};

const exportTextMessage = (payload) => {
  let payloadObj = {};
  try{
    payloadObj = JSON.parse(payload);
  }catch{
    return undefined;
  }
  if(payloadObj.n == "c13n-mp"){
    return payloadObj.c;
  }
  if(payloadObj.n == "c13n-pp"){
    if(payloadObj.t == "payreq"){
      return "New payment request";
    }
    if(payloadObj.t == "payreq_pay"){
      return "Paid payment request";
    }
  }
  return undefined;
};

export {
  createAttachment,
  exportTextMessage
};