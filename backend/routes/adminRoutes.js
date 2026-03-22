const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getSystemAnalytics,
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/users', protect, admin, getAllUsers);
router.get('/analytics', protect, admin, getSystemAnalytics);

module.exports = router;
