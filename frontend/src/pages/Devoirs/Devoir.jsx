import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { Plus, Trash2, Edit3, Calendar, GraduationCap, ClipboardCheck, Layers } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Devoir = () => {
    const [devoirs, setDevoirs] = useState([]);
    const navigate = useNavigate();

    const fetchDevoirs = () => {
        axios.get("http://localhost:8080/matiere/all")
            .then(res => {
                const allDevoirs = res.data.flatMap(m =>
                    m.devoirs.map(d => ({ ...d, matiereNom: m.nom }))
                );
                setDevoirs(allDevoirs);
            })
            .catch(() => toast.error("Erreur de récupération"));
    };

    useEffect(() => { fetchDevoirs(); }, []);

    const handleSupprimer = async (id) => {
        if (!window.confirm("Supprimer ce devoir ?")) return;
        try {
            await axios.post(`http://localhost:8080/devoir/delete?idDevoir=${id}`);
            toast.success("Devoir supprimé");
            fetchDevoirs();
        } catch (err) {
            toast.error("Impossible de supprimer");
        }
    };

    return (
        <div className="p-10 bg-slate-50 min-h-screen">
            <div className="max-w-[1400px] mx-auto">

                {/* --- HEADER ÉPURÉ --- */}
                <header className="mb-12 flex justify-between items-center">
                    <h1 className="text-2xl font-black text-slate-800 border-l-4 border-indigo-600 pl-4 font-mono uppercase tracking-tight">
                        Gestion des Devoirs ({devoirs.length})
                    </h1>

                    <button
                        onClick={() => navigate("/devoir/add")}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-100 cursor-pointer text-sm"
                    >
                        <Plus size={18} />
                        Nouveau Devoir
                    </button>
                </header>

                {/* --- GRILLE DE CARTES --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {devoirs.map((d) => {
                        const isGraded = d.notes && d.notes.length > 0;
                        return (
                            <div key={d.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between hover:border-indigo-300 hover:shadow-md transition-all group relative overflow-hidden">

                                {/* Badge de catégorie discret */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex flex-col gap-1">
                                        <span className={`text-[9px] font-black px-2 py-0.5 rounded border w-fit uppercase tracking-widest ${
                                            d.categorie === 'EXAMEN' ? 'bg-rose-50 border-rose-100 text-rose-500' : 'bg-indigo-50 border-indigo-100 text-indigo-500'
                                        }`}>
                                            {d.categorie}
                                        </span>
                                        <h3 className="font-bold text-slate-800 uppercase text-sm tracking-tight mt-2">
                                            {d.description}
                                        </h3>
                                    </div>

                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => navigate(`/devoir/edit/${d.id}`)} className="p-1.5 text-slate-300 hover:text-amber-500 transition-colors cursor-pointer">
                                            <Edit3 size={16} />
                                        </button>
                                        <button onClick={() => handleSupprimer(d.id)} className="p-1.5 text-slate-300 hover:text-rose-500 transition-colors cursor-pointer">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Infos milieu */}
                                <div className="space-y-3 mb-8">
                                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                                        <GraduationCap size={14} className="text-slate-400" />
                                        <span className="font-medium uppercase tracking-tighter">{d.matiereNom}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400 text-[11px] font-mono">
                                        <Calendar size={14} />
                                        {d.dateCreation}
                                    </div>
                                </div>

                                {/* Footer de la carte */}
                                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Coefficient</span>
                                        <span className="text-lg font-mono font-black text-slate-800 leading-none">{d.coefficient.toFixed(1)}</span>
                                    </div>

                                    <button
                                        onClick={() => navigate(`/devoir/notation/${d.id}`)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer border ${
                                            isGraded
                                                ? 'bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-600 hover:text-white'
                                                : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-600 hover:text-indigo-600 shadow-sm'
                                        }`}
                                    >
                                        <ClipboardCheck size={14} />
                                        {isGraded ? 'Noté' : 'Saisir'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* --- EMPTY STATE --- */}
                {devoirs.length === 0 && (
                    <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200 text-slate-400 uppercase font-mono text-sm tracking-widest">
                        Aucun devoir répertorié
                    </div>
                )}
            </div>
        </div>
    );
};

export default Devoir;