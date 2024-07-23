const { login, logout, refresh } = require('./auth');
const { currentUser } = require('./users');
const { createCommercial, updateCommercialData, getAllCommercials, getCommercialById, deleteCommercial } = require('./commercials');
const { createAgent, updateAgentData, getAllAgents, getAgentById, deleteAgent } = require('./agents');
const { createCustomer, updateCustomerData, getAllCustomers, getCustomerById, deleteCustomer } = require('./customers');
const { createShow, updateShowData, getAllShow, getShowByID, deleteShow } = require('./shows');

module.exports = {
  login,
  logout,
  refresh,

  currentUser,

  createCommercial,
  updateCommercialData,
  getAllCommercials,
  getCommercialById,
  deleteCommercial,

  createAgent,
  updateAgentData,
  getAllAgents,
  getAgentById,
  deleteAgent,

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
