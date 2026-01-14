import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import ClasseForm from "../../components/forms/ClasseForm.jsx";
import {Link} from "react-router-dom";
import EtudiantsPageSansClasse from "../Etudiants/EtudiantsPageSansClasse.jsx";

const ClassePage = () => {
    const [classes, setClasses] = useState([]);
    const [editData, setEditData] = useState(null);


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

            <ClasseForm
                onClasseAdded={fetchClasses}
                editData={editData}
                setEditData={setEditData}
            />

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
                        <tr key={c.idClasse}>
                            <td className="p-4">{c.idClasse}</td>
                            <td className="p-4 font-medium">{c.nom}</td>
                            <td className="p-4 text-right space-x-2">
                                <button
                                    onClick={() => setEditData(c)}
                                    className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer">
                                    Modifier
                                </button>
                                <button onClick={() => handleDelete(c.idClasse)} className="text-red-600 cursor-pointer">
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

export default ClassePage;