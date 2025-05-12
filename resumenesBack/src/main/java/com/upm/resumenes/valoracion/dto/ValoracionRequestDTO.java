package com.upm.resumenes.valoracion.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ValoracionRequestDTO {

    @NotNull
    private Long documentId;

    @Min(1) @Max(5)
    private int estrellas;

    private String comentario;
}
