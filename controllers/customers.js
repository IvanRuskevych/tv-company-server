const { CustomerModel } = require('../models');
const { getExistsDoc, getAllDoc, updateDocByID } = require('../services');
const { httpError, ctrlWrapper } = require('../utils');

// Create new customer
const createCustomer = async (req, res) => {
  const { name, phone, contactPerson, bankDetails } = req.body;

  const isCustomerExist = await getExistsDoc(CustomerModel, { name });
  if (isCustomerExist) throw httpError(409, 'Customer already exists');

  const newCustomer = await CustomerModel.create({ name, phone, contactPerson, bankDetails });

  res.status(201).json(newCustomer);
};

// Edit customer information
const updateCustomerData = async (req, res) => {
  const { customerId } = req.params;

  const updatedCustomer = await updateDocByID(CustomerModel, customerId, req.body);
  if (!updatedCustomer) throw httpError(404, 'Customer not found');

  res.status(200).json(updatedCustomer);
};

// Get all customers
const getAllCustomers = async (req, res) => {
  const allCustomers = await getAllDoc(CustomerModel);

  if (!allCustomers.length) res.status(200).json({ messages: 'There are no customers in the database' });

  res.status(200).json(allCustomers);
};

// Delete agent
const deleteCustomer = async (req, res) => {
  const { customerId } = req.params;

  const isCustomerExist = await CustomerModel.findById(customerId);
  if (!isCustomerExist) throw httpError(404, 'The agent does not exist or has been deleted.');

  await CustomerModel.findByIdAndDelete(customerId);

  res.status(204).send();
};

module.exports = {
  createCustomer: ctrlWrapper(createCustomer),
  updateCustomerData: ctrlWrapper(updateCustomerData),
  getAllCustomers: ctrlWrapper(getAllCustomers),
  deleteCustomer: ctrlWrapper(deleteCustomer),
};
