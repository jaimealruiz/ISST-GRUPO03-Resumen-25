package com.upm.resumenes.historial.model;

import java.time.LocalDate;

import com.upm.resumenes.document.model.Document;
import com.upm.resumenes.user.model.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "historial")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Historial {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fechaInicio;
    private LocalDate ultimoAcceso;
    private double progreso; // 0.0 a 1.0

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private User usuario;

    @ManyToOne
    @JoinColumn(name = "documento_id", nullable = false)
    private Document documento;
}
