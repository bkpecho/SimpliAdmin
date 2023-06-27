const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

/* Customer Routes */
router.get('/', customerController.homepage);

router.get('/add', customerController.addCustomer);
router.post('/add', customerController.postCustomer);

// it is important to export the router
module.exports = router;
