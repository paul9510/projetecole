package com.example.projet_ecole.repositories;

import com.example.projet_ecole.entities.Etudiant;
import com.example.projet_ecole.entities.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Integer> {

    // PERMET D'OBTENIR LES NOTES D'UN ETUDIANT GRACE A SON ID
    @Query("select n from Note n where n.etudiant.id = :idEtudiant")
    List<Note> findNoteIdEtudiant(@Param("idEtudiant") int idEtudiant);
}
