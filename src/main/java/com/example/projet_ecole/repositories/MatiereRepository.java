package com.example.projet_ecole.repositories;

import com.example.projet_ecole.entities.Etudiant;
import com.example.projet_ecole.entities.Matiere;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MatiereRepository extends JpaRepository<Matiere, Integer> {
}
