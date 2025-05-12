package com.upm.resumenes.valoracion.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ValoracionResponseDTO {
    private String usuario;
    private int estrellas;
    private String comentario;
}
