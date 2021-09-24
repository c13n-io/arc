const attemptUsernameRead = () => {
  const read = window.localStorage.getItem('httpUsername');
  if (read) {
    return read.toString();
  }
};

const attemptPasswordRead = () => {
  const read = window.localStorage.getItem('httpPassword');
  if (read) {
    return read.toString();
  }
};

const authCreds = () => {
  // console.log({"Authorization": 'Basic ' + Buffer.from(`${attemptUsernameRead()}:${attemptPasswordRead()}`).toString('base64')})
  return {"Authorization": 'Basic ' + Buffer.from(`${attemptUsernameRead()}:${attemptPasswordRead()}`).toString('base64')};
};

export default authCreds;