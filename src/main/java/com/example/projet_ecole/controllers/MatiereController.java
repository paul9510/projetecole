package com.example.projet_ecole.controllers;


import com.example.projet_ecole.entities.Devoir;
import com.example.projet_ecole.services.DevoirService;
import com.example.projet_ecole.services.MatiereService;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/matiere")
@CrossOrigin(origins = "http://localhost:5173")
public class MatiereController {

    private final MatiereService matiereService;

    private final DevoirService devoirService;

    public MatiereController(MatiereService matiereService, DevoirService devoirService) {
        this.matiereService = matiereService;
        this.devoirService = devoirService;
    }

    // CREER UNE MATIERE
    @PostMapping("/add")
    public ResponseEntity<?> createMatiere(@RequestParam String nom) {
        try {
            matiereService.createMatiere(nom);
        } catch (Exception ex) {
            return ResponseEntity.status(400).body("Erreur lors de la création de la matière");        }
        return ResponseEntity.status(201).body("Matière créer avec succès");
    }

    // MODIFIE UNE MATIERE
    @PostMapping("/modif")
    public ResponseEntity<?> modifMatiere(@RequestParam String nom,@RequestParam int idMatiere) {
        try {
            matiereService.ModifMatiere(idMatiere,nom);
        } catch (Exception ex) {
            return ResponseEntity.status(400).body("Erreur lors de la modification de la matière");        }
        return ResponseEntity.status(201).body("Matière modifiée avec succès");
    }

    // SUPPRIME UNE MATIERE NON UTILISEE
    @PostMapping("/supp")
    public ResponseEntity<?> suppMatiere(@RequestParam int idMatiere) {
        try {
            List<Devoir> lesdevoirs = devoirService.findDevoirIdMatiere(idMatiere);
            if (lesdevoirs.isEmpty()) {
                matiereService.DeleteMatiereByIdMatiere(idMatiere);
            }
            else {
                return ResponseEntity.status(400).body("Il est impossible de supprimer une matière utilisée dans un devoir");
            }
        } catch (Exception ex) {
            return ResponseEntity.status(400).body("Erreur lors de la suppression de la matière");        }
        return ResponseEntity.status(201).body("Matière supprimée avec succès");
    }
}
