package com.example.projet_ecole.services;

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
}
