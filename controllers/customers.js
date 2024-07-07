const { CustomerModel } = require('../models');
const { getExistsDoc, getAllDoc, updateDocByID } = require('../services');
const { httpError, ctrlWrapper } = require('../utils');

// Create customer
const createCustomer = async (req, res) => {
    const { name, phone, contactPerson, bankDetails } = req.body;

    const isExist = await getExistsDoc(CustomerModel, { name });
    if (isExist) throw httpError(409, 'Customer already exists');

    const newCustomer = await CustomerModel.create({ name, phone, contactPerson, bankDetails });

    res.status(201).json(newCustomer);
};

// Edit customer data
const editCustomerData = async (req, res) => {
    const { customerId } = req.params;

    const result = await updateDocByID(CustomerModel, customerId, req.body);
    if (!result) throw httpError(404, 'Customer not found');

    res.status(204).send();
};

// Get all customers
const getAllCustomers = async (req, res) => {
    const allCustomers = await getAllDoc(CustomerModel);

    if (!allCustomers.length) res.status(200).json({ messages: 'There are no clients in the database' });

    res.status(200).json(allCustomers);
};

module.exports = {
    createCustomer: ctrlWrapper(createCustomer),
    getAllCustomers: ctrlWrapper(getAllCustomers),
    editCustomerData: ctrlWrapper(editCustomerData),
};
