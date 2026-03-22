const User = require('../models/User');
const Resume = require('../models/Resume');
const Analysis = require('../models/Analysis');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).sort('-createdAt');
        res.json(users);
    } catch (error) {
        next(error);
    }
};

// @desc    Get system analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin
const getSystemAnalytics = async (req, res, next) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalResumes = await Resume.countDocuments();
        const totalAnalyses = await Analysis.countDocuments();

        const latestAnalyses = await Analysis.find({})
            .limit(5)
            .populate('userId', 'name email')
            .populate('resumeId', 'fileName')
            .sort('-createdAt');

        res.json({
            totalUsers,
            totalResumes,
            totalAnalyses,
            latestAnalyses,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    getSystemAnalytics,
};
