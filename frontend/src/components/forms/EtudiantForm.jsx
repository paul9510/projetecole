import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";

const EtudiantForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // États du formulaire
    const [formData, setFormData] = useState({ nom: '', prenom: '', photo: '', classeId: '' });
    const [classes, setClasses] = useState([]);
    const [hasNotes, setHasNotes] = useState(false);

    useEffect(() => {
        // 1. Chargement des classes (indispensable pour le select)
        axios.get("http://localhost:8080/classe/allClasses")
            .then(res => setClasses(res.data))
            .catch(() => toast.error("Erreur de chargement des classes"));

        // 2. Chargement des infos de l'étudiant en mode édition
        if (id) {
            axios.get(`http://localhost:8080/etudiant/all`).then(res => {
                const etud = res.data.find(e => e.id === parseInt(id));
                if (etud) {
                    setFormData({
                        nom: etud.nom,
                        prenom: etud.prenom,
                        photo: etud.photo || '',
                        classeId: etud.classe ? (etud.classe.id || etud.classe.idClasse) : ''
                    });
                    setHasNotes(etud.notes && etud.notes.length > 0);
                }
            });
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = new URLSearchParams();

        // On remplit systématiquement tous les paramètres demandés par ton Java
        params.append('nom', formData.nom);
        params.append('prenom', formData.prenom);
        params.append('photo', formData.photo);
        params.append('id_classe', formData.classeId); // On l'envoie toujours pour éviter la 400

        try {
            if (id) {
                // MODE UPDATE
                params.append('id_etudiant', id);
                await axios.post("http://localhost:8080/etudiant/modif", params);
                toast.success("Étudiant modifié avec succès !");
            } else {
                // MODE ADD
                await axios.post("http://localhost:8080/etudiant/add", params);
                toast.success("Étudiant créé avec succès !");
            }
            navigate("/etudiant/allEtudiant");
        } catch (err) {
            toast.error("Erreur serveur : vérifie les paramètres envoyés");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10 border border-slate-100">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">
                {id ? "Modifier l'étudiant.e" : "Créer un.e étudiant.e"}
            </h2>

            {id && hasNotes && (
                <div className="mb-4 p-3 bg-amber-50 border-l-4 border-amber-400 text-amber-700 text-sm italic">
                    Note : La modification de la classe est verrouillée car l'élève a déjà des notes.
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text" placeholder="Prénom" className="p-3 border rounded-xl outline-indigo-500"
                        value={formData.prenom} onChange={e => setFormData({...formData, prenom: e.target.value})} required
                    />
                    <input
                        type="text" placeholder="Nom" className="p-3 border rounded-xl outline-indigo-500"
                        value={formData.nom} onChange={e => setFormData({...formData, nom: e.target.value})} required
                    />
                </div>

                <input
                    type="text" placeholder="Fichier photo (ex: profil.jpg)" className="w-full p-3 border rounded-xl outline-indigo-500"
                    value={formData.photo} onChange={e => setFormData({...formData, photo: e.target.value})}
                />

                <select
                    className={`w-full p-3 border rounded-xl outline-indigo-500 ${hasNotes ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                    value={formData.classeId}
                    onChange={e => setFormData({...formData, classeId: e.target.value})}
                    disabled={hasNotes}
                    required
                >
                    <option value="">-- Sélectionner une classe --</option>
                    {classes.map(c => (
                        <option key={c.idClasse || c.id} value={c.idClasse || c.id}>
                            {c.nom}
                        </option>
                    ))}
                </select>

                <div className="flex gap-4 pt-4">
                    <button type="submit" className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all cursor-pointer">
                        {id ? "Mettre à jour" : "Créer l'étudiant"}
                    </button>
                    <button type="button" onClick={() => navigate(-1)} className="px-6 py-3 border border-slate-300 rounded-xl text-slate-600 cursor-pointer">
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EtudiantForm;