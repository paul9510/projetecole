package com.example.projet_ecole.services;

import com.example.projet_ecole.dto.DevoirNoteDto;
import com.example.projet_ecole.dto.EtudiantDevoirNoteDto;
import com.example.projet_ecole.entities.Etudiant;
import com.example.projet_ecole.entities.Note;
import com.example.projet_ecole.repositories.DevoirRepository;
import com.example.projet_ecole.repositories.EtudiantRepository;
import com.example.projet_ecole.repositories.NoteRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class NoteService {

    private final NoteRepository noteRepository;

    private final EtudiantRepository etudiantRepository;

    private final DevoirRepository devoirRepository;

    public NoteService(NoteRepository noteRepository, EtudiantRepository etudiantRepository, DevoirRepository devoirRepository) {
        this.noteRepository = noteRepository;
        this.etudiantRepository = etudiantRepository;
        this.devoirRepository = devoirRepository;
    }

    public List<Note> findNoteIdEtudiant(int idEtudiant){
        return noteRepository.findNoteIdEtudiant(idEtudiant);
    }

    //CREER UNE NOTE
    public void createNote(int idEtudiant,int idDevoir,double valeur){
        try {

            Note noteExistante = noteRepository.findNoteIdEtudiantIdDevoir(idEtudiant, idDevoir);

            if (noteExistante != null) {
                noteExistante.setValeur(BigDecimal.valueOf(valeur));
                noteRepository.save(noteExistante);
            } else {
                Note note = new Note();
                note.setValeur(BigDecimal.valueOf(valeur));
                note.setEtudiant(etudiantRepository.findEtudiantId(idEtudiant));
                note.setDevoir(devoirRepository.findDevoirId(idDevoir));
                noteRepository.save(note);
            }

        }catch (Exception e){
            throw new RuntimeException("Erreur lors de la création de la note : "+e);
        }
    }

    //SUPPRIMER NOTES SELON ID DE L'ETUDIANT
    public void DeleteNoteByEtudiantId(int idEtudiant) {
        noteRepository.DeleteNotesByIdEtudiant(idEtudiant);
    }

    public List<EtudiantDevoirNoteDto> getReleveParEtudiant(int idEtudiant) {
        return noteRepository.findReleveNoteByIdEtudiant(idEtudiant);
    }

    //SUPPRIMER NOTE SELON L'idDevoir
    public void DeleteNoteByIdDevoir(int idDevoir) {
        noteRepository.DeleteNoteByIdDevoir(idDevoir);
    }

    // RECUPERER LA NOTE D'UN DEVOIR DE L'ETUDIANT
    public Note findNoteIdEtudiantIdDevoir(int idEtudiant, int idDevoir) {
        return noteRepository.findNoteIdEtudiantIdDevoir(idEtudiant, idDevoir);
    }

    // MODIFIE UNE NOTE SELON SON IDETUDIANT ET SON IDDEVOIR
    public void modifNote(int idEtudiant,int idDevoir,double valeur){
        noteRepository.ModifNote(idEtudiant,idDevoir,valeur);
    }

    // RECUPERE TOUTES LES NOTES
    public List<Note> findToutesLesNotes() {
        return noteRepository.findToutesLesNotes();
    }

    // RECUPERE LE NOM PRENOM MATIERE ET SA MOYENNE POUR TOUS LES ETUDIANTS AYANT DES NOTES
    public List<EtudiantDevoirNoteDto> findMoyenneByMatiere() {
        return noteRepository.findMoyenneByMatiere();
    }

    public List<EtudiantDevoirNoteDto> findMoyenneGenerale() {
        return noteRepository.findMoyenneGenerale();
    }

    public List<DevoirNoteDto> findNoteByDevoirId(int idDevoir) {
        return noteRepository.findNoteByDevoirId(idDevoir);
    }

    public List<DevoirNoteDto> findNoteByDevoirByClasse(int idDevoir, int idClasse) {
        return noteRepository.findNoteByDevoirByClasse(idDevoir, idClasse);
    }


}
