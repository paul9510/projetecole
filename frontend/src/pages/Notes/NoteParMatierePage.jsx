import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";

const NoteParMatierePage = () => {
    const [bulletins, setBulletins] = useState([]);

    useEffect(() => {
        // Remplace par ton URL backend réelle
        axios.get("http://localhost:8080/note/moyenneByMatiere")
            .then(res => {
                setBulletins(res.data);
            })
            .catch(() => toast.error("Erreur de chargement des moyennes"));
    }, []);

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 border-l-8 border-indigo-600 pl-4 font-mono uppercase tracking-tighter">
                        Bulletin de Notes Officiel
                    </h1>
                    <div className="text-right">
                        <p className="text-xs text-slate-400 font-mono">ANNÉE SCOLAIRE 2025-2026</p>
                    </div>
                </div>

                <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-200">
                    <table className="w-full text-left">
                        <thead>
                        <tr className="bg-slate-900 text-slate-200 text-sm">
                            <th className="p-5 font-bold uppercase tracking-widest">Étudiant.e</th>
                            <th className="p-5 font-bold uppercase tracking-widest">Discipline / Matière</th>
                            <th className="p-5 font-bold uppercase tracking-widest text-center">Moyenne Actuelle</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                        {bulletins.length > 0 ? (
                            bulletins.map((b, index) => (
                                <tr key={index} className="hover:bg-indigo-50/50 transition-all group">
                                    <td className="p-5">
                                        <div className="flex flex-col">
                                                <span className="font-black text-slate-800 text-lg uppercase">
                                                    {b.nomEtudiant}
                                                </span>
                                            <span className="text-indigo-600 font-medium">
                                                    {b.prenomEtudiant}
                                                </span>
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        <div className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold border border-slate-200">
                                            {b.matiere}
                                        </div>
                                    </td>
                                    <td className="p-5 text-center">
                                        <div className={`text-2xl font-black font-mono inline-block px-4 py-2 rounded-xl shadow-sm ${
                                            b.valeur >= 10
                                                ? "text-emerald-600 bg-emerald-50 border border-emerald-100"
                                                : "text-rose-600 bg-rose-50 border border-rose-100"
                                        }`}>
                                            {/* On arrondit à 2 décimales pour l'affichage */}
                                            {b.valeur.toFixed(2)}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="p-20 text-center text-slate-400 italic">
                                    Aucune donnée disponible dans le bulletin.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default NoteParMatierePage;