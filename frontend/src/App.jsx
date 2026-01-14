import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import CreateClassePage from "./pages/Classes/CreateClassePage.jsx";
import {Toaster} from "react-hot-toast";
import EtudiantsSansClassePage from "./pages/Etudiants/EtudiantsSansClassePage.jsx";

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
                            <Link to="/etudiant/disponible" className="text-gray-600 font-bold hover:text-indigo-600">Étudiants Dispos</Link>
                        </div>
                    </nav>

                    <div className="max-w-4xl mx-auto p-4">
                        <Routes>
                            <Route path="/" element={<Home />} />

                            {/* --- ROUTES CLASSES --- */}
                            <Route path="/classe">
                                <Route index element={<CreateClassePage />} />
                                {/* Tu pourras ajouter plus tard : <Route path="liste" element={<ListeClasses />} /> */}
                            </Route>

                            {/* --- ROUTES ETUDIANTS --- */}
                            <Route path="/etudiant">
                                {/* L'URL sera : /etudiant/disponible */}
                                <Route path="disponible" element={<EtudiantsSansClassePage />} />
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