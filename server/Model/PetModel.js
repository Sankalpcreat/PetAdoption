const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Pet schema
const PetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    justification: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // Use timestamps (with 's') to automatically add `createdAt` and `updatedAt`

// Export the model
module.exports = mongoose.model('Pet', PetSchema);
