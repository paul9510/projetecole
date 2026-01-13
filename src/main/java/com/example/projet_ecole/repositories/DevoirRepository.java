package com.example.projet_ecole.repositories;


import com.example.projet_ecole.entities.Devoir;
import com.example.projet_ecole.entities.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DevoirRepository extends JpaRepository<Devoir, Integer> {

    // PERMET D'OBTENIR LE DEVOIR AVEC SON ID
    @Query("select d from Devoir d where d.id = :idDevoir")
    Devoir findDevoirId(@Param("idDevoir") int idDevoir);
}
