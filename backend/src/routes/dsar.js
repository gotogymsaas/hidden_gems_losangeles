const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const DSARRequest = require('../models/DSARRequest');
const emailService = require('../utils/email');

// POST /api/dsar
router.post('/', async (req, res) => {
  const { userEmail, type, details } = req.body;
  try {
    const dsar = new DSARRequest({ userEmail, type, details });
    await dsar.save();
    res.status(201).json(dsar);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/dsar (admin)
router.get('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  try {
    const requests = await DSARRequest.find();
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/dsar/:id/status
router.put('/:id/status', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const { status } = req.body;
  try {
    const dsar = await DSARRequest.findById(req.params.id);
    if (!dsar) {
      return res.status(404).json({ message: 'Request not found' });
    }
    dsar.status = status;
    await dsar.save();
    await emailService.sendEmail(
      dsar.userEmail,
      'DSAR request status updated',
      `Your DSAR request is now ${status}.`
    );
    res.json(dsar);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
