package com.upm.resumenes.auth.service;

import com.upm.resumenes.auth.dto.AuthResponse;
import com.upm.resumenes.auth.dto.LoginRequest;
import com.upm.resumenes.auth.dto.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
