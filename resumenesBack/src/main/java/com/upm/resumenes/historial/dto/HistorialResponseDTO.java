package com.upm.resumenes.historial.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HistorialResponseDTO {
    private Long documentId;
    private String title;
    private String description;
    private String url;
    private boolean isFree;
    private String type;
    private LocalDate startDate;
    private LocalDate lastAccess;
    private double progreso; // 0.0 a 1.0
}

