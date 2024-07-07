const { login, currentUser } = require('./auth');
const { createShow, getAllShow } = require('./shows');
const { createCustomer, editCustomerData, getAllCustomers } = require('./customers');

module.exports = {
    login,
    currentUser,

    createShow,
    getAllShow,

    createCustomer,
    editCustomerData,
    getAllCustomers,
};
