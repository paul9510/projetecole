package com.example.projet_ecole.controllers;


import com.example.projet_ecole.dto.ClassesAllDto;
import com.example.projet_ecole.entities.Classe;
import com.example.projet_ecole.entities.Etudiant;
import com.example.projet_ecole.repositories.ClasseRepository;
import com.example.projet_ecole.services.ClasseService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/classe")
@CrossOrigin(origins = "http://localhost:5173")
public class ClasseController {

    private final ClasseService classeService;

    public ClasseController(ClasseService classeService) {
        this.classeService = classeService;
    }

    // Permet d'ajouter une nouvelle classe
    @PostMapping("/add")
    public ResponseEntity<?> addClasse(@RequestParam("nomClasse") String nomClasse) {

        try {
            if (nomClasse != null) {
                // Ajoute la classe en base
                classeService.ajouterNouvelleClasse(nomClasse);
                return ResponseEntity.status(201).body("Classe ajoutée avec succès.");
            } else {
                // Lors d'une erreur on renvoie un Status 400
                return ResponseEntity.status(400).body("Nomm de classe obligatoire.");
            }

        } catch (Exception e) {
            // Erreur 500 erreur server
            return ResponseEntity.status(500).body("Erreur Server " + e.getMessage());
        }
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateClasse(@RequestParam("nomClasse") String nomClasse, @RequestParam("idClasse") int idClasse) {
        try {
            classeService.updateClasse(nomClasse, idClasse);
            return ResponseEntity.status(200).body("Classe modifier avec succes");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur Server " + e.getMessage());
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteClasse(@RequestParam("idClasse") int idClasse) {
        try {
            classeService.deleteClasse(idClasse);
            return ResponseEntity.status(200).body("Classe supprimer avec succes");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur Server " + e.getMessage());
        }
    }

    @GetMapping("/allClasses")
    public ResponseEntity<?> findAllClasses() {
        try {
            List<ClassesAllDto> classes = classeService.findAllClasses();
            return ResponseEntity.status(200).body(classes);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur Server " + e.getMessage());
        }
    }


    @GetMapping("/allEtudiants")
    public ResponseEntity<?> findAllEtudiantsByClasseId(@RequestParam("idClasse") int idClasse) {
        try {
            List<Etudiant> etudiants = classeService.findAllEtudiantsByIdClasse(idClasse);
            return ResponseEntity.status(200).body(etudiants);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur Server " + e.getMessage());
        }
    }




}
