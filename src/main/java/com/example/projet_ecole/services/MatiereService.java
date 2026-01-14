package com.example.projet_ecole.services;


import com.example.projet_ecole.entities.Etudiant;
import com.example.projet_ecole.entities.Matiere;
import com.example.projet_ecole.repositories.MatiereRepository;
import org.springframework.stereotype.Service;

@Service
public class MatiereService {

    private final MatiereRepository matiereRepository;

    public MatiereService(MatiereRepository matiereRepository) {
        this.matiereRepository = matiereRepository;
    }

    public Matiere findMatiereId(int idMatiere) {
        return matiereRepository.findMatiereId(idMatiere);
    }

    // CREER UNE NOUVELLE MATIERE
    public void createMatiere(String nom){
        try {
            Matiere matiere = new Matiere();
            matiere.setNom(nom);
            matiereRepository.save(matiere);
        }catch (Exception e){
            throw new RuntimeException("Erreur lors de la création de la matière : "+e);
        }
    }

    // MODIFIE LE NOM D'UNE MATIERE SELON SON ID
    public void ModifMatiere(int idMatiere, String nom){
        matiereRepository.ModifMatiere(idMatiere,nom);
    }

    // SUPPRIME LA MATIERE CORRESPONDANT A L'ID
    public void DeleteMatiereByIdMatiere(int idMatiere) {
        matiereRepository.DeleteMatiereByIdMatiere(idMatiere);
    }
}
