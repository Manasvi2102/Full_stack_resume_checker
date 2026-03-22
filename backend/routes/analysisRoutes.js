const express = require('express');
const router = express.Router();
const {
    analyzeResume,
    getUserAnalysisHistory,
    getAnalysisById,
} = require('../controllers/analysisController');
const { protect } = require('../middleware/authMiddleware');

router.post('/:resumeId', protect, analyzeResume);
router.get('/', protect, getUserAnalysisHistory);
router.get('/:id', protect, getAnalysisById);

module.exports = router;
