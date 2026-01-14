import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import CreateClasseForm from "../../components/forms/CreateClasseForm.jsx";
import {Link} from "react-router-dom";
import EtudiantsSansClassePage from "../Etudiants/EtudiantsSansClassePage.jsx";

const CreateClassePage = () => {
    const [classes, setClasses] = useState([]);

    // Fonction pour charger les classes depuis le backend
    const fetchClasses = async () => {
        try {
            const res = await axios.get("http://localhost:8080/classe/allClasses");
            setClasses(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Charger au montage du composant
    useEffect(() => {
        fetchClasses();
    }, []);

    // Fonction de suppression
    const handleDelete = async (idClasse) => {
        if (window.confirm("Supprimer cette classe ?")) {
            try {
                const params = new URLSearchParams();
                params.append('idClasse', idClasse);
                await axios.post("http://localhost:8080/classe/delete", params);
                toast.success("Classe supprimée !");
                fetchClasses();
            } catch (error) {
                toast.error("Erreur lors de la suppression");
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-800">Gestion des Classes</h1>
                <Link to={"/etudiant/disponible"} className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">Voir les élèves sans classes</Link>
            </div>

            <CreateClasseForm onClasseAdded={fetchClasses} />

            <div className="bg-white shadow-md rounded-2xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="p-4 font-semibold text-slate-600">ID</th>
                        <th className="p-4 font-semibold text-slate-600">Nom de la classe</th>
                        <th className="p-4 font-semibold text-slate-600 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {classes.map((c) => (
                        <tr key={c.idClasse} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 text-slate-400 text-sm">#{c.idClasse}</td>
                            <td className="p-4 font-medium text-slate-700">{c.nom}</td>
                            <td className="p-4 text-right space-x-2">
                                <button className="text-blue-600 hover:text-blue-800 font-medium">Modifier</button>
                                <button
                                    onClick={() => handleDelete(c.idClasse)}
                                    className="text-red-600 hover:text-red-800 font-medium"
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CreateClassePage;