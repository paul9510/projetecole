import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import ClassePage from "./pages/Classes/ClassePage.jsx";
import {Toaster} from "react-hot-toast";
import EtudiantsPageSansClasse from "./pages/Etudiants/EtudiantsPageSansClasse.jsx";
import EtudiantAll from "./pages/Etudiants/EtudiantAll.jsx";
import EtudiantPage from "./pages/Etudiants/EtudiantPage.jsx";
import EtudiantAdd from "./pages/Etudiants/EtudiantAdd.jsx";
import NoteParMatierePage from "./pages/Notes/NoteParMatierePage.jsx";
import NoteMoyenneGeneralePage from "./pages/Notes/NoteMoyenneGeneralePage.jsx";
import Matiere from "./pages/Matieres/Matiere.jsx";
import MatiereForm from "./components/forms/MatiereForm.jsx";
import Devoir from "./pages/Devoirs/Devoir.jsx";
import DevoirForm from "./components/forms/DevoirForm.jsx";
import NotationForm from "./components/forms/NotationForm.jsx";

function App() {
    return (
        <>
            <Toaster position="top-right" />
            <Router>
                <div className="min-h-screen bg-gray-50">
                    <nav className="bg-white shadow-sm p-4 mb-8">
                        <div className="max-w-4xl mx-auto flex gap-6">
                            <Link to="/" className="text-indigo-600 font-bold hover:text-indigo-800">Home</Link>

                            {/* On pointe vers la racine de chaque catégorie */}
                            <Link to="/classe" className="text-gray-600 font-bold hover:text-indigo-600">Classes</Link>
                            <Link to="/etudiant/allEtudiant" className="text-gray-600 font-bold hover:text-indigo-600">Étudiants</Link>
                            <Link to="/matiere/all" className="text-gray-600 font-bold hover:text-indigo-600">Matieres</Link>
                            <Link to="/devoir/all" className="text-gray-600 font-bold hover:text-indigo-600">Devoirs</Link>
                            <Link to="/note/moyenneParMatiere" className="text-gray-600 font-bold hover:text-indigo-600">Notes</Link>
                            <Link to="/note/moyenneGenerale" className="text-gray-600 font-bold hover:text-indigo-600">NotesGenerale</Link>

                        </div>
                    </nav>

                    <div className="max-w-6xl mx-auto p-4">
                        <Routes>
                            <Route path="/" element={<Home />} />

                            {/* --- ROUTES CLASSES --- */}
                            <Route path="/classe">
                                <Route index element={<ClassePage />} />
                                {/* Tu pourras ajouter plus tard : <Route path="liste" element={<ListeClasses />} /> */}
                            </Route>

                            <Route path="/note">
                                <Route path="moyenneParMatiere" element={<NoteParMatierePage />} />
                                <Route path="moyenneGenerale" element={<NoteMoyenneGeneralePage />} />
                                {/* Tu pourras ajouter plus tard : <Route path="liste" element={<ListeClasses />} /> */}
                            </Route>

                            <Route path="/matiere">
                                <Route path="all" element={<Matiere />} />
                                <Route path="add" element={<MatiereForm />} />
                                <Route path="edit/:id" element={<MatiereForm />} />
                            </Route>

                            <Route path="/devoir">
                                <Route path="all" element={<Devoir />} />
                                <Route path="add" element={<DevoirForm />} />
                                <Route path="edit/:id" element={<DevoirForm />} />
                                <Route path="notation/:id" element={<NotationForm />} />
                            </Route>

                            {/* --- ROUTES ETUDIANTS --- */}
                            <Route path="/etudiant">
                                {/* L'URL sera : /etudiant/disponible */}
                                <Route path="disponible" element={<EtudiantsPageSansClasse />} />
                                <Route path="allEtudiant" element={<EtudiantAll />} />
                                <Route path="edit/:id" element={<EtudiantPage />} />
                                <Route path="add" element={<EtudiantAdd />} />
                                {/* Tu pourras ajouter plus tard : <Route path="bulletin/:id" element={<Bulletin />} /> */}
                            </Route>
                        </Routes>
                    </div>
                </div>
            </Router>
        </>
    );
}

export default App;