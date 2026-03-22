const fs = require('fs');
const pdf = require('pdf-parse');
const Resume = require('../models/Resume');

// @desc    Upload a resume and extract text
// @route   POST /api/resume/upload
// @access  Private
const uploadResume = async (req, res, next) => {
    try {
        if (!req.file) {
            res.status(400);
            return next(new Error('Please upload a file'));
        }

        const dataBuffer = fs.readFileSync(req.file.path);
        const pdfData = await pdf(dataBuffer);
        const extractedText = pdfData.text;

        const resume = await Resume.create({
            userId: req.user._id,
            fileName: req.file.originalname,
            filePath: req.file.path,
            extractedText: extractedText,
        });

        res.status(201).json(resume);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all resumes of a user
// @route   GET /api/resume
// @access  Private
const getUserResumes = async (req, res, next) => {
    try {
        const resumes = await Resume.find({ userId: req.user._id }).sort('-uploadDate');
        res.json(resumes);
    } catch (error) {
        next(error);
    }
};

// @desc    Get resume by ID
// @route   GET /api/resume/:id
// @access  Private
const getResumeById = async (req, res, next) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (resume) {
            if (resume.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                res.status(401);
                return next(new Error('Not authorized'));
            }
            res.json(resume);
        } else {
            res.status(404);
            return next(new Error('Resume not found'));
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadResume,
    getUserResumes,
    getResumeById,
};
