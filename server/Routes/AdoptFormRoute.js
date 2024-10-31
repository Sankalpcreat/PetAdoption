const express = require('express');
const router = express.Router();
const {
  saveForm,
  getAdoptForms,
  deleteForm,
  deleteAllRequests,
} = require('../controller/AdoptFormController');

router.post('/save', saveForm);
router.get('/getForms', getAdoptForms);
router.delete('/reject/:id', deleteForm);
router.delete('/delete/many/:id', deleteAllRequests);

module.exports = router;
