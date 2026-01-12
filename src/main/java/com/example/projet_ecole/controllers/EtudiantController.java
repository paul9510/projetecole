package com.example.projet_ecole.controllers;

import com.example.projet_ecole.entities.Classe;
import com.example.projet_ecole.entities.Etudiant;
import com.example.projet_ecole.repositories.EtudiantRepository;
import com.example.projet_ecole.services.EtudiantService;
import com.example.projet_ecole.services.NoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/etudiant")
public class EtudiantController {

    private final EtudiantService etudiantService;

    private final NoteService noteService;

    public EtudiantController(EtudiantService etudiantService, NoteService noteService) {
        this.etudiantService = etudiantService;
        this.noteService = noteService;
    }

    // PERMET DE CREER UN ETUDIANT
    // nom : nom de l'étudiant | prenom : prénom de l'étudiant | photo : lien photo de l'étudiant | id_classe : id de la classe sélectionnée
    @PostMapping("/add")
    public ResponseEntity<String> createEtudiant(@RequestParam String nom, @RequestParam String prenom, @RequestParam String photo, @RequestParam int id_classe, Model model) {
        try {
            etudiantService.createEtudiant(nom, prenom, photo, id_classe);
        } catch (Exception ex) {
            return ResponseEntity.status(400).body("Erreur lors de la création de l'étudiant");        }
        return ResponseEntity.status(201).body("Etudiant créer avec succès");
    }

    @PostMapping("/modif")
    public ResponseEntity<String> modifEtudiant(@RequestParam String nom, @RequestParam String prenom, @RequestParam String photo, @RequestParam int id_classe,@RequestParam int id_etudiant, Model model) {
        try {
            // On récupère l'étudiant selon l'id
            Etudiant e = etudiantService.findEtudiantId(id_etudiant);
            // SI l'étudiant existe
            if(e !=null) {
                //SI l'étudiant possède des notes
                if(!noteService.findNoteIdEtudiant(id_etudiant).isEmpty()) {

                }
            }
        } catch (Exception ex) {
            return ResponseEntity.status(400).body("Erreur lors de la modification de l'étudiant");        }
        return ResponseEntity.status(201).body("Etudiant modifier avec succès");
    }
}
