import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, X, AlertCircle, Loader2, Sparkles, Send, FileCheck } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(''); // 'uploading', 'analyzing', 'success'
    const [error, setError] = useState('');

    const { user } = useAuth();
    const navigate = useNavigate();

    const onDrop = useCallback(acceptedFiles => {
        const selectedFile = acceptedFiles[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setError('');
        } else {
            setError('Please upload a PDF file.');
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    });

    const handleAnalyze = async () => {
        if (!file) return;

        setLoading(true);
        setStatus('uploading');
        setError('');

        try {
            const formData = new FormData();
            formData.append('resume', file);

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`
                }
            };

            // 1. Upload Resume
            const uploadRes = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/resume/upload`, formData, config);
            const resumeId = uploadRes.data._id;

            // 2. Start AI Analysis
            setStatus('analyzing');
            const analysisRes = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/analysis/${resumeId}`, {
                jobDescription
            }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            setStatus('success');
            setTimeout(() => {
                navigate(`/analysis/${analysisRes.data._id}`);
            }, 1500);

        } catch (err) {
            setError(err.response?.data?.message || 'Analysis failed. Please check your API keys or connection.');
            setLoading(false);
            setStatus('');
        }
    };

    return (
        <div className="pt-24 pb-12 container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-10 text-center md:text-left">
                    <h1 className="text-4xl font-bold mb-3">Welcome, {user?.name.split(' ')[0]}! 👋</h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">Upload your resume and let our AI work its magic.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Upload */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Drag & Drop Area */}
                        <div
                            {...getRootProps()}
                            className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all cursor-pointer overflow-hidden
                                ${isDragActive ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-900/10' : 'border-slate-200 dark:border-slate-800 hover:border-primary-400 hover:bg-slate-50 dark:hover:bg-slate-900/50'}
                                ${file ? 'border-green-500 bg-green-50/20 dark:bg-green-900/10' : ''}
                            `}
                        >
                            <input {...getInputProps()} />

                            <AnimatePresence mode="wait">
                                {file ? (
                                    <motion.div
                                        key="file-selected"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex flex-col items-center"
                                    >
                                        <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-2xl text-green-600 mb-4">
                                            <FileCheck size={48} />
                                        </div>
                                        <h3 className="text-xl font-bold mb-1 truncate max-w-xs">{file.name}</h3>
                                        <p className="text-slate-500 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB • Ready to analyze</p>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                            className="mt-4 text-red-500 hover:text-red-600 flex items-center space-x-1 text-sm font-medium"
                                        >
                                            <X size={16} />
                                            <span>Remove file</span>
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="drag-prompt"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex flex-col items-center"
                                    >
                                        <div className="bg-primary-100 dark:bg-primary-900/30 p-4 rounded-2xl text-primary-600 mb-6">
                                            <Upload size={48} />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2">Click or Drag & Drop</h3>
                                        <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                                            Only PDF files are supported. Maximum size 25MB.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Optional Job Description */}
                        <div className="glass p-8 rounded-3xl">
                            <label className="flex items-center space-x-2 text-lg font-bold mb-4">
                                <Sparkles className="text-primary-600" size={20} />
                                <span>Target Job Description (Optional)</span>
                            </label>
                            <textarea
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                className="w-full h-48 bg-slate-50 dark:bg-slate-800/50 border dark:border-slate-700 rounded-2xl p-4 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all resize-none"
                                placeholder="Paste the job requirements here to see how well you match..."
                            />
                            <p className="mt-3 text-sm text-slate-500">Provide this for a more tailored analysis and match percentage.</p>
                        </div>
                    </div>

                    {/* Right Column: Actions & Progress */}
                    <div className="space-y-6">
                        <div className="glass p-8 rounded-3xl sticky top-28">
                            <h3 className="text-xl font-bold mb-6">Analysis Progress</h3>

                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${file ? 'bg-green-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                                        1
                                    </div>
                                    <span className={file ? 'text-green-600 font-bold' : 'text-slate-500'}>Upload Resume</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${status === 'uploading' || status === 'analyzing' || status === 'success' ? 'bg-primary-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                                        {status === 'uploading' ? <Loader2 className="animate-spin" size={16} /> : '2'}
                                    </div>
                                    <span className={status === 'uploading' ? 'text-primary-600 font-bold' : 'text-slate-500'}>Processing Text</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${status === 'analyzing' || status === 'success' ? 'bg-primary-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                                        {status === 'analyzing' ? <Loader2 className="animate-spin" size={16} /> : '3'}
                                    </div>
                                    <span className={status === 'analyzing' ? 'text-primary-600 font-bold' : 'text-slate-500'}>AI Deep Analysis</span>
                                </div>
                            </div>

                            <button
                                onClick={handleAnalyze}
                                disabled={!file || loading}
                                className="w-full btn btn-primary py-4 rounded-xl font-bold flex items-center justify-center space-x-2 mt-10"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        <span>Analyzing...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send size={20} />
                                        <span>Analyze Now</span>
                                    </>
                                )}
                            </button>

                            {error && (
                                <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl flex items-start space-x-2 border border-red-100 dark:border-red-800">
                                    <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                                    <span className="text-xs font-medium">{error}</span>
                                </div>
                            )}

                            {status === 'success' && (
                                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-xl flex items-center space-x-2 border border-green-100 dark:border-green-800">
                                    <FileCheck size={18} />
                                    <span className="text-sm font-bold">Analysis Complete! Redirecting...</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
