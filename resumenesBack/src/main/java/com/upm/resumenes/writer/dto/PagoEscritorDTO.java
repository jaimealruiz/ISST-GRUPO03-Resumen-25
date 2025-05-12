package com.upm.resumenes.writer.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @AllArgsConstructor
public class PagoEscritorDTO {
    private LocalDate fecha;
    private double cantidad;
}