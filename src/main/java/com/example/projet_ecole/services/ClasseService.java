package com.example.projet_ecole.services;

import com.example.projet_ecole.dto.ClassesAllDto;
import com.example.projet_ecole.entities.Classe;
import com.example.projet_ecole.entities.Etudiant;
import com.example.projet_ecole.repositories.ClasseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClasseService {
    private final ClasseRepository classeRepository;

    public ClasseService(ClasseRepository classeRepository) {
        this.classeRepository = classeRepository;
    }

    public void ajouterNouvelleClasse(String nom) {

        try {
            Classe classe = new Classe();
            classe.setNom(nom);
            classeRepository.save(classe);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    public void updateClasse(String nomClasse, int idClasse) {
        classeRepository.UpdateNomClasse(nomClasse, idClasse);
    }

    public void deleteClasse(int idClasse) {
        classeRepository.DeleteClasseById(idClasse);
    }

    // RECUPERE UNE CLASSE SELON SON ID
    public Classe findClasseById(int idClasse){
        return classeRepository.findClasseId(idClasse);
    }

    public List<ClassesAllDto> findAllClasses() {
        return classeRepository.findAllClasses();
    }

    public List<Etudiant>  findAllEtudiantsByIdClasse(int idClasse) {
        return classeRepository.findAllEtudiantsByIdClasse(idClasse);
    }

}
