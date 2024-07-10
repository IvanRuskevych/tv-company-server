const { login } = require('./auth');
const { currentUser } = require('./users');
const { createAd, updateAdData, getAllAds, getAdById, deleteAd } = require('./ads');
const { createAgent, updateAgentData, getAllAgents, getAgentById, deleteAgent } = require('./agents');
const { createCustomer, updateCustomerData, getAllCustomers, getCustomerById, deleteCustomer } = require('./customers');
const { createShow, updateShowData, getAllShow, getShowByID, deleteShow } = require('./shows');

module.exports = {
  createAd,
  updateAdData,
  getAllAds,
  getAdById,
  deleteAd,

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
