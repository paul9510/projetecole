import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { BookOpen, Layers, User } from 'lucide-react';

const NoteParMatierePage = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8080/note/moyenneByMatiere")
            .then(res => {
                // Groupement par matière
                const grouped = res.data.reduce((acc, curr) => {
                    const key = curr.matiere || "Inconnue";
                    if (!acc[key]) acc[key] = [];
                    acc[key].push(curr);
                    return acc;
                }, {});
                setData(grouped);
            })
            .catch(() => toast.error("Erreur de récupération des notes"));
    }, []);

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-black text-slate-800 border-l-4 border-indigo-600 pl-4 font-mono uppercase tracking-tight">
                        Bulletins par Matière
                    </h1>
                </div>

                <div className="space-y-8">
                    {Object.keys(data).length > 0 ? (
                        Object.keys(data).map((matiereNom, idx) => (
                            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:border-indigo-300 transition-all">

                                {/* Header : Même style que tes cartes matières */}
                                <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                            <BookOpen size={20} />
                                        </div>
                                        <h3 className="font-bold text-slate-800 uppercase text-sm tracking-tight">
                                            {matiereNom}
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase">
                                        <Layers size={14} />
                                        {data[matiereNom].length} Élèves
                                    </div>
                                </div>

                                {/* Contenu : Tableau épuré */}
                                <div className="p-0">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50 border-b border-slate-100">
                                        <tr>
                                            <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Étudiant</th>
                                            <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Moyenne</th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                        {data[matiereNom].sort((a,b) => b.valeur - a.valeur).map((eleve, i) => (
                                            <tr key={i} className="hover:bg-indigo-50/30 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 font-bold text-xs">
                                                            <User size={14} />
                                                        </div>
                                                        <div>
                                                            <span className="font-bold text-slate-700 text-sm uppercase">{eleve.nomEtudiant}</span>
                                                            <span className="text-indigo-600 text-xs ml-2 font-medium">{eleve.prenomEtudiant}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                        <span className={`font-mono font-black text-base ${eleve.valeur >= 10 ? 'text-emerald-600' : 'text-rose-500'}`}>
                                                            {eleve.valeur.toFixed(2)}
                                                        </span>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Footer de la section */}
                                <div className="bg-slate-50/50 p-3 px-6 border-t border-slate-100 flex justify-end">
                                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                                        Moyenne de classe : {(data[matiereNom].reduce((s, e) => s + e.valeur, 0) / data[matiereNom].length).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200 text-slate-400 italic uppercase font-mono text-sm">
                            Chargement des relevés de notes...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NoteParMatierePage;