package com.example.projet_ecole.controllers;


import com.example.projet_ecole.entities.Classe;
import com.example.projet_ecole.repositories.ClasseRepository;
import com.example.projet_ecole.services.ClasseService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/classe")
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
                return ResponseEntity.status(400).body("Nom d'ajout n'existe pas ou incorrect.");
            }

        } catch (Exception e) {
            // Erreur 500 erreur server
            return ResponseEntity.status(500).body("Erreur Server " + e.getMessage());
        }
    }




}
