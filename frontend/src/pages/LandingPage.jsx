import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Zap, BarChart3, ArrowRight, CheckCircle2, Star, UploadCloud, Cpu, TrendingUp, Users, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="pt-24 pb-12 overflow-hidden bg-slate-50 dark:bg-slate-950">
            {/* Hero Section */}
            <section className="container mx-auto px-4 md:px-6 relative min-h-[85vh] flex flex-col justify-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-primary-500/10 blur-[120px] rounded-full -z-10"></div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="max-w-5xl mx-auto text-center"
                >
                    <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-primary-50 dark:bg-primary-900/20 px-4 py-1.5 rounded-full mb-8 border border-primary-100 dark:border-primary-800">
                        <Star className="text-primary-600" size={16} />
                        <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">Trusted by over 10,000+ Job Seekers globally</span>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                        Land Your Dream Job with <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600">Smart AI</span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
                        Stop guessing why your resume isn't getting interviews. Optimize for ATS tracking algorithms, fix grammar, and match your skills to job descriptions perfectly.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/register" className="btn btn-primary px-8 py-4 text-lg flex items-center space-x-2 group w-full sm:w-auto justify-center">
                            <span>Analyze Resume Free</span>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a href="#how-it-works" className="btn bg-white dark:bg-slate-900 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 px-8 py-4 text-lg w-full sm:w-auto justify-center">
                            See How It Works
                        </a>
                    </motion.div>

                    {/* Dashboard Preview Overlay */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-20 relative mx-auto max-w-6xl rounded-2xl overflow-hidden glass border-white/40 dark:border-slate-800/80 p-2 shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)]"
                    >
                        <div className="aspect-[16/9] bg-slate-100 dark:bg-slate-900 rounded-xl overflow-hidden relative border border-slate-200/50 dark:border-slate-800">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-primary-500/10"></div>
                            {/* Fake UI */}
                            <div className="p-8 h-full flex flex-col blur-[1px] opacity-80">
                                <div className="flex justify-between items-center mb-10">
                                    <div className="h-10 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                                    <div className="flex gap-4">
                                        <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                                        <div className="h-10 w-10 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-6 mb-8">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-32 bg-white dark:bg-slate-950 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800"></div>
                                    ))}
                                </div>
                                <div className="flex-1 bg-white dark:bg-slate-950 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800"></div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Trusted By Logos */}
            <section className="py-12 border-y border-slate-200 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/20">
                <div className="container mx-auto px-4 flex flex-col items-center">
                    <p className="text-sm font-semibold text-slate-500 mb-6 uppercase tracking-wider">Candidates hired at top companies</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale">
                        {/* Placeholder Logos */}
                        <h2 className="text-2xl font-black">Google</h2>
                        <h2 className="text-2xl font-black">Meta</h2>
                        <h2 className="text-2xl font-black">Amazon</h2>
                        <h2 className="text-2xl font-black">Netflix</h2>
                        <h2 className="text-2xl font-black">Apple</h2>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white">How ResumeGenius Works</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">Three simple steps to significantly increase your interview callback rate.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        {[
                            {
                                icon: <UploadCloud size={32} />,
                                title: "1. Upload Your Resume",
                                desc: "Simply drag and drop your existing PDF resume into our secure platform. No manual text entry required."
                            },
                            {
                                icon: <Cpu size={32} />,
                                title: "2. AI Deep Scan",
                                desc: "Our OpenAI-powered engine instantly analyzes your text against thousands of successful industry resumes."
                            },
                            {
                                icon: <TrendingUp size={32} />,
                                title: "3. Get Your Report",
                                desc: "Receive immediate actionable feedback, missing critical keywords, and a simulated ATS compatibility score."
                            }
                        ].map((step, idx) => (
                            <div key={idx} className="relative flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-3xl flex items-center justify-center mb-8 shadow-sm">
                                    {step.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{step.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{step.desc}</p>
                                {idx !== 2 && (
                                    <div className="hidden md:block absolute top-10 -right-8 w-16 border-t-2 border-dashed border-slate-300 dark:border-slate-700"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Deep Features Grid */}
            <section className="py-24 bg-white dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800/50">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <div className="mb-16 md:w-1/2">
                        <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white">Everything you need to beat the machine.</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">Resume scanning software rejects over 70% of resumes before a human ever sees them. We make sure you aren't one of them.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-10 rounded-[2rem] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:shadow-primary-500/5 transition-all group"
                            >
                                <div className="bg-white dark:bg-slate-800 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-primary-600 shadow-sm border border-slate-100 dark:border-slate-700 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{feature.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <h2 className="text-4xl md:text-5xl font-black mb-16 text-center text-slate-900 dark:text-white">Wall of Love</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Sarah J.", role: "Software Engineer", review: "I spent months applying with no luck. After fixing my missing keywords using ResumeGenius, I got 3 interviews in a week. Highly recommended!" },
                            { name: "Michael R.", role: "Product Manager", review: "The AI strategic advice was mind-blowing. It pointed out flaws in how I framed my achievements that I never would have noticed on my own." },
                            { name: "Emily T.", role: "Marketing Director", review: "Worth every penny. The ATS score feature is brutally honest but incredibly necessary. It helped me re-format my overly complex resume." }
                        ].map((t, i) => (
                            <div key={i} className="p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="flex text-amber-500 mb-6">
                                    {[1, 2, 3, 4, 5].map(star => <Star key={star} size={20} fill="#f59e0b" />)}
                                </div>
                                <p className="text-slate-700 dark:text-slate-300 mb-8 italic text-lg leading-relaxed">"{t.review}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center font-bold text-primary-700 dark:text-primary-300">
                                        {t.name[0]}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">{t.name}</h4>
                                        <p className="text-sm text-slate-500">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Huge CTA Section */}
            <section className="py-24 container mx-auto px-4 md:px-6 max-w-6xl">
                <div className="rounded-[3rem] bg-gradient-to-br from-primary-600 to-indigo-800 p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-500/20">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    <div className="absolute top-0 right-0 p-16 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                        <Zap size={300} />
                    </div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Ready to bypass the bots and get hired?</h2>
                        <p className="text-primary-100 text-xl md:text-2xl mb-12 font-medium">Join thousands of successful candidates who used ResumeGenius to finally break through the resume black hole.</p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link to="/register" className="bg-white text-indigo-700 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 hover:scale-105 transition-all shadow-xl shadow-black/10">
                                Analyze Resume Free
                            </Link>
                            <div className="flex items-center justify-center gap-2 text-primary-100 mt-4 sm:mt-0 px-4">
                                <Shield size={20} />
                                <span className="text-sm font-semibold">100% Secure & Private</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const features = [
    {
        icon: <FileText size={32} />,
        title: "Deep ATS Score Analysis",
        desc: "We simulate exactly how Greenhouse, Workday, and Taleo will parse your resume. Get an instant score out of 100 based on core formatting and readability standards utilized by Fortune 500 HR departments."
    },
    {
        icon: <Zap size={32} />,
        title: "Contextual Skill Matching",
        desc: "Don't just list skills—we analyze the context. See how well your experiences actually map to standard industry descriptions and uncover critical semantic gaps."
    },
    {
        icon: <BarChart3 size={32} />,
        title: "Actionable Visual Analytics",
        desc: "Stop reading walls of text. Understand your exact resume strength immediately through our intuitive graphical charts and interactive visual feedback."
    },
    {
        icon: <Users size={32} />,
        title: "AI Strategic Advice",
        desc: "Receive customized, human-like feedback straight from OpenAI's most advanced reasoning models, evaluating the tonality, action verbs, and impact of your bullet points."
    }
];

export default LandingPage;
