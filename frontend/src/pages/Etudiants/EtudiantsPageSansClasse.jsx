import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";

const EtudiantsPageSansClasse = () => {
    const [etudiantSansClasses, setEtudiantSansClasses] = useState([]);
    const [allClasses, setAllClasses] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState({});
    const [loadingId, setLoadingId] = useState(null);

    const fetchData = async () => {
        try {
            const [resEtud, resClass] = await Promise.all([
                axios.get("http://localhost:8080/etudiant/etudiantDisponible"),
                axios.get("http://localhost:8080/classe/allClasses")
            ]);
            setEtudiantSansClasses(resEtud.data);
            setAllClasses(resClass.data); // Stocke le JSON que tu m'as montré
        } catch (error) {
            toast.error("Erreur lors de la récupération des données");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSelectChange = (etudiantId, classeId) => {
        setSelectedClasses({ ...selectedClasses, [etudiantId]: classeId });
    };

    const handleAffecter = async (etudiantId) => {
        const classeId = selectedClasses[etudiantId];

        if (!classeId) {
            toast.error("Sélectionnez une classe d'abord !");
            return;
        }

        setLoadingId(etudiantId);
        try {
            const params = new URLSearchParams();
            params.append('idEtudiant', etudiantId);
            params.append('idClasse', classeId);

            await axios.post("http://localhost:8080/etudiant/updateClasseEtudiant", params);

            toast.success("Étudiant affecté avec succès ! ✨");

            const newSelections = { ...selectedClasses };
            delete newSelections[etudiantId];
            setSelectedClasses(newSelections);

            fetchData();
        } catch (error) {
            toast.error("Erreur lors de l'affectation");
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-slate-800 border-l-4 border-indigo-600 pl-4 font-mono">
                Affectation des Étudiants
            </h1>

            <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-slate-200">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="p-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Étudiant</th>
                        <th className="p-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Affecter à</th>
                        <th className="p-4 text-sm font-semibold text-slate-600 uppercase tracking-wider text-right">Action</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {etudiantSansClasses.length > 0 ? (
                        etudiantSansClasses.map((etud) => (
                            <tr key={etud.id} className="hover:bg-indigo-50/30 transition-colors">
                                <td className="p-4 font-medium text-slate-700">
                                    {etud.nom} {etud.prenom}
                                </td>
                                <td className="p-4">
                                    <select
                                        className="w-full p-2.5 bg-gray-50 border border-slate-300 rounded-xl text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                        value={selectedClasses[etud.id] || ""}
                                        onChange={(e) => handleSelectChange(etud.id, e.target.value)}
                                    >
                                        <option value="">-- Choisir une classe --</option>
                                        {allClasses.map(c => (
                                            /* MODIFICATION ICI : c.idClasse et c.nom au lieu de c.id et c.denomination */
                                            <option key={c.idClasse} value={c.idClasse}>
                                                {c.nom}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="p-4 text-right">
                                    <button
                                        onClick={() => handleAffecter(etud.id)}
                                        disabled={!selectedClasses[etud.id] || loadingId === etud.id}
                                        className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white px-5 py-2 rounded-xl font-bold transition-all shadow-sm active:scale-95"
                                    >
                                        {loadingId === etud.id ? '...' : 'Confirmer'}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="p-8 text-center text-slate-400 italic">
                                Tous les étudiants sont déjà affectés à une classe.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EtudiantsPageSansClasse;