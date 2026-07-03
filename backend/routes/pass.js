const express = require('express');
const { createPass } = require('../controllers/passController');
const requireAuth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/',requireAuth,createPass);
module.exports =router;