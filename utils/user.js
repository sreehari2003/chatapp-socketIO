const userArr = [];

//join user to chat

exports.userJoin = (id, user, room) => {
  const us = { id, user, room };
  userArr.push(us);
  return us;
};

//getCurrentUser

exports.getCurrentUser = (id) => {
  return userArr.find((us) => us.id === id);
};
