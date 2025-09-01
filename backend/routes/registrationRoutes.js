const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

// Create registration
router.post('/', async (req, res) => {
  try {
    const newReg = new Registration(req.body);
    await newReg.save();
    res.status(201).json(newReg);
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});

// Optional: Get all registrations (for admin)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.eventId) {
      filter.eventId = req.query.eventId;
    }
    const regs = await Registration.find(filter).populate('eventId');
    res.json(regs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch registrations' });
  }
});


router.delete('/:id', async (req, res) => {
  await Registration.findByIdAndDelete(req.params.id);
  res.send({ message: 'Registration deleted' });
});

module.exports = router;
