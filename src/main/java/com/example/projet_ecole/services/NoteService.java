package com.example.projet_ecole.services;

import com.example.projet_ecole.dto.EtudiantDevoirNoteDto;
import com.example.projet_ecole.entities.Note;
import com.example.projet_ecole.repositories.NoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {

    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public List<Note> findNoteIdEtudiant(int idEtudiant){
        return noteRepository.findNoteIdEtudiant(idEtudiant);
    }

    //SUPPRIMER NOTES SELON ID DE L'ETUDIANT
    public void DeleteNoteByEtudiantId(int idEtudiant) {
        noteRepository.DeleteNotesByIdEtudiant(idEtudiant);
    }

    public List<EtudiantDevoirNoteDto> getReleveParEtudiant(int idEtudiant) {
        return noteRepository.findReleveNoteByIdEtudiant(idEtudiant);
    }

    //SUPPRIMER NOTE SELON L'idDevoir
    public void DeleteNoteByIdDevoir(int idDevoir) {
        noteRepository.DeleteNoteByIdDevoir(idDevoir);
    }
}
