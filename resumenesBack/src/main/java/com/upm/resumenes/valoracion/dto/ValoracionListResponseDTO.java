package com.upm.resumenes.valoracion.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ValoracionListResponseDTO {
    private double media;
    private int total;
    private List<ValoracionResponseDTO> valoraciones;
}
