package com.upm.resumenes.valoracion.model;

import java.time.LocalDate;

import com.upm.resumenes.document.model.Document;
import com.upm.resumenes.user.model.User;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "valoraciones", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"usuario_id", "documento_id"})
})
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Valoracion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int estrellas; // 1 a 5
    private String comentario;

    private LocalDate fecha;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private User usuario;

    @ManyToOne
    @JoinColumn(name = "documento_id", nullable = false)
    private Document documento;

    @PrePersist
    protected void onCreate() {
        this.fecha = LocalDate.now();
    }
}
