package com.example.projet_ecole.repositories;


import com.example.projet_ecole.entities.Classe;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClasseRepository extends JpaRepository<Classe, Integer> {

    // PERMET D'OBTENIR UNE CLASSE GRACE A SON ID
    @Query("select c from Classe c where c.id = :idClasse")
    Classe findClasseId(@Param("idClasse") int idClasse);

    // UPDATE LE NOM D'UNE CLASSE
    @Modifying
    @Transactional
    @Query("UPDATE Classe c SET c.nom = :nomClasse where c.id = :idClasse")
    void UpdateNomClasse(@Param("nomClasse") String nomClasse,@Param("idClasse") int idClasse);

    // SUPPRIMER UNE CLASSE
    @Modifying
    @Transactional
    @Query("DELETE From Classe c WHERE c.id = :idClasse")
    void DeleteClasseById(@Param("idClasse") int icClasse);
}
