package com.upm.resumenes.writer.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.upm.resumenes.writer.dto.PagoEscritorDTO;
import com.upm.resumenes.writer.dto.WriterDashboardDTO;
import com.upm.resumenes.writer.service.WriterService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/writer")
@RequiredArgsConstructor
public class WriterController {

    private final WriterService writerService;

    @GetMapping("/dashboard")
    public ResponseEntity<WriterDashboardDTO> getDashboard(@AuthenticationPrincipal UserDetails userDetails) {
        WriterDashboardDTO dashboard = writerService.getDashboard(userDetails.getUsername());
        return ResponseEntity.ok(dashboard);
    }

    @PostMapping("/retirar")
    public ResponseEntity<PagoEscritorDTO> retirarSaldo(@AuthenticationPrincipal UserDetails userDetails) {
        PagoEscritorDTO saldo = writerService.retirarSaldo(userDetails.getUsername());
        if(saldo != null){
            return ResponseEntity.ok(saldo);
        }
        return ResponseEntity.badRequest().build();
    }
}
