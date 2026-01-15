import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, GraduationCap, TrendingUp, ChevronRight } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();

    const menuItems = [
        { title: "Étudiants", desc: "Gérer les inscriptions", icon: <Users size={24}/>, link: "/etudiant/allEtudiant", color: "bg-blue-500" },
        { title: "Matières", desc: "Configuration des cours", icon: <BookOpen size={24}/>, link: "/matiere/all", color: "bg-indigo-600" },
        { title: "Bulletins", desc: "Moyennes par matière", icon: <GraduationCap size={24}/>, link: "/note/moyenneParMatiere", color: "bg-emerald-500" },
        { title: "Classement", desc: "Moyenne générale", icon: <TrendingUp size={24}/>, link: "/note/moyenneGenerale", color: "bg-amber-500" },
    ];

    return (
        <div className="min-h-[80vh] flex flex-col justify-center">
            {/* Header Section */}


            {/* Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(item.link)}
                        className="group relative bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:border-indigo-200 transition-all cursor-pointer overflow-hidden"
                    >
                        {/* Effet de fond au survol */}
                        <div className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full ${item.color} opacity-0 group-hover:opacity-10 transition-all duration-500 scale-150`}></div>

                        <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-6">
                                <div className={`p-4 ${item.color} text-white rounded-2xl shadow-lg`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight group-hover:text-indigo-600 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-400 font-medium">{item.desc}</p>
                                </div>
                            </div>
                            <ChevronRight className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-2 transition-all" size={32} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer / Status */}
            <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between items-center text-slate-400">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-xs font-bold uppercase tracking-widest">Serveur Backend Opérationnel</span>
                </div>
                <span className="text-xs font-mono">v2.0.26 - Janvier 2026</span>
            </div>
        </div>
    );
};

export default Home;