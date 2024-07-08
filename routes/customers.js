const { Router } = require('express');

const { customerSchema } = require('../schema');
const { authenticate, validateBody } = require('../middlewares');
const { getAllCustomers, createCustomer, updateCustomerData, deleteCustomer, getCustomerById } = require('../controllers');

const router = Router();

router.use(authenticate);
router.route('/').post(validateBody(customerSchema), createCustomer).get(getAllCustomers);
router.route('/:customerId').put(validateBody(customerSchema), updateCustomerData).get(getCustomerById).delete(deleteCustomer);

module.exports = router;
