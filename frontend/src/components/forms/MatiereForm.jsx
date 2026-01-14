import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";

const MatiereForm = () => {
    const { id } = useParams(); // Récupère l'id si on est en mode modif
    const navigate = useNavigate();

    // États du formulaire
    const [nom, setNom] = useState("");
    const [hasDevoirs, setHasDevoirs] = useState(false);

    useEffect(() => {
        // Chargement des infos de la matière en mode édition
        if (id) {
            axios.get(`http://localhost:8080/matiere/all`)
                .then(res => {
                    // On cherche la matière spécifique dans la liste
                    const mat = res.data.find(m => m.id === parseInt(id));
                    if (mat) {
                        setNom(mat.nom);
                        // Sécurité : on vérifie si la matière est liée à des devoirs
                        setHasDevoirs(mat.devoirs && mat.devoirs.length > 0);
                    }
                })
                .catch(() => toast.error("Erreur de chargement des données"));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Préparation des paramètres (URLSearchParams pour @RequestParam côté Java)
        const params = new URLSearchParams();
        params.append('nom', nom);

        try {
            if (id) {
                // MODE UPDATE
                params.append('idMatiere', id); // Ton Java attend 'idMatiere'
                await axios.post("http://localhost:8080/matiere/modif", params);
                toast.success("Matière modifiée avec succès !");
            } else {
                // MODE ADD
                await axios.post("http://localhost:8080/matiere/add", params);
                toast.success("Matière créée avec succès !");
            }
            navigate("/matiere/all"); // Redirection vers la liste
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data || "Erreur serveur : vérifie les paramètres");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-slate-100 mt-10">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 border-l-4 border-indigo-600 pl-3">
                {id ? "Modifier la matière" : "Nouvelle matière"}
            </h2>

            {id && hasDevoirs && (
                <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-blue-700 text-sm italic">
                    Info : Cette matière est associée à {hasDevoirs} devoir(s).
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Nom de la discipline
                    </label>
                    <input
                        type="text"
                        placeholder="Ex: Algorithmique, Java, SQL..."
                        className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                    />
                </div>

                <div className="flex gap-4 pt-2">
                    <button
                        type="submit"
                        className={`flex-1 py-3 rounded-xl font-bold text-white transition-all cursor-pointer ${
                            id ? "bg-amber-500 hover:bg-amber-600" : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                    >
                        {id ? "Enregistrer les modifications" : "Créer la matière"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 border border-slate-300 rounded-xl text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
                    >
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MatiereForm;