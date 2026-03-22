const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Consent = require('../models/Consent');

// POST /api/consent
router.post('/', auth, async (req, res) => {
  const { categories } = req.body;
  try {
    let consent = await Consent.findOne({ userId: req.user.id });
    if (consent) {
      consent.categories = categories;
      consent.timestamp = new Date();
      await consent.save();
    } else {
      consent = new Consent({ userId: req.user.id, categories });
      await consent.save();
    }
    res.json(consent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/consent
router.get('/', auth, async (req, res) => {
  try {
    const consent = await Consent.findOne({ userId: req.user.id });
    if (!consent) {
      return res.status(404).json({ message: 'Consent not found' });
    }
    res.json(consent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
