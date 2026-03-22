import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import {
    CheckCircle2, AlertCircle, TrendingUp, Cpu,
    Lightbulb, FileText, Download, Share2, ArrowLeft,
    BarChart, PieChart as PieChartIcon, Search
} from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const AnalysisReport = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAnalysis = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/analysis/${id}`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setAnalysis(data);
            } catch (err) {
                setError('Failed to load analysis report.');
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchAnalysis();
    }, [id, user]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-slate-500 font-medium tracking-wide">Generating Detailed Insights...</p>
            </div>
        </div>
    );

    if (error || !analysis) return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="glass p-8 rounded-3xl text-center max-w-md">
                <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Error Loading Report</h2>
                <p className="text-slate-500 mb-6">{error || 'Something went wrong.'}</p>
                <Link to="/dashboard" className="btn btn-primary w-full inline-block">Back to Dashboard</Link>
            </div>
        </div>
    );

    const barData = {
        labels: ['Current Score', 'Avg. Accepted', 'Top Tier'],
        datasets: [{
            label: 'ATS Performance',
            data: [analysis.atsScore, 75, 90],
            backgroundColor: [
                'rgba(14, 165, 233, 0.8)',
                'rgba(148, 163, 184, 0.5)',
                'rgba(34, 197, 94, 0.5)',
            ],
            borderRadius: 8,
        }]
    };

    const pieData = {
        labels: ['Matched Skills', 'Missing Skills'],
        datasets: [{
            data: [analysis.detectedSkills.length, analysis.missingKeywords.length || 3],
            backgroundColor: [
                'rgba(14, 165, 233, 0.8)',
                'rgba(244, 63, 94, 0.8)',
            ],
            borderWidth: 0,
        }]
    };

    return (
        <div className="pt-24 pb-16 container mx-auto px-4 md:px-8">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-4">
                        <Link to="/dashboard" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 px-4 py-2 rounded-full w-fit">
                            <ArrowLeft size={16} className="mr-2" />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3 tracking-tight">
                            <FileText className="text-primary-600 shrink-0" size={32} />
                            <span>{analysis.resumeId?.fileName || 'Analysis Report'}</span>
                        </h1>
                        <p className="text-slate-500 font-medium flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-emerald-500" />
                            Analyzed successfully on {new Date(analysis.createdAt).toLocaleDateString()}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button className="btn bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 shadow-sm rounded-xl px-5">
                            <Download size={18} />
                            <span>Export PDF</span>
                        </button>
                        <button className="btn bg-primary-600 hover:bg-primary-700 text-white flex items-center gap-2 shadow-md shadow-primary-600/20 rounded-xl px-5">
                            <Share2 size={18} />
                            <span>Share Link</span>
                        </button>
                    </div>
                </div>

                {/* Score Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-bold text-slate-500 uppercase tracking-wider text-xs">ATS Score</h3>
                            <div className="p-2.5 bg-primary-50 dark:bg-primary-900/30 text-primary-600 rounded-xl">
                                <TrendingUp size={22} />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-6xl font-black text-slate-900 dark:text-white">{analysis.atsScore}</span>
                            <span className="text-slate-400 font-bold text-xl">/ 100</span>
                        </div>
                        <div className="mt-8 w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${analysis.atsScore}%` }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                className={`h-full rounded-full ${analysis.atsScore >= 80 ? 'bg-emerald-500' : analysis.atsScore >= 60 ? 'bg-amber-400' : 'bg-rose-500'}`}
                            ></motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-bold text-slate-500 uppercase tracking-wider text-xs">Role Match</h3>
                            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-xl">
                                <Cpu size={22} />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-6xl font-black text-slate-900 dark:text-white">{analysis.skillMatch || (analysis.jobDescriptionMatch?.matchPercentage) || 68}%</span>
                        </div>
                        <p className="mt-6 text-sm font-medium text-slate-500">Match with standard industry requirements.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-bold text-slate-500 uppercase tracking-wider text-xs">Keywords Hit</h3>
                            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-xl">
                                <Search size={22} />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-6xl font-black text-slate-900 dark:text-white">{analysis.detectedSkills?.length || 0}</span>
                        </div>
                        <p className="mt-6 text-sm font-medium text-slate-500">Crucial technical & soft skills verified.</p>
                    </motion.div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Visual Analytics & Advice Combined Column */}
                    <div className="space-y-6">
                        {/* Overall Advice Component First */}
                        <div className="bg-primary-50 dark:bg-primary-900/20 p-8 md:p-10 rounded-[2rem] border border-primary-100 dark:border-primary-800 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative overflow-hidden">
                            <div className="absolute -top-6 -right-6 p-8 opacity-5">
                                <Lightbulb size={180} />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-primary-900 dark:text-primary-100">
                                    <Cpu size={24} className="text-primary-600" />
                                    <span>AI Strategic Advice</span>
                                </h3>
                                <p className="text-primary-900/80 dark:text-primary-200/80 text-lg leading-relaxed font-medium">
                                    "{analysis.improvementAdvice}"
                                </p>
                            </div>
                        </div>

                        {/* Formatting & Logic */}
                        <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-slate-900 dark:text-white">
                                <CheckCircle2 className="text-primary-600" size={24} />
                                <span>Actionable Improvements</span>
                            </h3>
                            <ul className="space-y-6">
                                {analysis.suggestions?.map((suggestion, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <div className="mt-1 flex-shrink-0 text-amber-500 bg-amber-50 dark:bg-amber-900/30 p-2 rounded-full">
                                            <Lightbulb size={18} />
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">{suggestion}</p>
                                    </li>
                                ))}
                                {!analysis.suggestions?.length && (
                                    <p className="text-slate-500 italic">No specific formatting suggestions detected.</p>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6 flex flex-col h-full">
                        {/* Missing Keywords */}
                        <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex-shrink-0">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-slate-900 dark:text-white">
                                <AlertCircle size={24} className="text-rose-500" />
                                <span>Critical Missing Keywords</span>
                            </h3>
                            <p className="text-slate-500 text-sm mb-6 font-medium">Adding these to your resume can significantly boost your ATS visibility entirely naturally:</p>
                            <div className="flex flex-wrap gap-2.5">
                                {analysis.missingKeywords?.length > 0 ? (
                                    analysis.missingKeywords.map((kw, i) => (
                                        <span key={i} className="px-4 py-2 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700">
                                            {kw}
                                        </span>
                                    ))
                                ) : (
                                    <div className="w-full p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 flex items-center gap-2 font-bold">
                                        <CheckCircle2 size={18} />
                                        Looks perfect! No major keywords missing.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Visual Analytics */}
                        <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex-grow">
                            <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-slate-900 dark:text-white">
                                <PieChartIcon className="text-primary-600" size={24} />
                                <span>Match Insights</span>
                            </h3>
                            <div className="flex flex-col h-full justify-around space-y-8">
                                <div className="h-56 relative w-full">
                                    <Bar
                                        data={barData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            plugins: { legend: { display: false } },
                                            scales: {
                                                y: { beginAtZero: true, max: 100, grid: { color: 'rgba(148, 163, 184, 0.1)' } },
                                                x: { grid: { display: false } }
                                            }
                                        }}
                                    />
                                </div>
                                <div className="h-56 flex justify-center pb-4">
                                    <div className="w-full max-w-[200px]">
                                        <Pie
                                            data={pieData}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: false,
                                                plugins: { legend: { position: 'bottom', labels: { padding: 20 } } }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalysisReport;
