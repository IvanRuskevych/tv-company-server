const { Router } = require('express');

const { customerSchema } = require('../schema');
const { getAllCustomers, createCustomer, editCustomerData } = require('../controllers');
const { authenticate, validateBody } = require('../middlewares');

const router = Router();

router.get('/', authenticate, getAllCustomers);
router.post('/create', authenticate, validateBody(customerSchema), authenticate, createCustomer);
router.put('/edit/:customerId', authenticate, validateBody(customerSchema), editCustomerData);

module.exports = router;
