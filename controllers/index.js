const { login, currentUser } = require('./auth');
const { createShow, updateShowData, getAllShow, deleteShow } = require('./shows');
const { createCustomer, updateCustomerData, getAllCustomers, deleteCustomer } = require('./customers');
const { createAgent, updateAgentData, getAllAgents, deleteAgent } = require('./agents');
const { createAdv, updateAdv, getAllAdv, getAdvById, deleteAdv } = require('./adv');

module.exports = {
  login,
  currentUser,

  createShow,
  updateShowData,
  getAllShow,
  deleteShow,

  createCustomer,
  updateCustomerData,
  getAllCustomers,
  deleteCustomer,

  createAgent,
  updateAgentData,
  getAllAgents,
  deleteAgent,

  createAdv,
  updateAdv,
  getAllAdv,
  getAdvById,
  deleteAdv,
};
