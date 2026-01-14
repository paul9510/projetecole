import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { BookOpen, Layers, Trash2, Edit3, Plus } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Matiere = () => {
    const [matieres, setMatieres] = useState([]);
    const navigate = useNavigate();

    const fetchAllMatieres = () => {
        axios.get("http://localhost:8080/matiere/all")
            .then(res => setMatieres(res.data))
            .catch(() => toast.error("Erreur lors de la récupération des matières"));
    };

    useEffect(() => {
        fetchAllMatieres();
    }, []);

    const handleSupprimer = async (id) => {
        if (!window.confirm("Supprimer cette matière ?")) return;
        try {
            await axios.post(`http://localhost:8080/matiere/supp?idMatiere=${id}`);
            toast.success("Matière supprimée");
            fetchAllMatieres();
        } catch (err) {
            // Affiche le message d'erreur personnalisé de ton Backend (ex: "matière utilisée dans un devoir")
            toast.error(err.response?.data || "Impossible de supprimer");
        }
    };

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-black text-slate-800 border-l-4 border-indigo-600 pl-4 font-mono uppercase tracking-tight">
                        Liste des Matières ({matieres.length})
                    </h1>

                    {/* BOUTON AJOUTER */}
                    <button
                        onClick={() => navigate("/matiere/add")}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-200 cursor-pointer"
                    >
                        <Plus size={20} />
                        Nouvelle Matière
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {matieres.map((m) => (
                        <div key={m.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between hover:border-indigo-300 hover:shadow-md transition-all group">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                        <BookOpen size={20} />
                                    </div>
                                    <h3 className="font-bold text-slate-800 uppercase text-sm tracking-tight">
                                        {m.nom}
                                    </h3>
                                </div>

                                <div className="flex gap-2">
                                    {/* BOUTON MODIFIER */}
                                    <button
                                        onClick={() => navigate(`/matiere/edit/${m.id}`)}
                                        className="text-slate-300 hover:text-amber-500 transition-colors cursor-pointer"
                                        title="Modifier"
                                    >
                                        <Edit3 size={18} />
                                    </button>
                                    {/* BOUTON SUPPRIMER */}
                                    <button
                                        onClick={() => handleSupprimer(m.id)}
                                        className="text-slate-300 hover:text-rose-500 transition-colors cursor-pointer"
                                        title="Supprimer"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-4">
                                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase">
                                    <Layers size={14} />
                                    {m.devoirs ? m.devoirs.length : 0} Devoirs
                                </div>
                                <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-400">
                                    ID #{m.id}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {matieres.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200 text-slate-400 italic">
                        Aucune matière n'a été trouvée dans le système.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Matiere;