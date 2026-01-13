package com.example.projet_ecole.controllers;

import com.example.projet_ecole.entities.Note;
import com.example.projet_ecole.services.NoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/note")
public class NoteController {

    private final NoteService noteService;


    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

//    @PostMapping("/releveNote")
//    public ResponseEntity<?> releveNoteEtudiant(@RequestParam int id_etudiant, Model model) {
//        List<Note> releveNote = noteService.findNoteIdEtudiant(id_etudiant);
//        /*
//        for (Note n : releveNote) {
//            System.out.println(n.getEtudiant().getNom());
//            System.out.println(n.getDevoir().getDescription());
//            System.out.println(n.getValeur());
//        }
//        */
//        try {
//            return ResponseEntity.status(200).body(releveNote);
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("Erreur Server " + e.getMessage());
//        }
//
//    }
}
