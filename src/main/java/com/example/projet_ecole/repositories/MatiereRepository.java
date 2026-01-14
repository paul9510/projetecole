package com.example.projet_ecole.repositories;

import com.example.projet_ecole.entities.Etudiant;
import com.example.projet_ecole.entities.Matiere;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatiereRepository extends JpaRepository<Matiere, Integer> {

    // PERMET D'OBTENIR LA MATIERE AVEC UN ID
    @Query("select m from Matiere m where m.id = :idMatiere")
    Matiere findMatiereId(@Param("idMatiere") int idMatiere);

    // MODIFIE LA MATIERE SELON id (nom)
    @Modifying
    @Transactional
    @Query("UPDATE Matiere SET nom = :nom WHERE id = :idMatiere")
    void ModifMatiere(@Param("idMatiere") int idMatiere,@Param("nom") String nom);

    //SUPPRIME UNE MATIERE SELON SON ID
    @Modifying
    @Transactional
    @Query("DELETE From Matiere m WHERE m.id = :idMatiere")
    void DeleteMatiereByIdMatiere(@Param("idMatiere") int idMatiere);

    @Override
    List<Matiere> findAll();
}
