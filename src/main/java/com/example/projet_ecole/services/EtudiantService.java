package com.example.projet_ecole.services;

import com.example.projet_ecole.entities.Classe;
import com.example.projet_ecole.entities.Etudiant;
import com.example.projet_ecole.repositories.ClasseRepository;
import com.example.projet_ecole.repositories.EtudiantRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EtudiantService {

    private final EtudiantRepository etudiantRepository;

    private final ClasseRepository classeRepository;

    public EtudiantService(EtudiantRepository etudiantRepository, ClasseRepository classeRepository) {
        this.etudiantRepository = etudiantRepository;
        this.classeRepository = classeRepository;
    }

    //PERMET DE CREER UN ETUDIANT
    // nom : nom de l'étudiant | prenom : prénom de l'étudiant | photo : lien photo de l'étudiant | id_classe : id de la classe sélectionnée
    public void createEtudiant(String nom, String prenom, String photo, int id_classe){
        try {
            Etudiant etudiant = new Etudiant();
            etudiant.setNom(nom);
            etudiant.setPrenom(prenom);
            etudiant.setPhoto(photo);
            etudiant.setClasse(classeRepository.findClasseId(id_classe));
            etudiantRepository.save(etudiant);
        }catch (Exception e){
            throw new RuntimeException("Erreur lors de la création de l'étudiant : "+e);
        }
    }

    // RECUPERE UN ETUDIANT SELON SON ID
    public Etudiant findEtudiantId(int idEtudiant){
        return etudiantRepository.findEtudiantId(idEtudiant);
    }

    public List<Etudiant> finEtudiantSansClasse(){
        return etudiantRepository.findEtudiantSansClasse();
    }

    //MODIFIE L'ETUDIANT (nom, prenom, photo, Classe) SELON SON ID
    public void ModifEtudiantNoteNonExistante(String nom, String prenom, String photo, Classe classe,int idEtudiant){
        etudiantRepository.ModifEtudiantNoteNonExistante(nom,prenom,photo,classe,idEtudiant);
    }

    //MODIFIE L'ETUDIANT (nom, prenom, photo) SELON SON ID
    public void ModifEtudiantNoteExistante(String nom, String prenom, String photo,int idEtudiant){
        etudiantRepository.ModifEtudiantNoteExistante(nom,prenom,photo,idEtudiant);
    }

    //SUPPRIMER ETUDIANT SELON ID
    public void DeleteEtudiantById(int idEtudiant){
        etudiantRepository.DeleteEtudiantById(idEtudiant);
    }

    // AJOUTER UNE CLASSE A UN ETUDIANT QUI N'EN A PAS
    public void modifEtudiantSansClasse(int idClasse, int idEtudiant){
        etudiantRepository.ModifEtudiantSansClasse(idClasse,idEtudiant);
    }

}
