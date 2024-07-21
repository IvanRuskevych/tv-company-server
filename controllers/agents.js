const { AgentModel } = require('../models');
const { getExistsDoc, updateDocByID, getAllDocs, getDocByID } = require('../services');
const { httpError, ctrlWrapper } = require('../utils');
const { userRolesEnum } = require('../constants');

// Create new agent
const createAgent = async (req, res) => {
  const { name, commission } = req.body;
  const { role } = req.user;

  if (role === userRolesEnum.MIDDLE) throw httpError(403, 'Role "middle" does not have rights to this action.');

  const isAgentExist = await getExistsDoc(AgentModel, { name });

  if (isAgentExist) throw httpError(409, 'Agent already exists.');

  const newAgent = await AgentModel.create({ name, commission });

  res.status(201).json(newAgent);
};

// Edit agent information
const updateAgentData = async (req, res) => {
  const { agentId } = req.params;
  const { name } = req.body;
  const { role } = req.user;

  if (role === userRolesEnum.MIDDLE) throw httpError(403, 'Role "middle" does not have rights to this action.');

  const isAgentExist = await getExistsDoc(AgentModel, { name });

  if (isAgentExist) throw httpError(409, 'Agent already exists.');

  const updatedAgent = await updateDocByID(AgentModel, agentId, req.body);

  if (!updatedAgent) throw httpError(404, 'Agent not found.');

  res.status(200).json(updatedAgent);
};

// Get all agents
const getAllAgents = async (req, res) => {
  const allAgents = await getAllDocs(AgentModel);

  if (!allAgents.length) res.status(200).json({ messages: 'There are no agents in the database.' });

  res.status(200).json(allAgents);
};

// Get agent by ID
const getAgentById = async (req, res) => {
  const { agentId } = req.params;

  const agent = await getDocByID(AgentModel, agentId);

  if (!agent) throw httpError(404, 'Agent not found.');

  res.status(200).json(agent);
};

// Delete agent
const deleteAgent = async (req, res) => {
  const { agentId } = req.params;
  const { role } = req.user;

  if (role !== userRolesEnum.CHIEF) throw httpError(403, 'Role "middle" and "senior" does not have rights to this action.');

  const isAgentExist = await AgentModel.findById(agentId);

  if (!isAgentExist) throw httpError(404, 'The agent does not exist or has been deleted.');

  await AgentModel.findByIdAndDelete(agentId);

  res.status(204).send();
};

module.exports = {
  createAgent: ctrlWrapper(createAgent),
  updateAgentData: ctrlWrapper(updateAgentData),
  getAllAgents: ctrlWrapper(getAllAgents),
  getAgentById: ctrlWrapper(getAgentById),
  deleteAgent: ctrlWrapper(deleteAgent),
};
