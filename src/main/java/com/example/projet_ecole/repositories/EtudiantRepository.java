package com.example.projet_ecole.repositories;

import com.example.projet_ecole.entities.Classe;
import com.example.projet_ecole.entities.Etudiant;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EtudiantRepository extends JpaRepository<Etudiant, Integer> {

    // PERMET D'OBTENIR UN ETUDIANT GRACE A SON ID
    @Query("select e from Etudiant e where e.id = :idEtudiant")
    Etudiant findEtudiantId(@Param("idEtudiant") int idEtudiant);

    // RECUPERE LES ETUDIANTS SANS CLASSE
    @Query("select e from Etudiant e where e.classe.id is NULL")
    List<Etudiant> findEtudiantSansClasse();


    // MODIFIE L'ETUDIANT (nom, prenom,photo)
    @Modifying
    @Transactional
    @Query("UPDATE Etudiant SET nom = :nom,prenom = :prenom,photo = :photo WHERE id = :idEtudiant")
    void ModifEtudiantNoteExistante(@Param("nom") String nom,@Param("prenom") String prenom,@Param("photo") String photo,@Param("idEtudiant") int idEtudiant);

    // MODIFIE L'ETUDIANT (nom, prenom,photo,classe)
    @Modifying
    @Transactional
    @Query("UPDATE Etudiant SET nom = :nom,prenom = :prenom,photo = :photo,classe = :classe WHERE id = :idEtudiant")
    void ModifEtudiantNoteNonExistante(@Param("nom") String nom,@Param("prenom") String prenom,@Param("photo") String photo,@Param("classe") Classe classe,@Param("idEtudiant") int idEtudiant);

    // SUPPRIMER ETUDIANT
    @Modifying
    @Transactional
    @Query("DELETE From Etudiant e WHERE e.id = :idEtudiant")
    void DeleteEtudiantById(@Param("idEtudiant") int idEtudiant);

    //MODIFIE LA CLASSE DE L'ETUDIANT
    @Modifying
    @Transactional
    @Query("UPDATE Etudiant e SET e.classe.id = :idClasse WHERE e.id = :idEtudiant")
    void ModifEtudiantSansClasse(@Param("idClasse") int idClasse,@Param("idEtudiant") int idEtudiant);
}
