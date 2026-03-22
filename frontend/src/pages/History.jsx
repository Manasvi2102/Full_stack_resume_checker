import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FileText, Calendar, ChevronRight, BarChart3, Trash2 } from 'lucide-react';

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/analysis', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setHistory(data);
            } catch (err) {
                console.error('Failed to fetch history', err);
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchHistory();
    }, [user]);

    if (loading) return (
        <div className="pt-24 container mx-auto px-4 text-center">
            <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
    );

    return (
        <div className="pt-24 pb-12 container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Analysis History</h1>

                {history.length === 0 ? (
                    <div className="glass p-12 rounded-3xl text-center">
                        <FileText size={48} className="mx-auto text-slate-300 mb-4" />
                        <h2 className="text-xl font-bold mb-2">No analyses yet</h2>
                        <p className="text-slate-500 mb-8">Upload your first resume to see insights here.</p>
                        <Link to="/dashboard" className="btn btn-primary px-8">Upload Now</Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {history.map((item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="glass hover:bg-slate-50 dark:hover:bg-slate-900/50 p-6 rounded-2xl transition-all group"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-xl">
                                            <FileText size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold mb-1 group-hover:text-primary-600 transition-colors">
                                                {item.resumeId?.fileName || 'Resume Analysis'}
                                            </h3>
                                            <div className="flex items-center gap-4 text-sm text-slate-500">
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={14} />
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </span>
                                                <span className="flex items-center gap-1 font-bold text-primary-600">
                                                    <BarChart3 size={14} />
                                                    ATS Score: {item.atsScore}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Link
                                            to={`/analysis/${item._id}`}
                                            className="btn btn-secondary px-6 py-2.5 flex items-center gap-2 group/btn"
                                        >
                                            <span>View Report</span>
                                            <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default History;
