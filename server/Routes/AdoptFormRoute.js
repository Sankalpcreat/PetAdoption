const express = require('express');
const router = express.Router();
const {
  saveForm,
  getAdoptForms,
  deleteForm,
  deleteAllRequest,
} = require('../controller/AdoptFormController');

router.post('/save', saveForm);
router.get('/getForms', getAdoptForms);
router.delete('/reject/:id', deleteForm);
router.delete('/delete/many/:id', deleteAllRequest);

module.exports = router;
