const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
    resumeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    atsScore: {
        type: Number,
        required: true,
    },
    skillMatch: {
        type: Number,
        required: true,
    },
    detectedSkills: [String],
    missingKeywords: [String],
    grammarIssues: [String],
    suggestions: [String],
    formattingFeedback: String,
    improvementAdvice: String,
    jobDescriptionMatch: {
        matchPercentage: Number,
        missingSkills: [String],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Analysis', analysisSchema);
