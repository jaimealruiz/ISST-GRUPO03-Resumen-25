package com.upm.resumenes.ia.controller;

import com.upm.resumenes.ia.dto.IaResponseDTO;
import com.upm.resumenes.ia.service.IaService;
import lombok.RequiredArgsConstructor;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ia")
@RequiredArgsConstructor
public class IaController {

    private final IaService iaService;

    @PostMapping("/resumen")
    public ResponseEntity<IaResponseDTO> analizar(
            @RequestBody Map<String, Long> body,
            @AuthenticationPrincipal UserDetails userDetails) {
        Long documentId = body.get("documentId");
        IaResponseDTO dto = iaService.analizarDocumento(documentId, userDetails);
        return ResponseEntity.ok(dto);
    }

}
