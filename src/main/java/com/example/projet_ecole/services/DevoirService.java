package com.example.projet_ecole.services;


import com.example.projet_ecole.entities.Devoir;
import com.example.projet_ecole.repositories.DevoirRepository;
import org.springframework.stereotype.Service;

@Service
public class DevoirService {

    private final DevoirRepository devoirRepository;

    public DevoirService(DevoirRepository devoirRepository) {
        this.devoirRepository = devoirRepository;
    }

    //RECUPERE UN DEVOIR SELON SON ID
    public Devoir findDevoirId(int idDevoir) {
        return devoirRepository.findDevoirId(idDevoir);
    }

}
