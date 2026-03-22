import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, BrainCircuit, LogOut, LayoutDashboard, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2">
                    <div className="bg-primary-600 p-2 rounded-lg text-white">
                        <BrainCircuit size={24} />
                    </div>
                    <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600 hidden sm:block">
                        ResumeGenius
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/" className="text-sm font-medium hover:text-primary-600 transition-colors">Home</Link>
                    {user ? (
                        <>
                            <Link to="/dashboard" className="text-sm font-medium hover:text-primary-600 transition-colors">Dashboard</Link>
                            <Link to="/history" className="text-sm font-medium hover:text-primary-600 transition-colors">History</Link>
                            {user.role === 'admin' && (
                                <Link to="/admin" className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors">Admin</Link>
                            )}
                            <div className="flex items-center space-x-4 border-l pl-8 border-slate-200 dark:border-slate-800">
                                <div className="flex items-center space-x-2">
                                    <div className="bg-slate-200 dark:bg-slate-800 p-2 rounded-full">
                                        <User size={18} />
                                    </div>
                                    <span className="text-sm font-semibold">{user.name}</span>
                                </div>
                                <button onClick={handleLogout} className="p-2 text-slate-500 hover:text-red-600 transition-colors">
                                    <LogOut size={20} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-sm font-medium hover:text-primary-600 transition-colors">Login</Link>
                            <Link to="/register" className="btn btn-primary text-sm px-6 py-2">Get Started</Link>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center space-x-4">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-slate-900 border-t dark:border-slate-800 overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
                            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium">Home</Link>
                            {user ? (
                                <>
                                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium">Dashboard</Link>
                                    <Link to="/history" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium">History</Link>
                                    <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="text-left text-sm font-medium text-red-600">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium">Login</Link>
                                    <Link to="/register" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold text-primary-600">Register</Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
