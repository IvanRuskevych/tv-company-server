const { Router } = require('express');

const { customerSchema } = require('../schema');
const { authenticate, validateBody } = require('../middlewares');
const { getAllCustomers, createCustomer, updateCustomerData, deleteCustomer } = require('../controllers');

const router = Router();

router.use(authenticate);
router.route('/').get(getAllCustomers).post(validateBody(customerSchema), createCustomer);
router.route('/:customerId').put(validateBody(customerSchema), updateCustomerData).delete(deleteCustomer);

module.exports = router;
