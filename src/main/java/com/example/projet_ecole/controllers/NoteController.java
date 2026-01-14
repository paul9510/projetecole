package com.example.projet_ecole.controllers;

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
}
