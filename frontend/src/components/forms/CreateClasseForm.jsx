import React, { useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";

const CreateClasseForm = ({ onClasseAdded }) => { // Récupération de la prop
    const [nomClasse, setNomClasse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        params.append('nomClasse', nomClasse);

        try {
            const response = await axios.post('http://localhost:8080/classe/add', params);

            if (response.status === 201) {
                toast.success("Classe créée !");
                setNomClasse(''); // Vide l'input

                // C'est ICI qu'on déclenche l'actualisation de la liste dans le parent
                if (onClasseAdded) onClasseAdded();
            }
        } catch (error) {
            toast.error("Erreur lors de l'ajout");
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
            <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700">
                Ajouter
            </button>
        </form>
    );
};

export default CreateClasseForm;