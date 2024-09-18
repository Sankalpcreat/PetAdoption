const AdoptForm = require('../Model/AdoptFormModel.js');
const express = require('express');

const saveForm = async (req, res) => {
  try {
    const {
      email,
      livingSituation,
      phoneNo,
      previousExperience,
      familyComposition,
      petId,
    } = req.body;

    // Ensure required fields are present
    if (!email || !phoneNo || !petId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create and save the form
    const form = await AdoptForm.create({
      email,
      livingSituation,
      phoneNo,
      previousExperience,
      familyComposition,
      petId,
    });

    // Return success response
    res.status(201).json({ message: 'Form created successfully', form });
  } catch (err) {
    res.status(400).json({ message: err.message }); // Correct error response
  }
};

const getAdoptForms = async (req, res) => {
  try {
    const adoptForms = await AdoptForm.find().sort({ createdAt: -1 });
    res.status(200).json(adoptForms);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteForm = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid form id' });
    }
    const form = await AdoptForm.findByIdAndDelete(id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json({ message: 'Form deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteAllRequest = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid form id' });
    }

    const result = await AdoptForm.deleteMany({ petId: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No form found' });
    }
    res.status(200).json({ message: 'Forms deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  saveForm,
  getAdoptForms,
  deleteForm,
  deleteAllRequest,
};
