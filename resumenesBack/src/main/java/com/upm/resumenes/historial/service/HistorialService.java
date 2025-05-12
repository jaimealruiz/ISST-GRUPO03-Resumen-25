package com.upm.resumenes.historial.service;

import java.util.List;

import com.upm.resumenes.historial.dto.HistorialResponseDTO;
import com.upm.resumenes.historial.dto.HistorialUpdateDTO;

public interface HistorialService {
    void actualizarProgreso(String email, HistorialUpdateDTO dto);
    List<HistorialResponseDTO> obtenerHistorial(String email);
}
