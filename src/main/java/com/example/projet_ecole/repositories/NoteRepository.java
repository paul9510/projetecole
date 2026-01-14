package com.example.projet_ecole.repositories;

import com.example.projet_ecole.dto.EtudiantDevoirNoteDto;
import com.example.projet_ecole.entities.Etudiant;
import com.example.projet_ecole.entities.Note;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Integer> {

    // PERMET D'OBTENIR LES NOTES D'UN ETUDIANT GRACE A SON ID
    @Query("select n from Note n where n.etudiant.id = :idEtudiant")
    List<Note> findNoteIdEtudiant(@Param("idEtudiant") int idEtudiant);

    // SUPPRIMER NOTES D'UN ETUDIANT SELON L'ID ETUDIANT
    @Modifying
    @Transactional
    @Query("DELETE From Note n WHERE n.etudiant.id = :idEtudiant")
    void DeleteNotesByIdEtudiant(@Param("idEtudiant") int idEtudiant);

    //SUPPRIME LES NOTES POSSEDANT L'idDevoir
    @Modifying
    @Transactional
    @Query("DELETE From Note n WHERE n.devoir.id = :idDevoir")
    void DeleteNoteByIdDevoir(@Param("idDevoir") int idDevoir);

    // RECUPERE LE RELEVER DE NOTE D'UN ETUDIANT PAR SON ID
    @Query("SELECT new com.example.projet_ecole.dto.EtudiantDevoirNoteDto(n.etudiant.nom, n.etudiant.prenom, n.valeur, n.devoir.description,n.devoir.matiere.nom) FROM Note n WHERE n.etudiant.id = :idEtudiant")
    List<EtudiantDevoirNoteDto> findReleveNoteByIdEtudiant(@Param("idEtudiant") int idEtudiant);

    //PERMET DE RECUPERE LA NOTE D'UN ETUDIANT SELON SON ID ET LE DEVOIR
    @Query("select n from Note n where n.etudiant.id = :idEtudiant AND n.devoir.id = :idDevoir")
    Note findNoteIdEtudiantIdDevoir(@Param("idEtudiant") int idEtudiant,@Param("idDevoir") int idDevoir);

    // MODIFIE LA NOTE SELON id (valeur)
    @Modifying
    @Transactional
    @Query("UPDATE Note SET valeur = :valeur WHERE etudiant.id = :idEtudiant AND devoir.id = :idDevoir")
    void ModifNote(@Param("idEtudiant") int idEtudiant,@Param("idDevoir") int idDevoir,@Param("valeur") double valeur);

    // RECUPERE TOUTES LES NOTES
    @Query("select n from Note n")
    List<Note> findToutesLesNotes();

    // RECUPERE LE NOM PRENOM MATIERE ET SA MOYENNE POUR TOUS LES ETUDIANTS AYANT DES NOTES
    @Query("SELECT new com.example.projet_ecole.dto.EtudiantDevoirNoteDto(e.nom, e.prenom, AVG(n.valeur), n.devoir.matiere.nom) FROM Note n JOIN Etudiant e ON e.id = n.etudiant.id GROUP BY e.id, e.prenom, e.nom, n.devoir.matiere")
    List<EtudiantDevoirNoteDto> findMoyenneByMatiere();

    // RECUPERE LE NOM, PRENOM, MOYENNE_GENERALE POUR TOUS LES ETUDIANTS
    @Query("SELECT new com.example.projet_ecole.dto.EtudiantDevoirNoteDto(e.nom, e.prenom, AVG(n.valeur)) FROM Note n JOIN n.etudiant e GROUP BY e.id, e.prenom, e.nom")
    List<EtudiantDevoirNoteDto> findMoyenneGenerale();




}
