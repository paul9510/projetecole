package com.example.projet_ecole.dto;

public class ClassesAllDto {

    private int idClasse;
    private String nom;

    public ClassesAllDto(int idClasse, String nom) {
        this.idClasse = idClasse;
        this.nom = nom;
    }

    public int getIdClasse() {
        return idClasse;
    }

    public void setIdClasse(int idClasse) {
        this.idClasse = idClasse;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }


}
