const express = require('express');
const router = express.Router();
const {
    uploadResume,
    getUserResumes,
    getResumeById,
} = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/upload', protect, upload.single('resume'), uploadResume);
router.get('/', protect, getUserResumes);
router.get('/:id', protect, getResumeById);

module.exports = router;
