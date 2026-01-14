package com.example.projet_ecole.controllers;

import com.example.projet_ecole.entities.Classe;
import com.example.projet_ecole.entities.Etudiant;
import com.example.projet_ecole.entities.Note;
import com.example.projet_ecole.repositories.EtudiantRepository;
import com.example.projet_ecole.services.ClasseService;
import com.example.projet_ecole.services.EtudiantService;
import com.example.projet_ecole.services.NoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLOutput;
import java.util.List;

@RestController
@RequestMapping("/etudiant")
@CrossOrigin(origins = "http://localhost:5173")
public class EtudiantController {

    private final EtudiantService etudiantService;

    private final NoteService noteService;

    private final ClasseService classeService;

    public EtudiantController(EtudiantService etudiantService, NoteService noteService, ClasseService classeService) {
        this.etudiantService = etudiantService;
        this.noteService = noteService;
        this.classeService = classeService;
    }

    // PERMET DE CREER UN ETUDIANT
    // nom : nom de l'étudiant | prenom : prénom de l'étudiant | photo : lien photo de l'étudiant | id_classe : id de la classe sélectionnée
    @PostMapping("/add")
    public ResponseEntity<?> createEtudiant(@RequestParam String nom, @RequestParam String prenom, @RequestParam String photo, @RequestParam int id_classe, Model model) {
        try {
            etudiantService.createEtudiant(nom, prenom, photo, id_classe);
        } catch (Exception ex) {
            return ResponseEntity.status(400).body("Erreur lors de la création de l'étudiant");        }
        return ResponseEntity.status(201).body("Etudiant créer avec succès");
    }

    //MODIFIE L'ETUDIANT
    @PostMapping("/modif")
    public ResponseEntity<?> modifEtudiant(@RequestParam String nom, @RequestParam String prenom, @RequestParam String photo, @RequestParam int id_classe,@RequestParam int id_etudiant, Model model) {
        try {
            // On récupère l'étudiant selon l'id
            Etudiant e = etudiantService.findEtudiantId(id_etudiant);
            // SI l'étudiant existe
            if(e !=null) {
                //SI l'étudiant possède des notes
                if(!noteService.findNoteIdEtudiant(id_etudiant).isEmpty()) {
                    etudiantService.ModifEtudiantNoteExistante(nom,prenom,photo,id_etudiant);
                }
                //SINON
                else {
                    etudiantService.ModifEtudiantNoteNonExistante(nom,prenom,photo,classeService.findClasseById(id_classe),id_etudiant);
                }
            }
        } catch (Exception ex) {
            return ResponseEntity.status(400).body("Erreur lors de la modification de l'étudiant");        }
        return ResponseEntity.status(201).body("Etudiant modifier avec succès");
    }

    //SUPPRIMER ETUDIANT + SES NOTES
    @PostMapping("/supprimer")
    public ResponseEntity<?> supprimerEtudiant(@RequestParam int id_etudiant, Model model) {
        try{
            //Suppression étudiant
            etudiantService.DeleteEtudiantById(id_etudiant);
            //Suppression des notes de l'étudiant
            noteService.DeleteNoteByEtudiantId(id_etudiant);
        }catch (Exception ex){
            return ResponseEntity.status(500).body("Erreur lors de la suppression de l'étudiant");
        }
        return ResponseEntity.status(201).body("Etudiant supprimer avec succès");
    }


    //RECUPERE LES ETUDIANT SANS CLASSE
    @GetMapping("/etudiantDisponible")
    public ResponseEntity<?> getEtudiantDisponible() {
        try {
            // RECUPERE UNE LISTE D'ETUDIANTS SANS CLASSE
            List<Etudiant> etudiants = etudiantService.finEtudiantSansClasse();

            // SI CETTE LISTE RETOURNE DES ETUDIANTS ON RENVOIE UN STATUS 200 ET ON MET LA LISTE DANS LE BODY
            if (etudiants != null && !etudiants.isEmpty()) {
                return ResponseEntity.status(200).body(etudiants);
            } else {
                // SINON ON RENVOIE UNE ERREUR CAR LA LISTE EST VIDE
                return ResponseEntity.status(400).body("Aucun étudiant trouvé");
            }
        } catch (Exception e) {
            // ERREUR SERVEUR
            return ResponseEntity.status(500).body("Erreur serveur : " + e.getMessage());
        }
    }

    //MET A JOURS LA CLASSE D'UN ELEVE
    @PostMapping("/updateClasseEtudiant")
    public ResponseEntity<?> updateEleveSansClasse(@RequestParam("idClasse") int idClasse, @RequestParam("idEtudiant") int idEtudiant) {
        try {
            // FUNCTION POUR MODIFIER LA CLASSE D'UN ETUDIANT
            etudiantService.modifEtudiantSansClasse(idClasse, idEtudiant);

            return ResponseEntity.status(200).body("Etudiant modifié avec succès");

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la modification : " + e.getMessage());
        }
    }



}
