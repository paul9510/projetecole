import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";

const NoteMoyenneGeneralePage = () => {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        // Remplace par ton endpoint réel
        axios.get("http://localhost:8080/note/moyenneGenerale")
            .then(res => setStats(res.data))
            .catch(() => toast.error("Erreur de récupération des moyennes"));
    }, []);

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <header className="mb-10 text-center">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-2">
                        Classement Général
                    </h1>
                    <p className="text-slate-500 font-medium">Performance globale des étudiants sur toutes les disciplines</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((item, index) => (
                        <div
                            key={index}
                            className="relative bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all group overflow-hidden"
                        >
                            {/* Décoration de fond pour les meilleurs */}
                            {item.valeur >= 14 && (
                                <div className="absolute -right-4 -top-4 bg-yellow-400/10 w-24 h-24 rounded-full blur-2xl group-hover:bg-yellow-400/20 transition-all"></div>
                            )}

                            <div className="flex flex-col items-center text-center">
                                {/* Initiales ou Avatar */}
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold mb-4 shadow-inner ${
                                    item.valeur >= 10 ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600'
                                }`}>
                                    {item.nomEtudiant.charAt(0)}{item.prenomEtudiant.charAt(0)}
                                </div>

                                <h2 className="text-xl font-black text-slate-800 leading-tight uppercase">
                                    {item.nomEtudiant}
                                </h2>
                                <p className="text-indigo-500 font-semibold mb-6">
                                    {item.prenomEtudiant}
                                </p>

                                {/* La Note */}
                                <div className="w-full pt-4 border-t border-slate-100">
                                    <div className={`text-3xl font-mono font-black ${
                                        item.valeur >= 10 ? 'text-emerald-600' : 'text-rose-600'
                                    }`}>
                                        {item.valeur.toFixed(2)}
                                        <span className="text-sm text-slate-400 ml-1">/20</span>
                                    </div>

                                    {/* Barre de progression visuelle */}
                                    <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${
                                                item.valeur >= 10 ? 'bg-emerald-500' : 'bg-rose-500'
                                            }`}
                                            style={{ width: `${(item.valeur / 20) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {stats.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                        <p className="text-slate-400 font-medium">Aucun étudiant trouvé dans la base.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NoteMoyenneGeneralePage;