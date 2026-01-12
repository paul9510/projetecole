package com.example.projet_ecole.repositories;


import com.example.projet_ecole.entities.Classe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClasseRepository extends JpaRepository<Classe, Integer> {

    // PERMET D'OBTENIR UNE CLASSE GRACE A SON ID
    @Query("select c from Classe c where c.id = :idClasse")
    Classe findClasseId(@Param("idClasse") int idClasse);
}
