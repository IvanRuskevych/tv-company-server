const { getExistsDoc, getAllDocs, getDocByID, updateDocByID } = require('./common.service');
const { createToken, verifyToken } = require('./jwt.service');

module.exports = {
  getExistsDoc,
  getAllDocs,
  getDocByID,
  updateDocByID,

  createToken,
  verifyToken,
};
