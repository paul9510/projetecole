import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";
import { Save, ArrowLeft, GraduationCap, ClipboardCheck, CheckCircle2 } from 'lucide-react';

const NotationForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [devoir, setDevoir] = useState(null);
    const [registre, setRegistre] = useState([]);
    const [notes, setNotes] = useState({});

    useEffect(() => {
        const loadData = async () => {
            try {
                // 1. Charger les infos du devoir
                const resM = await axios.get("http://localhost:8080/matiere/all");
                let currentD = null;
                resM.data.forEach(m => {
                    const found = m.devoirs.find(d => d.id === parseInt(id));
                    if (found) currentD = { ...found, matiereNom: m.nom };
                });
                setDevoir(currentD);

                // 2. Charger le registre (Notes + Étudiants de la classe via ta requête LEFT JOIN)
                const params = new URLSearchParams();
                params.append('idDevoir', id);

                const resN = await axios.post("http://localhost:8080/note/findNoteByDevoirByClasse", params);

                if (resN.data && Array.isArray(resN.data)) {
                    setRegistre(resN.data);

                    const map = {};
                    resN.data.forEach((item) => {
                        if (item.valeur !== null) {
                            map[`${item.nom}-${item.prenom}`] = item.valeur;
                        }
                    });
                    setNotes(map);
                }
            } catch (err) {
                toast.error("Erreur de synchronisation");
            }
        };
        loadData();
    }, [id]);

    const handleSave = async () => {
        const loadToast = toast.loading("Enregistrement...");
        try {
            const resE = await axios.get("http://localhost:8080/etudiant/all");

            const promises = Object.entries(notes).map(([key, valeur]) => {
                const [nom, prenom] = key.split('-');
                const etudiant = resE.data.find(e => e.nom === nom && e.prenom === prenom);

                if (!etudiant) return null;

                const params = new URLSearchParams();
                params.append('id_etudiant', etudiant.id);
                params.append('idDevoir', id);
                params.append('valeur', valeur);

                return axios.post("http://localhost:8080/note/add", params);
            });

            await Promise.all(promises.filter(p => p !== null));
            toast.dismiss(loadToast);
            toast.success("Notes enregistrées avec succès !");
            navigate("/devoir/all");
        } catch (err) {
            toast.dismiss(loadToast);
            toast.error("Erreur lors de la sauvegarde");
        }
    };

    if (!devoir) return <div className="p-20 text-center font-black text-slate-400 uppercase">Synchronisation...</div>;

    return (
        <div className="p-10 bg-slate-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <div className="border-l-4 border-indigo-600 pl-5">
                        <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tighter leading-none">
                            Notation <span className="text-indigo-600">{devoir.classe?.nom || "Classe"}</span>
                        </h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-2">
                            <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">{devoir.matiereNom}</span>
                            {devoir.description}
                        </p>
                    </div>
                    <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-indigo-600 font-bold uppercase text-[10px] flex items-center gap-2 transition-all group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Retour
                    </button>
                </div>

                <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                                <ClipboardCheck className="text-indigo-600" size={20} />
                            </div>
                            <div>
                                <h2 className="font-bold text-slate-700 text-sm">Registre d'évaluation</h2>
                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{devoir.classe?.nom || "Promotion"}</p>
                            </div>
                        </div>
                    </div>

                    <table className="w-full text-left">
                        <thead className="bg-white border-b border-slate-100">
                        <tr>
                            <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Étudiant</th>
                            <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Note / 20</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                        {registre.map((item, index) => {
                            const key = `${item.nom}-${item.prenom}`;
                            return (
                                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-10 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-white border border-slate-100 text-indigo-600 rounded-xl flex items-center justify-center font-black uppercase shadow-sm">
                                                {item.nom.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800 uppercase text-sm leading-none">{item.nom} {item.prenom}</p>
                                                <div className="flex items-center gap-1.5 mt-1">
                                                    <GraduationCap size={12} className="text-indigo-400" />
                                                    <span className="text-indigo-500 text-[9px] font-black uppercase tracking-wider italic">
                                                        {devoir.classe?.nom || "Classe associée"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-5 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <input
                                                type="number" step="0.5" min="0" max="20"
                                                value={notes[key] || ""}
                                                onChange={(ev) => setNotes({...notes, [key]: ev.target.value})}
                                                placeholder="--"
                                                className="w-24 p-3 bg-slate-50 border border-slate-200 rounded-xl text-center font-mono font-black text-lg focus:bg-white focus:border-indigo-600 outline-none transition-all shadow-inner"
                                            />
                                            <div className="w-6">
                                                {notes[key] && <CheckCircle2 size={18} className="text-emerald-500 animate-in zoom-in" />}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>

                    <div className="p-10 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
                            Total : {registre.length} étudiants dans la classe {devoir.classe?.nom}
                        </span>
                        <button
                            onClick={handleSave}
                            className="bg-slate-900 hover:bg-indigo-600 text-white px-12 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl transition-all active:scale-95 flex items-center gap-2"
                        >
                            <Save size={16}/> Enregistrer le registre
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotationForm;