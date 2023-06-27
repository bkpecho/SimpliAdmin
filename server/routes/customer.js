const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

/* Customer Routes */
router.get('/', customerController.homepage);

// it is important to export the router
module.exports = router;
