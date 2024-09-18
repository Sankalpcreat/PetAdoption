const Pet = require('../Model/PetModel');
const fs = require('fs');
const express = require('express');

const postPetRequest = async (req, res) => {
  try {
    const { name, age, area, justification, email, phone, type } = req.body;

    if (!name || !age || !area || !justification || !email || !phone || !type) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (!req.file || !req.file.filename) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const pet = await Pet.create({
      name,
      age,
      area,
      justification,
      email,
      phone,
      type,
      filename: req.file.filename,
      status: 'pending',
    });
    res.status(200).json({ message: 'Pet created successfully', pet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approveRequest = async (req, res) => {
  try {
    const id = req.params.id;

    const { email, phone, status } = req.body;

    if (!email || !phone || !status) {
      return res.status(400).json({ message: 'Email, phone, and status are required' });
    }

    const approvePet = await Pet.findByIdAndUpdate(
      id,
      { email, phone, status },
      { new: true }
    );
    if (!approvePet) {
      res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json({ message: 'Pet approved successfully', approvePet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid pet ID' });
    }

    const pet = await Pet.findByIdAndDelete(id);

    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    const filePath = path.join(__dirname, '../images', pet.filename);

    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
      console.log(`File ${pet.filename} deleted successfully.`);
    } catch (fileError) {
      if (fileError.code === 'ENOENT') {
        console.log(`File ${pet.filename} not found, skipping deletion.`);
      } else {
        console.error(`Error deleting file: ${fileError.message}`);
        return res.status(500).json({ error: 'Error deleting the associated file' });
      }
    }

    res.status(200).json({ message: 'Pet and associated file deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};

const allPets = async (req, res) => {
  try {
    const { status } = req.query;
    const { page = 1, limit = 10 } = req.query;

    // Check if status is provided
    if (!status) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Convert page and limit to integers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Validate pagination parameters
    if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber <= 0 || limitNumber <= 0) {
      return res.status(400).json({ error: 'Invalid pagination parameters' });
    }

    // Fetch the pet data based on status with pagination
    const data = await Pet.find({ status })
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * limitNumber) // Removed semicolon here
      .limit(limitNumber);

    // If pets are found
    if (data.length > 0) {
      const totalPets = await Pet.countDocuments({ status }); // Total count for pagination
      res.status(200).json({
        currentPage: pageNumber,
        totalPages: Math.ceil(totalPets / limitNumber),
        totalPets,
        data,
      });
    } else {
      res.status(404).json({ error: 'No pets found with the specified status' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

module.exports = {
  postPetRequest,
  approveRequest,
  deletePost,
  allPets,
};
