import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import {Link} from "react-router-dom";

const EtudiantAll = () => {
    const [allEtudiant, setAllEtudiant] = useState([]);

    const fetchEtudiants = async () => {
        try {
            const response = await axios.get("http://localhost:8080/etudiant/all");

            // Vérification de sécurité : on s'assure que c'est un tableau
            if (Array.isArray(response.data)) {
                setAllEtudiant(response.data);
            } else {
                console.error("Le backend n'a pas renvoyé un tableau :", response.data);
                setAllEtudiant([]); // On remet à vide pour éviter le crash
            }
        } catch (error) {
            console.error(error);
            setAllEtudiant([]); // TRÈS IMPORTANT : vide la liste en cas d'erreur
            toast.error("Impossible de charger les étudiants");
        }
    };

    // 2. Charger les données au montage du composant
    useEffect(() => {
        fetchEtudiants();
    }, []);

    // 3. Fonction de suppression (à adapter selon ton backend)
    const handleDelete = async (idEtudiant) => {
        if (window.confirm("Supprimer cet étudiant ?")) {
            try {
                const params = new URLSearchParams();
                params.append('id_etudiant', idEtudiant);
                await axios.post("http://localhost:8080/etudiant/supprimer", params);
                toast.success("Étudiant supprimé");
                fetchEtudiants();
            } catch (error) {
                toast.error("Erreur lors de la suppression");
            }
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800 border-l-4 border-indigo-600 pl-4 font-mono">
                    Liste de tous les Étudiants
                </h1>
                <Link to={"/etudiant/add"} className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm h-fit">
                    Ajouter un nouvel élève
                </Link>
            </div>

            <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-slate-200">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="p-4 font-semibold text-slate-600">ID</th>
                        <th className="p-4 font-semibold text-slate-600">Prénom</th>
                        <th className="p-4 font-semibold text-slate-600">Nom</th>
                        <th className="p-4 font-semibold text-slate-600">Classe</th>
                        <th className="p-4 font-semibold text-slate-600">Photo</th>
                        <th className="p-4 font-semibold text-slate-600 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {allEtudiant.length > 0 ? (
                        allEtudiant.map((e) => {
                            return (
                                <tr key={e.id} className="hover:bg-slate-50">
                                    <td className="p-4 text-slate-400">{e.id}</td>
                                    <td className="p-4 font-medium">{e.prenom}</td>
                                    <td className="p-4 font-medium">{e.nom}</td>
                                    <td className="p-4">
                                        {/* Gestion sécurisée du champ classe qui peut être null */}
                                        {e.classe ? (
                                            <span className="text-indigo-600 font-semibold">{e.classe.nom}</span>
                                        ) : (
                                            <span className="text-slate-400 italic">Sans classe</span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        {/* Gestion sécurisée du champ classe qui peut être null */}
                                        {e.photo ? (
                                            <span className="text-indigo-600 font-semibold">{e.photo}</span>
                                        ) : (
                                            <span className="text-slate-400 italic">Sans photo</span>
                                        )}
                                    </td>
                                    <td className="p-4 flex justify-center">
                                        <Link to={`/etudiant/edit/${e.id}`} className="text-blue-600 mr-2">Modifier</Link>
                                        <button
                                            onClick={() => handleDelete(e.id)}
                                            className="text-red-600 cursor-pointer">Supprimer</button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr><td colSpan="5" className="p-8 text-center text-slate-400">Aucun étudiant trouvé.</td></tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EtudiantAll;