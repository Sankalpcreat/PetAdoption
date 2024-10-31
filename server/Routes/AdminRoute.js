const express = require('express');
const router = express.Router();

// Correctly destructure the function from the controller
const { getCredentials } = require('../controller/AdminController');

// Define the route for getting credentials
router.get('/credentials', getCredentials);

module.exports = router;
