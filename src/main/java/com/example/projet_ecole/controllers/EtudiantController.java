package com.example.projet_ecole.controllers;

import com.example.projet_ecole.entities.Classe;
import com.example.projet_ecole.entities.Etudiant;
import com.example.projet_ecole.repositories.EtudiantRepository;
import com.example.projet_ecole.services.ClasseService;
import com.example.projet_ecole.services.EtudiantService;
import com.example.projet_ecole.services.NoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/etudiant")
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
    public ResponseEntity<String> createEtudiant(@RequestParam String nom, @RequestParam String prenom, @RequestParam String photo, @RequestParam int id_classe, Model model) {
        try {
            etudiantService.createEtudiant(nom, prenom, photo, id_classe);
        } catch (Exception ex) {
            return ResponseEntity.status(400).body("Erreur lors de la création de l'étudiant");        }
        return ResponseEntity.status(201).body("Etudiant créer avec succès");
    }

    //MODIFIE L'ETUDIANT
    @PostMapping("/modif")
    public ResponseEntity<String> modifEtudiant(@RequestParam String nom, @RequestParam String prenom, @RequestParam String photo, @RequestParam int id_classe,@RequestParam int id_etudiant, Model model) {
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
    public ResponseEntity<String> supprimerEtudiant(@RequestParam int id_etudiant, Model model) {
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

    @GetMapping("/etudiantDisponible")
    public ResponseEntity<?> getEtudiantDisponible() {
        try {
            List<Etudiant> etudiants = etudiantService.finEtudiantSansClasse();

            if (etudiants != null && !etudiants.isEmpty()) {
                return ResponseEntity.status(200).body(etudiants);
            } else {
                return ResponseEntity.status(400).body("Aucun étudiant trouvé");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur serveur : " + e.getMessage());
        }
    }

    //MET A JOURS LA CLASSE D'UN ELEVE
    @PostMapping("/updateClasseEleve")
    public ResponseEntity<?> updateEleveSansClasse(@RequestParam("idClasse") int idClasse, @RequestParam("idEtudiant") int idEtudiant) {
        try {
            if (idClasse <= 0 || idEtudiant <= 0) {
                return ResponseEntity.status(400).body("Les identifiants doivent être supérieurs à 0");
            }

            etudiantService.modifEtudiantSansClasse(idClasse, idEtudiant);

            return ResponseEntity.status(200).body("Etudiant modifié avec succès");

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la modification : " + e.getMessage());
        }
    }



}
