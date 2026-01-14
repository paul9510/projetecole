import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";

const ClasseForm = ({ onClasseAdded, editData, setEditData }) => {
    const [nomClasse, setNomClasse] = useState('');

    // Synchronise l'input quand on clique sur "Modifier" dans le tableau
    useEffect(() => {
        if (editData) {
            setNomClasse(editData.nom);
        } else {
            setNomClasse('');
        }
    }, [editData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = new URLSearchParams();

        try {
            if (editData) {
                // --- MODE UPDATE ---
                params.append('idClasse', editData.idClasse);
                params.append('nomClasse', nomClasse);
                await axios.post('http://localhost:8080/classe/update', params);
                toast.success("Classe modifiée !");
                setEditData(null); // Sort du mode édition
            } else {
                // --- MODE CREATE ---
                params.append('nomClasse', nomClasse);
                await axios.post('http://localhost:8080/classe/add', params);
                toast.success("Classe créée !");
            }

            setNomClasse('');
            if (onClasseAdded) onClasseAdded(); // Refresh la liste
        } catch (error) {
            toast.error("Erreur lors de l'opération");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex gap-4">
            <input
                type="text"
                placeholder="Nom de la classe..."
                className="flex-1 px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
                value={nomClasse}
                onChange={(e) => setNomClasse(e.target.value)}
                required
            />
            <button
                type="submit"
                className={`${editData ? 'bg-amber-500 hover:bg-amber-600' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-6 py-2 rounded-lg font-bold transition-colors cursor-pointer`}
            >
                {editData ? 'Enregistrer' : 'Ajouter'}
            </button>
            {editData && (
                <button
                    type="button"
                    onClick={() => setEditData(null)}
                    className="text-slate-400 hover:text-slate-600"
                >
                    Annuler
                </button>
            )}
        </form>
    );
};

export default ClasseForm;