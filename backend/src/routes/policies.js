const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Policy = require('../models/Policy');

// GET /api/policies?region=CA&lang=es
router.get('/', async (req, res) => {
  const { region, lang } = req.query;
  try {
    const policy = await Policy.findOne({ region, lang })
      .sort({ version: -1 });
    if (!policy) {
      return res.status(404).json({ message: 'Policy not found' });
    }
    res.json(policy);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/policies (admin)
router.put('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const { region, lang, content } = req.body;
  try {
    const latest = await Policy.findOne({ region, lang })
      .sort({ version: -1 });
    const version = latest ? latest.version + 1 : 1;
    const policy = new Policy({ region, lang, content, version });
    await policy.save();
    res.status(201).json(policy);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
