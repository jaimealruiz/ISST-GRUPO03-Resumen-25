package com.upm.resumenes.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.upm.resumenes.auth.dto.AuthResponse;
import com.upm.resumenes.auth.dto.LoginRequest;
import com.upm.resumenes.auth.dto.RegisterRequest;
import com.upm.resumenes.auth.jwt.JwtService;
import com.upm.resumenes.user.model.User;
import com.upm.resumenes.user.repository.UserRepository;
import com.upm.resumenes.writer.model.WriterInfo;
import com.upm.resumenes.writer.repository.WriterInfoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private final WriterInfoRepository writerInfoRepository;

    @Override
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("El email ya está registrado");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        System.err.println("Es escritor: " + request.isWriter());
        user.setWriter(request.isWriter());
        user.setSaldo(0);
        user = userRepository.save(user);

        if (request.isWriter()) {
            
            WriterInfo writer = new WriterInfo();
            writer.setEstilo(request.getEstilo());
            writer.setUser(user);
            writerInfoRepository.save(writer);
        }

        String token = jwtService.generateToken(user);

        return new AuthResponse(token, user.getId(), user.getEmail(), user.isWriter());
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Credenciales inválidas");
        }

        String token = jwtService.generateToken(user);
        return new AuthResponse(token, user.getId(), user.getEmail(), user.isWriter());
    }
}

