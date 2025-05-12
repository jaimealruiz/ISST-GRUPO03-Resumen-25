package com.upm.resumenes.auth.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.upm.resumenes.auth.dto.AuthResponse;
import com.upm.resumenes.auth.dto.LoginRequest;
import com.upm.resumenes.auth.dto.RegisterRequest;
import com.upm.resumenes.auth.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        System.out.println("Estamos dentro!!!");
        return ResponseEntity.ok(authService.login(request));
    }
}
