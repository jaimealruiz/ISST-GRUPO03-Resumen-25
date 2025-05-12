package com.upm.resumenes.valoracion.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.upm.resumenes.document.model.Document;
import com.upm.resumenes.document.repository.DocumentRepository;
import com.upm.resumenes.user.model.User;
import com.upm.resumenes.user.repository.UserRepository;
import com.upm.resumenes.valoracion.dto.ValoracionListResponseDTO;
import com.upm.resumenes.valoracion.dto.ValoracionRequestDTO;
import com.upm.resumenes.valoracion.dto.ValoracionResponseDTO;
import com.upm.resumenes.valoracion.model.Valoracion;
import com.upm.resumenes.valoracion.repository.ValoracionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ValoracionServiceImpl implements ValoracionService {

    private final UserRepository userRepository;
    private final DocumentRepository documentRepository;
    private final ValoracionRepository valoracionRepository;

    @Override
    public void crearValoracion(String userEmail, ValoracionRequestDTO dto) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Document doc = documentRepository.findById(dto.getDocumentId())
                .orElseThrow(() -> new RuntimeException("Documento no encontrado"));

        if (valoracionRepository.existsByUsuarioAndDocumento(user, doc)) {
            throw new RuntimeException("Ya has valorado este resumen");
        }

        Valoracion val = new Valoracion();
        val.setUsuario(user);
        val.setDocumento(doc);
        val.setEstrellas(dto.getEstrellas());
        val.setComentario(dto.getComentario());

        valoracionRepository.save(val);
    }

    @Override
    public void eliminarValoracion(String userEmail, Long documentId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Document doc = documentRepository.findById(documentId)
                .orElseThrow(() -> new RuntimeException("Documento no encontrado"));

        Valoracion val = valoracionRepository.findByUsuarioAndDocumento(user, doc)
                .orElseThrow(() -> new RuntimeException("Valoración no encontrada"));

        valoracionRepository.delete(val);
    }

    @Override
    public ValoracionListResponseDTO obtenerValoraciones(Long documentId) {
        Document doc = documentRepository.findById(documentId)
                .orElseThrow(() -> new RuntimeException("Documento no encontrado"));

        List<Valoracion> lista = valoracionRepository.findByDocumento(doc);

        List<ValoracionResponseDTO> valoraciones = lista.stream().map(v ->
                new ValoracionResponseDTO(v.getUsuario().getEmail(), v.getEstrellas(), v.getComentario())
        ).toList();

        double media = valoraciones.isEmpty() ? 0.0 :
                valoraciones.stream().mapToInt(ValoracionResponseDTO::getEstrellas).average().orElse(0.0);

        return new ValoracionListResponseDTO(media, valoraciones.size(), valoraciones);
    }
}
