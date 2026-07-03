const express = require('express');
const requireAuth = require('../middleware/authMiddleware');
const router = express.Router();
const { checkIn, checkOut} = require('../controllers/checkLogController');

router.post('/checkIn',requireAuth,checkIn);
router.put('/checkOut/:id',requireAuth,checkOut);
module.exports = router;