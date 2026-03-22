import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Users, FileText, BarChart3, ShieldCheck, TrendingUp, Search } from 'lucide-react';

const AdminDashboard = () => {
    const [analytics, setAnalytics] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const [analyticsRes, usersRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/admin/analytics', config),
                    axios.get('http://localhost:5000/api/admin/users', config)
                ]);
                setAnalytics(analyticsRes.data);
                setUsers(usersRes.data);
            } catch (err) {
                console.error('Admin fetch error', err);
            } finally {
                setLoading(false);
            }
        };
        if (user?.role === 'admin') fetchAdminData();
    }, [user]);

    if (loading) return <div className="pt-24 text-center">Loading Admin Panel...</div>;

    return (
        <div className="pt-24 pb-12 container mx-auto px-4 md:px-6">
            <div className="flex items-center gap-3 mb-10">
                <div className="bg-red-100 p-2 rounded-lg text-red-600">
                    <ShieldCheck size={32} />
                </div>
                <h1 className="text-4xl font-black">Admin Insights</h1>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <StatCard icon={<Users size={24} />} label="Total Users" value={analytics?.totalUsers || 0} color="blue" />
                <StatCard icon={<FileText size={24} />} label="Resumes Processed" value={analytics?.totalResumes || 0} color="purple" />
                <StatCard icon={<BarChart3 size={24} />} label="Analyses Generated" value={analytics?.totalAnalyses || 0} color="emerald" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* User List */}
                <div className="lg:col-span-2 glass rounded-3xl overflow-hidden">
                    <div className="p-6 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                        <h3 className="font-bold text-xl">System Users</h3>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input type="text" placeholder="Search users..." className="pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-500" />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-slate-500 text-sm uppercase font-bold tracking-wider">
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Joined</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y dark:divide-slate-800">
                                {users.map(u => (
                                    <tr key={u._id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold">{u.name}</div>
                                            <div className="text-xs text-slate-500">{u.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${u.role === 'admin' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'}`}>
                                                {u.role.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {new Date(u.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="flex items-center gap-1.5 text-xs font-bold text-green-600">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                Active
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="glass p-8 rounded-3xl">
                    <h3 className="font-bold text-xl mb-6">Recent Analyses</h3>
                    <div className="space-y-6">
                        {analytics?.latestAnalyses?.map(a => (
                            <div key={a._id} className="flex gap-4 items-start border-l-2 border-slate-100 dark:border-slate-800 pl-4">
                                <div className="text-xs font-mono text-slate-400">
                                    {new Date(a.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-bold truncate">{a.userId?.name} analyzed a resume</div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs font-bold text-primary-600">Score: {a.atsScore}</span>
                                        <TrendingUp size={12} className="text-primary-600" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value, color }) => {
    const colors = {
        blue: "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:border-blue-800",
        purple: "bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-900/20 dark:border-purple-800",
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800",
    };

    return (
        <div className={`p-8 rounded-3xl border ${colors[color]} glass`}>
            <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm">{icon}</div>
                <div className="text-xs font-black uppercase tracking-widest opacity-60">System Log</div>
            </div>
            <div className="text-4xl font-black mb-1">{value}</div>
            <div className="text-sm font-medium opacity-80">{label}</div>
        </div>
    );
};

export default AdminDashboard;
