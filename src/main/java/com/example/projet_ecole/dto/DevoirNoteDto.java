package com.example.projet_ecole.dto;

import java.math.BigDecimal;

public class DevoirNoteDto {

    private String nom;
    private String prenom;
    private BigDecimal valeur;

    public DevoirNoteDto(String nom, String prenom, BigDecimal valeur) {
        this.nom = nom;
        this.prenom = prenom;
        this.valeur = valeur;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public BigDecimal getValeur() {
        return valeur;
    }

    public void setValeur(BigDecimal valeur) {
        this.valeur = valeur;
    }
}
