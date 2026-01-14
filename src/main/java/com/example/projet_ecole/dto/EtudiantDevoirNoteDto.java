package com.example.projet_ecole.dto;

import com.example.projet_ecole.entities.Devoir;
import com.example.projet_ecole.entities.Etudiant;

import java.math.BigDecimal;

public class EtudiantDevoirNoteDto {

    private String nomEtudiant;
    private String prenomEtudiant;
    private BigDecimal valeur;
    private String descriptionDevoir;
    private String matiere;

    // Le constructeur doit correspondre à la requête SELECT ci-dessous
    public EtudiantDevoirNoteDto(String nomEtudiant, String prenomEtudiant, BigDecimal valeur, String descriptionDevoir, String matiere) {
        this.nomEtudiant = nomEtudiant;
        this.prenomEtudiant = prenomEtudiant;
        this.valeur = valeur;
        this.descriptionDevoir = descriptionDevoir;
        this.matiere = matiere;
    }


    public EtudiantDevoirNoteDto(String nomEtudiant, String prenomEtudiant, Double valeur,String matiere) {
        this.nomEtudiant = nomEtudiant;
        this.prenomEtudiant = prenomEtudiant;
        this.valeur = BigDecimal.valueOf(valeur);
        this.matiere = matiere;
    }

    public EtudiantDevoirNoteDto(String nomEtudiant, String prenomEtudiant, Double valeur) {
        this.nomEtudiant = nomEtudiant;
        this.prenomEtudiant = prenomEtudiant;
        this.valeur = BigDecimal.valueOf(valeur);
    }





    public String getNomEtudiant() {
        return nomEtudiant;
    }

    public void setNomEtudiant(String nomEtudiant) {
        this.nomEtudiant = nomEtudiant;
    }

    public String getPrenomEtudiant() {
        return prenomEtudiant;
    }

    public void setPrenomEtudiant(String prenomEtudiant) {
        this.prenomEtudiant = prenomEtudiant;
    }

    public BigDecimal getValeur() {
        return valeur;
    }

    public void setValeur(BigDecimal valeur) {
        this.valeur = valeur;
    }

    public String getDescriptionDevoir() {
        return descriptionDevoir;
    }

    public void setDescriptionDevoir(String descriptionDevoir) {
        this.descriptionDevoir = descriptionDevoir;
    }

    public String getMatiere() {
        return matiere;
    }

    public void setMatiere(String matiere) {
        this.matiere = matiere;
    }

    @Override
    public String toString() {
        return "EtudiantDevoirNoteDto{" +
                "nomEtudiant='" + nomEtudiant + '\'' +
                ", prenomEtudiant='" + prenomEtudiant + '\'' +
                ", valeur=" + valeur +
                ", descriptionDevoir='" + descriptionDevoir + '\'' +
                '}';
    }
}
