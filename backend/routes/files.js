const express = require('express');
const { body, validationResult } = require('express-validator');
const File = require('../models/File');
const auth = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/files
// @desc    Get all files for the authenticated user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', category = '' } = req.query;
    
    const query = { userId: req.user.id };
    
    // Add search filter
    if (search) {
      query.$or = [
        { fileName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Add category filter
    if (category) {
      query.category = category;
    }

    const files = await File.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('userId', 'name email');

    const total = await File.countDocuments(query);

    res.json({
      files,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/files
// @desc    Create a new file record
// @access  Private
router.post('/', [
  auth,
  body('fileName', 'File name is required').not().isEmpty(),
  body('fileType', 'File type is required').not().isEmpty(),
  body('fileSize', 'File size is required').isNumeric()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fileName, fileType, fileSize, filePath, description, category, tags } = req.body;

    const file = new File({
      fileName,
      fileType,
      fileSize,
      filePath,
      description,
      category,
      tags,
      userId: req.user.id
    });

    await file.save();
    await file.populate('userId', 'name email');

    res.status(201).json(file);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/files/:id
// @desc    Get a specific file by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const file = await File.findById(req.params.id).populate('userId', 'name email');
    
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Check if user owns the file or is admin
    if (file.userId._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(file);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'File not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/files/:id
// @desc    Update a file record
// @access  Private
router.put('/:id', [
  auth,
  body('fileName', 'File name is required').not().isEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fileName, description, category, tags } = req.body;

    let file = await File.findById(req.params.id);
    
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Check if user owns the file
    if (file.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    file = await File.findByIdAndUpdate(
      req.params.id,
      { fileName, description, category, tags, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).populate('userId', 'name email');

    res.json(file);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'File not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/files/:id
// @desc    Delete a file record
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Check if user owns the file
    if (file.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await File.findByIdAndDelete(req.params.id);
    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'File not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;