import express from "express";
import Outline from "../models/outline.model.js";
const multer = require('multer');

const upload = multer({ storage: storage });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // specify the storing path
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    // Rename the uploaded file
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = file.originalname.split('.').pop();
    const newFilename = `${uniqueSuffix}.${extension}`;
    cb(null, newFilename);
  },
});

/**
 * Handle outline uploading
 */
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // get institution id
    const institutionId = req.body.institutionId;

    // Save outline information to the database
    const outline = new Outline({
      name: req.file.filename,
      path: req.file.path,
      institution: institutionId
    });
    await outline.save();

    res.status(200).json({ message: 'Outline uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

const router = express.Router();