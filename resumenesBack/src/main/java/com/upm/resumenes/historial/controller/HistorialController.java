package com.upm.resumenes.historial.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.upm.resumenes.historial.dto.HistorialResponseDTO;
import com.upm.resumenes.historial.dto.HistorialUpdateDTO;
import com.upm.resumenes.historial.service.HistorialService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/historial")
@RequiredArgsConstructor
public class HistorialController {

    private final HistorialService historialService;

    // 📝 Actualizar progreso de un documento
    @PostMapping("/actualizar")
    public ResponseEntity<Void> actualizarProgreso(@RequestBody HistorialUpdateDTO dto,
                                                   @AuthenticationPrincipal UserDetails userDetails) {
        historialService.actualizarProgreso(userDetails.getUsername(), dto);
        return ResponseEntity.ok().build();
    }

    // 📖 Obtener todo el historial de lectura del usuario
    @GetMapping
    public ResponseEntity<List<HistorialResponseDTO>> getHistorial(@AuthenticationPrincipal UserDetails userDetails) {
        List<HistorialResponseDTO> historial = historialService.obtenerHistorial(userDetails.getUsername());
        return ResponseEntity.ok(historial);
    }
}
