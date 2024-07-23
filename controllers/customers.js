const { CustomerModel } = require('../models');
const { getExistsDoc, getAllDocs, updateDocByID, getDocByID } = require('../services');
const { httpError, ctrlWrapper } = require('../utils');
const { userRolesEnum } = require('../constants');

// Create new customer
const createCustomer = async (req, res) => {
  const { name } = req.body;
  const { role } = req.user;

  if (role === userRolesEnum.MIDDLE) throw httpError(403, 'Role "middle" does not have rights to this action.');

  const isCustomerExist = await getExistsDoc(CustomerModel, { name });

  if (isCustomerExist) throw httpError(409, 'Customer already exists');

  const newCustomer = await CustomerModel.create(req.body);

  res.status(201).json(newCustomer);
};

// Edit customer information
const updateCustomerData = async (req, res) => {
  const { customerId } = req.params;
  const { name } = req.body;
  const { role } = req.user;

  if (role === userRolesEnum.MIDDLE) throw httpError(403, 'Role "middle" does not have rights to this action.');

  const isCustomerExist = await getExistsDoc(CustomerModel, { name });
  const isDifferentCustomer = !!isCustomerExist && isCustomerExist._id.toString() !== customerId;

  if (isDifferentCustomer) throw httpError(409, 'Customer already exists.');

  const updatedCustomer = await updateDocByID(CustomerModel, customerId, req.body);

  if (!updatedCustomer) throw httpError(404, 'Customer not found');

  res.status(200).json(updatedCustomer);
};

// Get all customers
const getAllCustomers = async (req, res) => {
  const allCustomers = await getAllDocs(CustomerModel);

  if (!allCustomers.length) res.status(200).json({ messages: 'There are no customers in the database' });

  res.status(200).json(allCustomers);
};

// Get customer by ID
const getCustomerById = async (req, res) => {
  const { customerId } = req.params;

  const customer = await getDocByID(CustomerModel, customerId);

  if (!customer) throw httpError(404, 'Customer not found.');

  res.status(200).json(customer);
};

// Delete customer
const deleteCustomer = async (req, res) => {
  const { customerId } = req.params;
  const { role } = req.user;

  if (role !== userRolesEnum.CHIEF) throw httpError(403, 'Role "middle" and "senior" does not have rights to this action.');

  const isCustomerExist = await CustomerModel.findById(customerId);

  if (!isCustomerExist) throw httpError(404, 'The customer does not exist or has been deleted.');

  await CustomerModel.findByIdAndDelete(customerId);

  res.status(204).send();
};

module.exports = {
  createCustomer: ctrlWrapper(createCustomer),
  updateCustomerData: ctrlWrapper(updateCustomerData),
  getAllCustomers: ctrlWrapper(getAllCustomers),
  getCustomerById: ctrlWrapper(getCustomerById),
  deleteCustomer: ctrlWrapper(deleteCustomer),
};
