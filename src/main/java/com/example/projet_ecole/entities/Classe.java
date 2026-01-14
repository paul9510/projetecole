package com.example.projet_ecole.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "classe")
public class Classe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "nom", nullable = false)
    private String nom;

    @OneToMany(mappedBy = "classe")
    @JsonIgnore
    private Set<Devoir> devoirs = new LinkedHashSet<>();

    @OneToMany(mappedBy = "classe")
    @JsonIgnore
    private Set<Etudiant> etudiants = new LinkedHashSet<>();

}