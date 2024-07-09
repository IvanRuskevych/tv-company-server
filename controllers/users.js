const { ctrlWrapper } = require('../utils');

const currentUser = ({ user }, res) => {
  res.status(200).json(user);
};

module.exports = {
  currentUser: ctrlWrapper(currentUser),
};
