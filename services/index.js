const { updateUserDataByID, getExistsUser, getUserById } = require('./auth.service');
const { createToken, verifyToken } = require('./jwt.service');
const { getExistsDoc, getAllDoc, updateDocByID } = require('./common.service');

module.exports = {
    updateUserDataByID,
    getExistsUser,
    getUserById,

    createToken,
    verifyToken,

    getExistsDoc,
    getAllDoc,
    updateDocByID,
};
