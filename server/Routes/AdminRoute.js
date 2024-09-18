const express = require('express');
const router = express.Router();

// Correctly destructure the function from the controller
const { getCredentials } = require('../Controller/AdminController');

// Define the route for getting credentials
router.get('/credentials', getCredentials);

module.exports = router;
