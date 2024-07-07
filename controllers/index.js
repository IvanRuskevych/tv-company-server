const { login, currentUser } = require('./auth');
const { createShow, getAllShow } = require('./shows');
const { createCustomer, editCustomerData, getAllCustomers } = require('./customers');
const { createAgent, updateAgentData, getAllAgents } = require('./agents');

module.exports = {
    login,
    currentUser,

    createShow,
    getAllShow,

    createCustomer,
    editCustomerData,
    getAllCustomers,

    createAgent,
    updateAgentData,
    getAllAgents,
};
