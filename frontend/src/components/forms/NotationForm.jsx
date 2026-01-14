import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";
import { Save, ArrowLeft, User, CheckCircle2, GraduationCap, ClipboardCheck } from 'lucide-react';

const NotationForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [devoir, setDevoir] = useState(null);
    const [etudiants, setEtudiants] = useState([]);
    const [notes, setNotes] = useState({});

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const resM = await axios.get("http://localhost:8080/matiere/all");
                let currentD = null;
                resM.data.forEach(m => {
                    const found = m.devoirs.find(d => d.id === parseInt(id));
                    if (found) currentD = { ...found, matiereNom: m.nom };
                });
                setDevoir(currentD);

                const resE = await axios.get("http://localhost:8080/etudiant/all");
                setEtudiants(resE.data);

                const formData = new FormData();
                formData.append('idDevoir', id);

                try {
                    const resN = await axios.post("http://localhost:8080/note/allNotesByIdDevoir", formData);
                    const map = {};
                    if (resN.data && Array.isArray(resN.data)) {
                        resE.data.forEach(etud => {
                            const n = resN.data.find(note => note.nom === etud.nom && note.prenom === etud.prenom);
                            if (n) map[etud.id] = n.valeur;
                        });
                    }
                    setNotes(map);
                } catch (e) {
                    console.log("Mode saisie : aucune note existante.");
                }
            } catch (err) {
                toast.error("Erreur de chargement");
            }
        };
        loadInitialData();
    }, [id]);

    const handleSave = async () => {
        const loadToast = toast.loading("Synchronisation du registre...");
        try {
            const entries = Object.entries(notes);
            const promises = entries.map(([etudiantId, valeur]) => {
                if (valeur === "" || valeur === null) return null;

                const params = new URLSearchParams();
                params.append('id_etudiant', parseInt(etudiantId));
                params.append('idDevoir', parseInt(id));
                params.append('valeur', parseFloat(valeur));

                return axios.post("http://localhost:8080/note/add", params, {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" }
                });
            });

            const validPromises = promises.filter(p => p !== null);
            if (validPromises.length === 0) {
                toast.dismiss(loadToast);
                return toast.error("Aucune note à enregistrer");
            }

            await Promise.all(validPromises);
            toast.dismiss(loadToast);
            toast.success("Registre mis à jour avec succès !");
            navigate("/devoir/all");
        } catch (err) {
            toast.dismiss(loadToast);
            toast.error("Erreur serveur lors de l'enregistrement");
        }
    };

    if (!devoir) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="h-12 w-12 bg-indigo-200 rounded-full"></div>
                <div className="h-4 w-32 bg-slate-200 rounded"></div>
            </div>
        </div>
    );

    return (
        <div className="p-6 md:p-12 bg-[#F8FAFC] min-h-screen font-sans">
            <div className="max-w-5xl mx-auto">

                {/* Header stylisé */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div className="relative">
                        <div className="absolute -left-6 top-0 bottom-0 w-1.5 bg-indigo-600 rounded-full"></div>
                        <div className="flex items-center gap-3 mt-3">
                            <span className="bg-indigo-100 text-indigo-700 text-[15px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                                {devoir.matiereNom}
                            </span>
                            <span className="text-slate-400 text-l font-medium">
                                {devoir.description}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate(-1)}
                        className="group flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all duration-300 font-bold text-xs uppercase tracking-widest"
                    >
                        <div className="p-2 rounded-full group-hover:bg-indigo-50 transition-colors">
                            <ArrowLeft size={18} />
                        </div>
                        Retour
                    </button>
                </div>

                {/* Card Principal */}
                <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white">
                        <div className="flex items-center gap-3 text-slate-800">
                            <ClipboardCheck className="text-indigo-600" size={24} />
                            <h2 className="font-bold text-lg">Liste des étudiants</h2>
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            {etudiants.length} inscrits
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Identité de l'élève</th>
                                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Évaluation (/20)</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                            {etudiants.map((e) => (
                                <tr key={e.id} className="group hover:bg-slate-50/80 transition-all duration-200">
                                    <td className="px-10 py-6">
                                        <div className="flex items-center gap-5">
                                            <div className="relative">
                                                <div className="w-12 h-12 bg-white border-2 border-slate-100 rounded-2xl flex items-center justify-center text-slate-700 font-black text-lg group-hover:border-indigo-200 group-hover:text-indigo-600 transition-all shadow-sm">
                                                    {e.nom.charAt(0)}
                                                </div>
                                                {notes[e.id] && (
                                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-extrabold text-slate-800 uppercase text-sm tracking-tight">{e.nom} {e.prenom}</p>
                                                <div className="flex items-center gap-1.5 mt-1">
                                                    <GraduationCap size={12} className="text-indigo-400" />
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                                        {e.classe?.nom || "Section libre"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-6">
                                        <div className="flex items-center justify-end gap-4">
                                            <div className="relative group/input">
                                                <input
                                                    type="number" step="0.5" min="0" max="20"
                                                    value={notes[e.id] || ""}
                                                    onChange={(ev) => setNotes({...notes, [e.id]: ev.target.value})}
                                                    placeholder="--"
                                                    className="w-32 p-4 bg-slate-50 border-2 border-transparent rounded-2xl text-center font-mono font-black text-xl text-slate-800 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none transition-all placeholder:text-slate-200 shadow-inner"
                                                />
                                                <span className="absolute -bottom-6 left-0 right-0 text-center text-[9px] font-black text-indigo-400 opacity-0 group-hover/input:opacity-100 transition-opacity">PTS</span>
                                            </div>
                                            <div className="w-8 flex justify-center">
                                                {notes[e.id] ? (
                                                    <CheckCircle2 size={22} className="text-emerald-500 animate-in zoom-in duration-300" />
                                                ) : (
                                                    <div className="w-5 h-5 rounded-full border-2 border-dashed border-slate-200"></div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer d'action */}
                    <div className="p-10 bg-slate-50/50 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 text-indigo-600">
                                <Save size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-700">Enregistrement automatique</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Vérifiez bien les notes avant de valider</p>
                            </div>
                        </div>

                        <button
                            onClick={handleSave}
                            className="w-full md:w-auto bg-slate-900 hover:bg-indigo-600 text-white px-12 py-5 rounded-[1.5rem] font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-indigo-200 hover:shadow-indigo-400 transition-all duration-300 active:scale-95 flex items-center justify-center gap-3"
                        >
                            Finaliser la session
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotationForm;