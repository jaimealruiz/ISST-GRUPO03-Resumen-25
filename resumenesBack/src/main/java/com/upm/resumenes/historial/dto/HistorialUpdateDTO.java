package com.upm.resumenes.historial.dto;

import lombok.Data;

@Data
public class HistorialUpdateDTO {
    private Long documentId;
    private double progreso; // nuevo progreso (entre 0.0 y 1.0)
}

