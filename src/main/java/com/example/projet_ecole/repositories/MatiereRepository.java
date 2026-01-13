package com.example.projet_ecole.repositories;

import com.example.projet_ecole.entities.Etudiant;
import com.example.projet_ecole.entities.Matiere;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MatiereRepository extends JpaRepository<Matiere, Integer> {

    // PERMET D'OBTENIR LA MATIERE AVEC UN ID
    @Query("select m from Matiere m where m.id = :idMatiere")
    Matiere findMatiereId(@Param("idMatiere") int idMatiere);
}
