const express = require('express');
const { getVisitors, createVisitor } = require('../controllers/visitorController');
const router = express.Router();
const requireAuth = require('../middleware/authMiddleware');

router.get('/',requireAuth,getVisitors)
router.post('/',requireAuth,createVisitor)

module.exports = router;