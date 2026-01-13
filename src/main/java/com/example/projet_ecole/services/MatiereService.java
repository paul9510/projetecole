package com.example.projet_ecole.services;


import com.example.projet_ecole.entities.Matiere;
import com.example.projet_ecole.repositories.MatiereRepository;
import org.springframework.stereotype.Service;

@Service
public class MatiereService {

    private final MatiereRepository matiereRepository;

    public MatiereService(MatiereRepository matiereRepository) {
        this.matiereRepository = matiereRepository;
    }

    public Matiere findMatiereId(int idMatiere) {
        return matiereRepository.findMatiereId(idMatiere);
    }
}
