import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";
import { Save, ArrowLeft, Lock, Info } from 'lucide-react';

const DevoirForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [description, setDescription] = useState("");
    const [categorie, setCategorie] = useState("CC");
    const [coef, setCoef] = useState(1.0);
    const [idClasse, setIdClasse] = useState("");
    const [idMatiere, setIdMatiere] = useState("");

    const [classes, setClasses] = useState([]);
    const [matieres, setMatieres] = useState([]);
    const [hasNotes, setHasNotes] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [resClasses, resMatieres] = await Promise.all([
                    axios.get("http://localhost:8080/classe/allClasses"),
                    axios.get("http://localhost:8080/matiere/all")
                ]);
                setClasses(resClasses.data);
                setMatieres(resMatieres.data);

                if (id) {
                    let foundDevoir = null;
                    let foundMatiereId = "";

                    resMatieres.data.forEach(m => {
                        const d = m.devoirs.find(dev => dev.id === parseInt(id));
                        if (d) {
                            foundDevoir = d;
                            foundMatiereId = m.id;
                        }
                    });

                    if (foundDevoir) {
                        setDescription(foundDevoir.description);
                        setCategorie(foundDevoir.categorie);
                        setCoef(foundDevoir.coefficient);
                        setIdMatiere(foundMatiereId);
                        setIdClasse(foundDevoir.classe?.id || foundDevoir.classe?.idClasse || "");
                        setHasNotes(foundDevoir.notes && foundDevoir.notes.length > 0);
                    }
                }
            } catch (err) {
                toast.error("Erreur de chargement");
            }
        };
        loadData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!idClasse || !idMatiere) return toast.error("Sélectionnez une classe et une matière");

        const params = new URLSearchParams();
        params.append('description', description);
        params.append('categorie', categorie);
        params.append('coef', coef);

        try {
            if (id) {
                params.append('idDevoir', id);
                params.append('classeId', idClasse);
                params.append('matiereId', idMatiere);
                await axios.post("http://localhost:8080/devoir/update", params);
                toast.success("Mise à jour réussie");
            } else {
                params.append('idClasse', idClasse);
                params.append('idMatiere', idMatiere);
                await axios.post("http://localhost:8080/devoir/new", params);
                toast.success("Devoir créé");
            }
            navigate("/devoir/all");
        } catch (err) {
            const msg = err.response?.data?.message || err.response?.data || "Erreur serveur";
            toast.error(typeof msg === 'string' ? msg : "Erreur d'enregistrement");
        }
    };

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            <div className="max-w-3xl mx-auto">
                {/* Header Style Matière */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-black text-slate-800 border-l-4 border-indigo-600 pl-4 font-mono uppercase tracking-tight">
                        {id ? "Édition Devoir" : "Nouveau Devoir"}
                    </h1>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest"
                    >
                        <ArrowLeft size={16} /> Annuler
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-8 space-y-8">

                        {hasNotes && (
                            <div className="flex items-center gap-3 p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-700 text-[10px] font-black uppercase tracking-wider">
                                <Lock size={16} />
                                <span>Mode restreint : Ce devoir possède déjà des notes</span>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* CLASSE */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Classe</label>
                                <select
                                    disabled={hasNotes}
                                    value={idClasse}
                                    onChange={(e) => setIdClasse(e.target.value)}
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none transition-all font-bold text-sm disabled:opacity-50"
                                    required
                                >
                                    <option value="">Sélectionner...</option>
                                    {classes.map(c => <option key={c.id || c.idClasse} value={c.id || c.idClasse}>{c.nom}</option>)}
                                </select>
                            </div>

                            {/* MATIÈRE */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Discipline</label>
                                <select
                                    disabled={hasNotes}
                                    value={idMatiere}
                                    onChange={(e) => setIdMatiere(e.target.value)}
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none transition-all font-bold text-sm disabled:opacity-50"
                                    required
                                >
                                    <option value="">Sélectionner...</option>
                                    {matieres.map(m => <option key={m.id} value={m.id}>{m.nom}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Libellé de l'épreuve</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Entrez le titre du devoir..."
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none transition-all font-bold text-sm"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* CATEGORIE */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Format</label>
                                <select
                                    value={categorie}
                                    onChange={(e) => setCategorie(e.target.value)}
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none transition-all font-bold text-sm"
                                >
                                    <option value="CC">Contrôle Continu (CC)</option>
                                    <option value="EXAMEN">Examen Final</option>
                                </select>
                            </div>

                            {/* COEFFICIENT */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pondération (Coef)</label>
                                <input
                                    type="number"
                                    step="0.5"
                                    value={coef}
                                    onChange={(e) => setCoef(e.target.value)}
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none transition-all font-mono font-black text-sm"
                                    required
                                />
                            </div>
                        </div>

                        {/* BOUTON ACTIONS */}
                        <div className="pt-6 border-t border-slate-50">
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-lg shadow-indigo-100 cursor-pointer"
                            >
                                <Save size={18} />
                                {id ? "Enregistrer les modifications" : "Programmer le devoir"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DevoirForm;