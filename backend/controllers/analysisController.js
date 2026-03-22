const OpenAI = require('openai');
const Analysis = require('../models/Analysis');
const Resume = require('../models/Resume');
const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// @desc    Analyze a resume using AI
// @route   POST /api/analysis/:resumeId
// @access  Private
const analyzeResume = async (req, res, next) => {
    try {
        const { resumeId } = req.params;
        const { jobDescription } = req.body;

        const resume = await Resume.findById(resumeId);

        if (!resume) {
            res.status(404);
            return next(new Error('Resume not found'));
        }

        if (resume.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            res.status(401);
            return next(new Error('Not authorized'));
        }

        let prompt = `Analyze this resume for ATS optimization. Provide:
        - ATS Score (0-100)
        - Top detected skills (array of strings)
        - Missing important keywords (array of strings)
        - Grammar issues (array of strings)
        - Formatting suggestions (array of strings)
        - Overall improvement advice (string)
        Return response in JSON format only.
        
        Resume text:
        ${resume.extractedText}`;

        if (jobDescription) {
            prompt += `\n\nAlso compare this resume with the following job description and provide:
            - Job Match Percentage (0-100)
            - Missing skills required for this job (array of strings)
            
            Job Description:
            ${jobDescription}`;
        }

        let aiOutput;

        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
            console.log("Using Mock AI Output as OpenAI API key is missing or default.");
            aiOutput = {
                atsScore: 85,
                skillMatch: 80,
                topDetectedSkills: ["JavaScript", "React", "Node.js"],
                missingKeywords: ["TypeScript", "AWS"],
                grammarIssues: [],
                formattingSuggestions: ["Use more bullet points", "Highlight your achievements"],
                overallImprovementAdvice: "Your resume is good but can be improved by adding more quantifiable achievements."
            };
            if (jobDescription) {
                aiOutput.jobMatchPercentage = 75;
                aiOutput.missingJobSkills = ["Docker", "Kubernetes"];
            }
        } else {
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo-0125", // Using 0125 as it supports json_mode well
                messages: [
                    {
                        role: "system",
                        content: "You are a professional ATS and resume reviewer. Your goal is to provide honest and actionable feedback in JSON format."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                response_format: { type: "json_object" },
            });

            aiOutput = JSON.parse(response.choices[0].message.content);
        }

        // Map AI output to our schema
        const analysisData = {
            resumeId: resume._id,
            userId: req.user._id,
            atsScore: aiOutput.atsScore || aiOutput["ATS Score"] || 0,
            skillMatch: aiOutput.skillMatch || aiOutput["Skill Match"] || 0,
            detectedSkills: aiOutput.topDetectedSkills || aiOutput.detectedSkills || [],
            missingKeywords: aiOutput.missingKeywords || [],
            grammarIssues: aiOutput.grammarIssues || [],
            suggestions: aiOutput.formattingSuggestions || aiOutput.formatting_suggestions || [],
            formattingFeedback: aiOutput.formattingFeedback || "",
            improvementAdvice: aiOutput.overallImprovementAdvice || aiOutput.improvementAdvice || "",
        };

        if (jobDescription) {
            analysisData.jobDescriptionMatch = {
                matchPercentage: aiOutput.jobMatchPercentage || 0,
                missingSkills: aiOutput.missingJobSkills || aiOutput.missingSkillsRequiredForJob || [],
            };
        }

        const analysis = await Analysis.create(analysisData);

        res.status(201).json(analysis);
    } catch (error) {
        console.error('AI Analysis Error:', error);
        next(error);
    }
};

// @desc    Get analysis history for a user
// @route   GET /api/analysis
// @access  Private
const getUserAnalysisHistory = async (req, res, next) => {
    try {
        const history = await Analysis.find({ userId: req.user._id })
            .populate('resumeId', 'fileName uploadDate')
            .sort('-createdAt');
        res.json(history);
    } catch (error) {
        next(error);
    }
};

// @desc    Get analysis by ID
// @route   GET /api/analysis/:id
// @access  Private
const getAnalysisById = async (req, res, next) => {
    try {
        const analysis = await Analysis.findById(req.params.id).populate('resumeId');

        if (analysis) {
            if (analysis.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                res.status(401);
                return next(new Error('Not authorized'));
            }
            res.json(analysis);
        } else {
            res.status(404);
            return next(new Error('Analysis not found'));
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    analyzeResume,
    getUserAnalysisHistory,
    getAnalysisById,
};
