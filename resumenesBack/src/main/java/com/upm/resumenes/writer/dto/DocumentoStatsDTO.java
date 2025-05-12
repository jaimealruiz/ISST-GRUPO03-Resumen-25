package com.upm.resumenes.writer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @AllArgsConstructor
public class DocumentoStatsDTO {
    private Long id;
    private String titulo;
    private int totalValoraciones;
    private double mediaEstrellas;
}