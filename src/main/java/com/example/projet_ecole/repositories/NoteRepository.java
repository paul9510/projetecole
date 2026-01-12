package com.example.projet_ecole.repositories;

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
}
