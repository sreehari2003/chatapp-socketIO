const moment = require("moment");

exports.formatMessage = (usr, text) => {
  return {
    userName: usr,
    text,
    time: moment().format("h:mm a"),
  };
};
