package com.upm.resumenes.writer.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @AllArgsConstructor
public class WriterDashboardDTO {
    private int totalDocumentos;
    private List<DocumentoStatsDTO> documentos;
    private double saldoActual;
    private List<PagoEscritorDTO> retiros;
}