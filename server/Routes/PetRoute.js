const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  postPetRequest,
  approveRequest,
  deletePost,
  allPets,
} = require('../Controller/PetController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../images')); // Ensure __dirname is correct
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Use 'file' instead of 'res'
  },
});
const upload = multer({ storage: storage });

router.get('/requests', (req, res) => allPets('Pending', req, res));
router.get('/approvedPets', (req, res) => allPets('Approved', req, res));
router.get('/adoptedPets', (req, res) => allPets('Adopted', req, res));
router.post('/services', upload.single('picture'), postPetRequest);
router.put('/approving/:id', approveRequest);
router.delete('/delete/:id', deletePost);

module.exports = router;
