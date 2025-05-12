package com.upm.resumenes.historial.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.upm.resumenes.document.model.Document;
import com.upm.resumenes.document.repository.DocumentRepository;
import com.upm.resumenes.historial.dto.HistorialResponseDTO;
import com.upm.resumenes.historial.dto.HistorialUpdateDTO;
import com.upm.resumenes.historial.model.Historial;
import com.upm.resumenes.historial.repository.HistorialRepository;
import com.upm.resumenes.user.model.User;
import com.upm.resumenes.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HistorialServiceImpl implements HistorialService {

    private final HistorialRepository historialRepository;
    private final UserRepository userRepository;
    private final DocumentRepository documentRepository;

    @Override
    public void actualizarProgreso(String email, HistorialUpdateDTO dto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Document doc = documentRepository.findById(dto.getDocumentId())
                .orElseThrow(() -> new RuntimeException("Documento no encontrado"));

                Historial historial = historialRepository.findByUsuarioAndDocumento(user, doc)
                .orElseGet(() -> {
                    Historial nuevo = new Historial();
                    nuevo.setUsuario(user);
                    nuevo.setDocumento(doc);
                    nuevo.setFechaInicio(LocalDate.now());
                    nuevo.setUltimoAcceso(LocalDate.now());
                    nuevo.setProgreso(0.0);
                    return nuevo;
                });
        

        historial.setUltimoAcceso(LocalDate.now());
        historial.setProgreso(dto.getProgreso());

        historialRepository.save(historial);
    }

    @Override
    public List<HistorialResponseDTO> obtenerHistorial(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return historialRepository.findByUsuario(user).stream()
                .map(h -> new HistorialResponseDTO(
                        h.getDocumento().getId(),
                        h.getDocumento().getTitle(),
                        h.getDocumento().getDescription(),
                        h.getDocumento().getUrl(),
                        h.getDocumento().isFree(),
                        h.getDocumento().getType().name(),
                        h.getFechaInicio(),
                        h.getUltimoAcceso(),
                        h.getProgreso()
                ))
                .toList();
    }
}
