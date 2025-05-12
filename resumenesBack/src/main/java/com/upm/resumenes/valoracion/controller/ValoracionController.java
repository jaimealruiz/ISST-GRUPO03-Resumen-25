package com.upm.resumenes.valoracion.controller;

import com.upm.resumenes.valoracion.dto.ValoracionListResponseDTO;
import com.upm.resumenes.valoracion.dto.ValoracionRequestDTO;
import com.upm.resumenes.valoracion.service.ValoracionService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/valoraciones")
@RequiredArgsConstructor
public class ValoracionController {

    private final ValoracionService valoracionService;

    @PostMapping
    public ResponseEntity<Void> crearValoracion(@AuthenticationPrincipal UserDetails userDetails,
                                                @RequestBody ValoracionRequestDTO dto) {
        valoracionService.crearValoracion(userDetails.getUsername(), dto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{documentId}")
    public ResponseEntity<Void> eliminarValoracion(@AuthenticationPrincipal UserDetails userDetails,
                                                   @PathVariable Long documentId) {
        valoracionService.eliminarValoracion(userDetails.getUsername(), documentId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{documentId}")
    public ResponseEntity<ValoracionListResponseDTO> obtenerValoraciones(@PathVariable Long documentId) {
        return ResponseEntity.ok(valoracionService.obtenerValoraciones(documentId));
    }
}
