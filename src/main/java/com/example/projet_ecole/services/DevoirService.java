package com.example.projet_ecole.services;


import com.example.projet_ecole.entities.Devoir;
import com.example.projet_ecole.entities.Note;
import com.example.projet_ecole.repositories.ClasseRepository;
import com.example.projet_ecole.repositories.DevoirRepository;
import com.example.projet_ecole.repositories.MatiereRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class DevoirService {

    private final DevoirRepository devoirRepository;
    private final ClasseRepository classeRepository;
    private final MatiereRepository matiereRepository;

    public DevoirService(DevoirRepository devoirRepository,  ClasseRepository classeRepository,  MatiereRepository matiereRepository) {
        this.devoirRepository = devoirRepository;
        this.classeRepository = classeRepository;
        this.matiereRepository = matiereRepository;
    }

    //RECUPERE UN DEVOIR SELON SON ID
    public Devoir findDevoirId(int idDevoir) {
        return devoirRepository.findDevoirId(idDevoir);
    }

    //RECUPERE TOUS LES DEVOIRS QUI COMPORTENT L'idMatiere
    public List<Devoir> findDevoirIdMatiere(int idMatiere) {
        return devoirRepository.findDevoirIdMatiere(idMatiere);
    }

    //SUPPRIME UN DEVOIR SELON SON ID
    public void DeleteDevoirById(int idDevoir) {
        devoirRepository.DeleteDevoirById(idDevoir);
    }

    // CREER UN DEVOIR
    public void createDevoir(String description, String categorie, double coef, int idClasse, int idMatiere) {

        LocalDate createDate = LocalDate.now();

        Devoir devoir = new Devoir();

        devoir.setDescription(description);
        devoir.setCategorie(categorie);
        devoir.setCoefficient(BigDecimal.valueOf(coef));
        devoir.setDateCreation(createDate);
        devoir.setClasse(classeRepository.findClasseId(idClasse));
        devoir.setMatiere(matiereRepository.findMatiereId(idMatiere));

        devoirRepository.save(devoir);

    }

    public void updateDevoirByIdSansNote (int classeid, int matiereid, String description, String categorie, double coef, int idDevoir) {
        devoirRepository.UpdateDevoirByIdSansNote(classeid, matiereid, description, categorie, coef, idDevoir);
    }

    public void updateDevoirByIdAvecNote(String description, String categorie, double coef, int idDevoir) {
        devoirRepository.UpdateDevoirByIdAvecNote(description, categorie, coef, idDevoir);
    }

    public List<Note> findAllNotesByDevoirId(int idDevoir) {
        return devoirRepository.findAllNotesByDevoirId(idDevoir);
    }

}
