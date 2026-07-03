const express = require('express');
const {registerUser,loginUser} = require('../controllers/authController');
const requireAuth = require('../middleware/authMiddleware');
const router = express.Router();
router.get('/me',requireAuth, (req, res) => {
    res.status(200).json({ user: req.user });
});
router.post('/register',registerUser);

router.post('/login',loginUser);


module.exports = router;
