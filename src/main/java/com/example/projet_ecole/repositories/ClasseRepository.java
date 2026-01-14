package com.example.projet_ecole.repositories;


import com.example.projet_ecole.dto.ClassesAllDto;
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

    // RECUPERE TOUTES LES CLASSES
    @Query("select new com.example.projet_ecole.dto.ClassesAllDto(c.id, c.nom) FROM Classe c")
    List<ClassesAllDto> findAllClasses();

    //RECUPERE TOUT LES ELEVES D'UNE CLASSE AVEC L'ID CLASSE
    @Query("select e from Classe c join Etudiant e on e.classe.id = :idClasse")
    public List<Etudiant> findAllEtudiantsByIdClasse(@Param("idClasse") int idClasse);

}
