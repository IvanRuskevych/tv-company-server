const { getExistsDoc, updateDocByID, getAllDoc } = require('../services');
const { AgentModel } = require('../models');
const { httpError, ctrlWrapper } = require('../utils');

// Create new agent
const createAgent = async (req, res) => {
  const { name, commission } = req.body;

  const isAgentExist = await getExistsDoc(AgentModel, { name });
  if (isAgentExist) throw httpError(409, 'Agent already exists.');

  const newAgent = await AgentModel.create({ name, commission });

  res.status(201).json(newAgent);
};

// Edit agent information
const updateAgentData = async (req, res) => {
  const { agentId } = req.params;

  const updatedAgent = await updateDocByID(AgentModel, agentId, req.body);
  if (!updatedAgent) throw httpError(404, 'Agent not found.');

  res.status(200).json(updatedAgent);
};

// Get all agents
const getAllAgents = async (req, res) => {
  const allAgents = await getAllDoc(AgentModel);

  if (!allAgents.length) res.status(200).json({ messages: 'There are no agents in the database.' });

  res.status(200).json(allAgents);
};

// Delete agent
const deleteAgent = async (req, res) => {
  const { agentId } = req.params;

  const isAgentExist = await AgentModel.findById(agentId);
  if (!isAgentExist) throw httpError(404, 'The agent does not exist or has been deleted.');

  await AgentModel.findByIdAndDelete(agentId);

  res.status(204).send();
};

module.exports = {
  createAgent: ctrlWrapper(createAgent),
  updateAgentData: ctrlWrapper(updateAgentData),
  getAllAgents: ctrlWrapper(getAllAgents),
  deleteAgent: ctrlWrapper(deleteAgent),
};
