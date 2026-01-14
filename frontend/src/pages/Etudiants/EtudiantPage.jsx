import React from 'react';
import EtudiantForm from "../../components/forms/EtudiantForm.jsx";

const EtudiantPage = () => {
    return (
        <div className="p-4">
            <h1 className="text-xl font-bold font-mono">Etudiant</h1>
            <EtudiantForm/>
        </div>
    );
};

export default EtudiantPage;