package com.example.projet_ecole.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "devoir")
public class Devoir {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "description", nullable = false)
    private String description;

    @Lob
    @Column(name = "categorie", nullable = false)
    private String categorie;

    @ColumnDefault("(curdate())")
    @Column(name = "date_creation", nullable = false)
    private LocalDate dateCreation;

    @ColumnDefault("1.00")
    @Column(name = "coefficient", precision = 4, scale = 2)
    private BigDecimal coefficient;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "classe_id", nullable = false)
    @JsonIgnore
    private Classe classe;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "matiere_id", nullable = false)
    @JsonIgnore
    private Matiere matiere;

    @OneToMany(mappedBy = "devoir")
    private Set<Note> notes = new LinkedHashSet<>();

}