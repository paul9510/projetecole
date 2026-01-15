package com.example.projet_ecole.controllers;

import com.example.projet_ecole.dto.DevoirNoteDto;
import com.example.projet_ecole.dto.EtudiantDevoirNoteDto;
import com.example.projet_ecole.entities.Note;
import com.example.projet_ecole.services.NoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/note")
@CrossOrigin(origins = "http://localhost:5173")
public class NoteController {

    private final NoteService noteService;


    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping("/releveNote")
    public ResponseEntity<?> releveNoteEtudiant(@RequestParam("id_etudiant") int id_etudiant) {
        try {
        List<EtudiantDevoirNoteDto> releveNote = noteService.getReleveParEtudiant(id_etudiant);
            return ResponseEntity.status(200).body(releveNote);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur Server " + e.getMessage());
        }

    }

    // CREATION D'UNE NOTE
    @PostMapping("/add")
    public ResponseEntity<?> createNote(@RequestParam("id_etudiant") int id_etudiant,@RequestParam("idDevoir") int idDevoir,@RequestParam("valeur") double valeur) {
        try {
            if (valeur <= 20.0 && valeur >= 0.0) {
                noteService.createNote(id_etudiant,idDevoir,valeur);
            }
            else {
                return ResponseEntity.status(500).body("La note doit être située entre 0.0 et 20.0");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur Server " + e.getMessage());
        }
        return ResponseEntity.status(200).body("Création de la note effectuée avec succès");
    }

    // MODIFIE LA NOTE D'UN ETUDIANT SUR UN DEVOIR
    @PostMapping("/modif")
    public ResponseEntity<?> modifNote(@RequestParam("id_etudiant") int id_etudiant,@RequestParam("idDevoir") int idDevoir,@RequestParam("valeur") double valeur) {
        try {
            if (valeur <= 20.0 && valeur >= 0.0) {
                noteService.modifNote(id_etudiant, idDevoir, valeur);
            }
            else {
                return ResponseEntity.status(500).body("La note doit être située entre 0.0 et 20.0");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur Server " + e.getMessage());
        }
        return ResponseEntity.status(200).body("Modification de la note effectuée avec succès");
    }

    @GetMapping("/moyenneByMatiere")
    public ResponseEntity<?> moyenneByMatiere() {
        try {
            List<EtudiantDevoirNoteDto> moyennesByMatieres = noteService.findMoyenneByMatiere();
            return ResponseEntity.status(200).body(moyennesByMatieres);
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur Server lors de la récupération des moyennes par matieres " + e.getMessage());
        }
    }

    @GetMapping("/moyenneGenerale")
    public ResponseEntity<?> moyenneGenerale() {
        try {
            List<EtudiantDevoirNoteDto> moyennesGenerales = noteService.findMoyenneGenerale();
            return ResponseEntity.status(200).body(moyennesGenerales);
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur Server lors de la récupération des moyennes generales " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> allNotes() {
        try {
            List<Note> allNotes = noteService.findToutesLesNotes();
            if (allNotes.isEmpty()) {
                return ResponseEntity.status(404).body("Aucunes notes");
            }
            return ResponseEntity.status(200).body(allNotes);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur Server " + e.getMessage());
        }
    }

    @PostMapping("/allNotesByIdDevoir")
    public ResponseEntity<?> allNotesByIdDevoir(@RequestParam("idDevoir") int idDevoir) {
        try {
            List<DevoirNoteDto> allNotesByIdDevoir = noteService.findNoteByDevoirId(idDevoir);

            if (allNotesByIdDevoir.isEmpty()) {
                return ResponseEntity.status(404).body("Aucunes notes");
            }
            return ResponseEntity.status(200).body(allNotesByIdDevoir);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur Server " + e.getMessage());
        }
    }
}
