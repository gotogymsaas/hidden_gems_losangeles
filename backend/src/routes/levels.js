const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// POST /api/levels/:id/result
router.post('/:id/result', auth, (req, res) => {
  // In a real app we would store the result in DB
  res.json({ success: true, level: req.params.id });
});

module.exports = router;
