const { login } = require('./auth');
const { currentUser } = require('./users');
const { createAdv, updateAdv, getAllAdv, getAdvById, deleteAdv } = require('./adv');
const { createAgent, updateAgentData, getAllAgents, getAgentById, deleteAgent } = require('./agents');
const { createCustomer, updateCustomerData, getAllCustomers, getCustomerById, deleteCustomer } = require('./customers');
const { createShow, updateShowData, getAllShow, getShowByID, deleteShow } = require('./shows');

module.exports = {
  createAdv,
  updateAdv,
  getAllAdv,
  getAdvById,
  deleteAdv,

  createAgent,
  updateAgentData,
  getAllAgents,
  getAgentById,
  deleteAgent,

  login,
  currentUser,

  createCustomer,
  updateCustomerData,
  getAllCustomers,
  getCustomerById,
  deleteCustomer,

  createShow,
  updateShowData,
  getAllShow,
  getShowByID,
  deleteShow,
};
