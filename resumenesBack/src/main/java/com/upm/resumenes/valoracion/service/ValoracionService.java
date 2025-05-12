package com.upm.resumenes.valoracion.service;

import com.upm.resumenes.valoracion.dto.ValoracionListResponseDTO;
import com.upm.resumenes.valoracion.dto.ValoracionRequestDTO;

public interface ValoracionService {

    void crearValoracion(String userEmail, ValoracionRequestDTO dto);

    void eliminarValoracion(String userEmail, Long documentId);

    ValoracionListResponseDTO obtenerValoraciones(Long documentId);
}
