package com.example.projet_ecole.repositories;


import com.example.projet_ecole.entities.Devoir;
import com.example.projet_ecole.entities.Note;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DevoirRepository extends JpaRepository<Devoir, Integer> {

    // PERMET D'OBTENIR LE DEVOIR AVEC SON ID
    @Query("select d from Devoir d where d.id = :idDevoir")
    Devoir findDevoirId(@Param("idDevoir") int idDevoir);

    //PERMET D'OBTENIR TOUS LES DEVOIRS COMPORTANT L'idMATIERE
    @Query("select d from Devoir d where d.matiere.id = :idMatiere")
    List<Devoir> findDevoirIdMatiere(@Param("idMatiere") int idMatiere);

    //SUPPRIME LES DEVOIRS SELON LEUR ID
    @Modifying
    @Transactional
    @Query("DELETE From Devoir d WHERE d.id = :idDevoir")
    void DeleteDevoirById(@Param("idDevoir") int idDevoir);

    // MODIFIER UN DEVOIR SANS NOTE
    @Modifying
    @Transactional
    @Query("UPDATE Devoir d SET d.classe.id = :classeId, d.matiere.id = :matiereId, d.description = :description, d.categorie = :categorie, d.coefficient = :coef WHERE d.id = :devoirId ")
    void UpdateDevoirByIdSansNote(@Param("classeId") int classeId, @Param("matiereId") int matiereId, @Param("description") String description, @Param("categorie") String categorie,  @Param("coef") double coef, @Param("devoirId") int devoirId);


    // MODIFIER UN DEVOIR AVEC NOTE
    @Modifying
    @Transactional
    @Query("UPDATE Devoir d SET d.description = :description, d.categorie = :categorie, d.coefficient = :coef WHERE d.id = :devoirId ")
    void UpdateDevoirByIdAvecNote(@Param("description") String description, @Param("categorie") String categorie,  @Param("coef") double coef, @Param("devoirId") int devoirId);

    // RECUPERER LES NOTES D'UN DEVOIR PAR SON ID
    @Query("SELECT n FROM Note n WHERE n.devoir.id = :idDevoir")
    List<Note> findAllNotesByDevoirId(@Param("idDevoir") int idDevoir);
}
