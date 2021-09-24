import Parser from 'html-react-parser';

const jdenticon = require("jdenticon");

let iconCache = {};

const generateIdenticon = (text, size) => {
  if(text in iconCache && iconCache[text] !== undefined) {
    if(size in iconCache[text] && iconCache[text][size] !== undefined) {
      return Parser(iconCache[text][size]);
    }
  }
  const icon = jdenticon.toSvg(text, size);
  iconCache[text] = {};
  iconCache[text][size] = icon;
  return Parser(icon);
};

export default generateIdenticon;