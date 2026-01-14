import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EtudiantAdd = () => {
    const navigate = useNavigate();

    // État du formulaire
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [photo, setPhoto] = useState("");
    const [idClasse, setIdClasse] = useState(""); // Stocke l'ID de la classe choisie

    // État pour la liste des classes (pour le menu déroulant)
    const [allClasses, setAllClasses] = useState([]);

    // Charger les classes disponibles dès l'ouverture du formulaire
    useEffect(() => {
        axios.get("http://localhost:8080/classe/allClasses")
            .then(res => setAllClasses(res.data))
            .catch(err => console.error("Erreur chargement classes", err));
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();

        // On prépare les données (en URLSearchParams car souvent attendu par les @RequestParam de Spring)
        const params = new URLSearchParams();
        params.append('prenom', prenom);
        params.append('nom', nom);
        params.append('photo', photo); // alice_dupont.jpg par exemple
        params.append('id_classe', idClasse); // Envoie l'ID pour l'associer côté Backend

        try {
            await axios.post("http://localhost:8080/etudiant/add", params);
            toast.success("Étudiant.e ajouté.e avec succès !");
            navigate("/etudiant/allEtudiant"); // Redirection vers la liste
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors de l'ajout");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mt-10">
            <h2 className="text-xl font-bold mb-6 text-slate-800 border-l-4 border-indigo-600 pl-3">
                Nouveau / Nouvelle étudiant.e
            </h2>

            <form onSubmit={handleAdd} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Prénom</label>
                    <input
                        type="text" required className="w-full p-2 border rounded-lg"
                        value={prenom} onChange={(e) => setPrenom(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nom</label>
                    <input
                        type="text" required className="w-full p-2 border rounded-lg"
                        value={nom} onChange={(e) => setNom(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nom du fichier photo</label>
                    <input
                        type="text" placeholder="exemple.jpg" className="w-full p-2 border rounded-lg"
                        value={photo} onChange={(e) => setPhoto(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Classe</label>
                    <select
                        className="w-full p-2 border rounded-lg bg-white"
                        value={idClasse} onChange={(e) => setIdClasse(e.target.value)}
                    >
                        <option value="">-- Sans classe --</option>
                        {allClasses.map(c => (
                            <option key={c.idClasse} value={c.idClasse}>
                                {c.nom}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors pt-4 cursor-pointer"
                >
                    Enregistrer l'étudiant
                </button>
            </form>
        </div>
    );
};

export default EtudiantAdd;