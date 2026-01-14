package com.example.projet_ecole.controllers;

import com.example.projet_ecole.entities.Note;
import com.example.projet_ecole.repositories.NoteRepository;
import com.example.projet_ecole.services.DevoirService;
import com.example.projet_ecole.services.NoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/devoir")
@CrossOrigin(origins = "http://localhost:5173")
public class DevoirController {

    private final DevoirService devoirService;
    private final NoteService noteService;


    public DevoirController(DevoirService devoirService, NoteService noteService) {
        this.devoirService = devoirService;
        this.noteService = noteService;
    }

    @PostMapping("/new")
    public ResponseEntity<?> newDevoir(@RequestParam("description") String description,
                                       @RequestParam("categorie") String categorie,
                                       @RequestParam("coef") double coef,
                                       @RequestParam("idClasse") int idClasse,
                                       @RequestParam("idMatiere") int idMatiere){

        try {
            if (description == null && categorie == null && coef <= 0) {
                return ResponseEntity.status(404).body("Veuillez remplir tous les champs");
            }

            devoirService.createDevoir(description, categorie, coef, idClasse, idMatiere);
            return ResponseEntity.status(201).body("Devoir créer avec succes");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur Server " + e.getMessage());
        }
    }


    // SUPPRIMER UN DEVOIR
    @PostMapping("/delete")
    public ResponseEntity<?> deleteDevoir(@RequestParam("idDevoir") int idDevoir) {
        try {
            devoirService.DeleteDevoirById(idDevoir);
            noteService.DeleteNoteByIdDevoir(idDevoir);
            return ResponseEntity.status(200).body("Devoir supprimer avec succes");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur Server " + e.getMessage());
        }
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateDevoirById (@RequestParam("classeId") int classeId,
                                               @RequestParam("matiereId") int matiereId,
                                               @RequestParam("description") String description,
                                               @RequestParam("categorie") String categorie,
                                               @RequestParam("coef") double coef,
                                               @RequestParam("idDevoir") int idDevoir) {
        try {
            List<Note> notes = devoirService.findAllNotesByDevoirId(idDevoir);

            if (notes.isEmpty()) {
                devoirService.updateDevoirByIdSansNote(classeId, matiereId, description, categorie, coef, idDevoir);
                return ResponseEntity.status(200).body("DevoirSansNote modifier avec succes");
            }
            devoirService.updateDevoirByIdAvecNote(description, categorie, coef, idDevoir);
            return ResponseEntity.status(200).body("DevoirAvecNote modifier avec succes");

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur Server " + e.getMessage());
        }
    }
}
